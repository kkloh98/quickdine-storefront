<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-item link v-for="item in drawerItems" :key="item.title">
            <v-list-item-action>
                <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-navigation-drawer
      v-model="cartDrawer"
      app
      right="right"
    >
      <v-list dense>
        <v-list-item link v-for="item in drawerItems" :key="item.title">
            <v-list-item-action>
                <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="white"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>QuickDine</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-icon
        @click.stop="cartDrawer = !cartDrawer"
      >mdi-cart-outline</v-icon>
      <!-- <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn> -->
    </v-app-bar>

    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
       <router-view/>
      </v-container>
    </v-content>
    <!-- <v-bottom-navigation
        v-model="bottomNav"
    >
        <v-btn :value="item.title" v-for="item in drawerItems" :key="item.title">
            <span>{{ item.title }}</span>
            <v-icon>{{ item.icon }}</v-icon>
        </v-btn>
    </v-bottom-navigation> -->
  </v-app>
</template>

<script>
  export default {
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
      cartDrawer: null,
      drawerItems: [
          { title: 'Menu', icon: 'mdi-silverware' },
          { title: 'Orders', icon: 'mdi-cart-outline' },
          { title: 'Resvervation', icon: 'mdi-calendar-clock' },
      ]
    }),
  }
</script>
