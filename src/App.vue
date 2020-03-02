<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawerActive"
      app
    >
      <v-layout column style="background-color: #388E3C; height: 25%;">
        <v-spacer/>
        <v-btn text dark style="font-size: 12px;" @click="loginDialogActive = true">Log in / Create account</v-btn>
      </v-layout>
      <v-list dense>
          <v-list-item link v-for="(item, i) in drawerItems" :key="i" :to="`/stores/${$route.params.store_id}/${item.path}`">
            <v-list-item-action>
                <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
                <v-list-item-title>{{ item.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="white"
    >
      <v-icon color="green darken-2" @click.stop="drawerActive = !drawerActive">mdi-menu</v-icon>
      <v-spacer/>
      <router-link :to="`/stores/${$route.params.store_id}`" style="text-decoration: none;">
        <v-toolbar-title style="font-size: 16px; color: black; font-weight: bold;">QuickDine</v-toolbar-title>
      </router-link>
      <v-spacer/>
      <!-- <v-icon color="green darken-2" @click.stop="cartDrawerActive = !cartDrawerActive">mdi-basket-outline</v-icon> -->
      <router-link :to="`/stores/${$route.params.store_id}/checkout`" style="text-decoration: none;"><v-icon color="green darken-2">mdi-basket-outline</v-icon></router-link>
    </v-app-bar>

    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <transition :name="transitionName" :mode="transitionMode">
          <router-view/>
        </transition>
      </v-container>
    </v-content>

    <CartDrawer v-model="cartDrawerActive"/>

    <LoginDialog v-model="loginDialogActive"/>

  </v-app>
</template>

<script>

import './assets/sass/main.scss';

import LoginDialog from './components/LoginDialog';
import CartDrawer from './components/CartDrawer';

export default {

  name: 'App',

  components: {
    LoginDialog,
    CartDrawer,
  },

  data: () => ({

    drawerActive: false,
    cartDrawerActive: false,
    drawerItems: [
      { name: 'Menu', icon: 'mdi-silverware', path: 'menu' },
      { name: 'Resvervation', icon: 'mdi-calendar-clock', path: 'reservation' },
      { name: 'My Orders', icon: 'mdi-checkbox-multiple-blank-outline', path: 'orders' },
    ],
    loginDialogActive: false,
    transitionName: 'fade',
    transitionMode: 'out-in',

  }),

  methods: {



  },

  watch: {
    // '$route' (to, from) {

    //   if(to.name === 'Checkout') {
    //     this.transitionName = 'slide';
    //     this.transitionMode = 'out-in';
    //   }

    //   if(from.name === 'Checkout') {
    //     this.transitionName = 'slide';
    //     this.transitionMode = 'in-out';
    //   }

    // }
  },

}

</script>
