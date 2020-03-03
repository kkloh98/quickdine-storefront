<template>
  <v-app id="inspire">

    <AppFrame/>

    <v-content>
      <v-container fluid class="fill-height pa-0 ma-0">
        <Router/>
      </v-container>
    </v-content>

  </v-app>
</template>

<script>

import './assets/sass/main.scss';

import Router from '@/Router.vue';
import AppFrame from '@/layouts/AppFrame.vue';

export default {

  name: 'App',

  components: {
    Router,
    AppFrame,
  },

}

</script>
