<template>
  <v-app id="inspire">
    <AppFrame v-if="$vuetify.breakpoint.name == 'xs'" />

    <v-content v-if="$vuetify.breakpoint.name == 'xs'">
      <v-container fluid class="fill-height pa-0 ma-0">
        <Router />
      </v-container>
    </v-content>

    <v-container v-else fill-height fluid>
      <v-row justify="center" align="center" class="mx-0">
        <v-col class="text-center">
          <!-- <img src="@/assets/mobile.jpg" height="300px" /> -->
          <qrcode :value="getFullUrl()" :options="{ width: 200 }"></qrcode><br />
          <a :href="getFullUrl()">{{ getFullUrl() }}</a>
          <div class="my-5"></div>
          Currently Only Supported for Mobile View<br /><br />
          Please scan the QR Code above with a Mobile Phone<br />
          OR<br />
          Change the Browser View to Mobile in the Chrome Inspector
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import './assets/sass/main.scss'

import Router from '@/Router.vue'
import AppFrame from '@/layouts/AppFrame.vue'
import Cookies from 'js-cookie'

export default {
  name: 'App',

  components: {
    Router,
    AppFrame,
  },

  methods: {
    checkLogin() {
      const token = Cookies.get('token')

      if (token && token.store_id == this.$route.params.store_id) {
        this.$store.commit('setIsLoggedIn', true)
      }
    },

    getFullUrl() {
      console.log(window.location.href)
      return window.location.href
    },
  },

  created() {
    this.checkLogin()
  },
}
</script>
