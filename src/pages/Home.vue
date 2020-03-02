<template>

  <v-flex fill-height class="pa-2">

    <!-- <v-card-title class="ma-0 px-0 mb-5" style="font-size: 23px;">Good Afternoon</v-card-title> -->

    <!-- <v-carousel
      height="200"
      hide-delimiter-background
      delimiter-icon="mdi-minus"
      style="border-radius: 10px;"
      :show-arrows="false"
      class="mb-10"
    >
      <v-carousel-item
        v-for="(image, i) in images"
        :key="i"
        reverse-transition="fade-transition"
        transition="fade-transition"
      >
        <v-img
          aspect-ratio="1"
          :src="image.url"
        ></v-img>
      </v-carousel-item>
    </v-carousel> -->

    <v-row justify="space-around" class="mx-0 my-10">
      <v-btn outlined fab color="red darken-1" :to="`/stores/${$route.params.store_id}/menu?type=0`">
        <v-icon>mdi-food</v-icon>
      </v-btn>
      <v-btn outlined fab color="blue darken-1" :to="`/stores/${$route.params.store_id}/menu?type=1`">
        <v-icon>mdi-glass-mug-variant</v-icon>
      </v-btn>
      <v-btn outlined fab color="deep-purple darken-2" :to="`/stores/${$route.params.store_id}/menu?type=2`">
        <v-icon>mdi-muffin</v-icon>
      </v-btn>
    </v-row>

    <h4>Recommended</h4>
    <v-layout row>
      <v-list style="max-height: 220px; display: flex; overflow-x: auto; overflow-y: hidden">
        <PopularProductCard/>
        <PopularProductCard/>
        <PopularProductCard/>
        <PopularProductCard/>
        <PopularProductCard/>
      </v-list>
    </v-layout>

    <!-- <v-layout row class="mt-4">
      <v-card-title class="ma-0 px-2" style="font-size: 23px;">Popular</v-card-title>
      <v-list style="max-height: 200px; display: flex; overflow-x: auto; overflow-y: hidden">
        <PopularProductCard/>
        <PopularProductCard/>
        <PopularProductCard/>
        <PopularProductCard/>
        <PopularProductCard/>
      </v-list>
    </v-layout> -->
  </v-flex>

</template>

<script>

import PopularProductCard from '../components/PopularProductCard';

export default {

  name: 'Home',

  components: {
    PopularProductCard,
  },

  data: () => ({
    images: [
      { id: 1, url: "https://cdn.vuetifyjs.com/images/cards/cooking.png" },
      { id: 2, url: "https://www.cdc.gov/foodsafety/images/comms/food-Safety-Tips-small.jpg" }
    ]
  })

}

</script>
