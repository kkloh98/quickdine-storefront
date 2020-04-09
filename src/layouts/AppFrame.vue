<template>
  <div>
    <v-navigation-drawer app v-model="drawerActive">
      <v-layout column style="background-color: #388E3C; height: 25%;">
        <v-spacer />
        <v-btn
          v-if="!isLoggedIn"
          text
          dark
          style="font-size: 12px;"
          @click="loginDialogActive = true"
        >Log in / Create account</v-btn>
        <v-btn v-else text dark style="font-size: 12px;" @click="logout()">
          Logout
          <v-icon class="mx-2" size="14">mdi-logout</v-icon>
        </v-btn>
      </v-layout>
      <v-list dense>
        <v-list-item
          link
          v-for="(item, i) in drawerItems"
          :key="i"
          :to="`/stores/${$route.params.store_id}/${item.path}`"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="white">
      <v-icon color="green darken-2" @click.stop="drawerActive = !drawerActive">mdi-menu</v-icon>
      <v-spacer />
      <router-link :to="`/stores/${$route.params.store_id}`" style="text-decoration: none;">
        <v-toolbar-title style="font-size: 16px; color: black; font-weight: bold;">QuickDine</v-toolbar-title>
      </router-link>
      <v-spacer />
      <!-- <v-icon color="green darken-2" @click.stop="cartDrawerActive = !cartDrawerActive">mdi-basket-outline</v-icon> -->
      <router-link
        :to="`/stores/${$route.params.store_id}/checkout`"
        style="text-decoration: none;"
      >
        <v-icon color="green darken-2">mdi-cart-outline</v-icon>
      </router-link>
    </v-app-bar>

    <LoginDialog v-model="loginDialogActive" />
  </div>
</template>

<script>
import LoginDialog from "@/components/LoginDialog";
import Cookies from "js-cookie";

export default {
  name: "NavBar",

  components: {
    LoginDialog
  },

  data: () => ({
    isLoggedIn: false,
    drawerActive: false,
    drawerItems: [
      { name: "Menu", icon: "mdi-book-open-outline", path: "menu" },
      {
        name: "My Orders",
        icon: "mdi-checkbox-multiple-blank-outline",
        path: "orders"
      }
    ],
    loginDialogActive: false
  }),

  methods: {
    logout() {
      Cookies.remove("token");
      this.isLoggedIn = false;
    }
  },

  created() {
    const token = Cookies.get("token");

    if (token && token.store_id == this.$route.params.store_id) {
      this.isLoggedIn = true;
    }
  }
};
</script>
