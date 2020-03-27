<template>

  <v-flex fill-height>
    <v-carousel
      height="25vh"
      style="width: 100%;"
      hide-delimiter-background
      delimiter-icon="mdi-minus"
      :show-arrows="false"
      cycle
    >
      <v-carousel-item
        v-for="(image, i) in images"
        :key="i"
        reverse-transition="fade-transition"
        transition="fade-transition"
      >
        <v-img
          :src="image.url"
        ></v-img>
      </v-carousel-item>
    </v-carousel>

    <div class="mx-3">

      <v-card-title class="font-weight-bold pl-0">{{store.name}}</v-card-title>
      <v-row justify="space-between">
        <v-card-subtitle class="py-2" style="font-size: 12px;">{{store.address}}</v-card-subtitle>
        <v-chip small color="red lighten-4" class="ma-2" style="color: #C62828; font-size: 10px;">
          <v-icon size="12" class="mr-1">mdi-clock-outline</v-icon>Closes in 2hrs
        </v-chip>
      </v-row>

      <!-- <v-row justify="space-around" class="mx-0 my-10">
        <v-btn outlined fab color="red darken-1" :to="`/stores/${$route.params.store_id}/menu?type=0`">
          <v-icon>mdi-food</v-icon>
        </v-btn>
        <v-btn outlined fab color="blue darken-1" :to="`/stores/${$route.params.store_id}/menu?type=1`">
          <v-icon>mdi-glass-mug-variant</v-icon>
        </v-btn>
        <v-btn outlined fab color="deep-purple darken-2" :to="`/stores/${$route.params.store_id}/menu?type=2`">
          <v-icon>mdi-muffin</v-icon>
        </v-btn>
      </v-row> -->

      <v-btn :to="`/stores/${$route.params.store_id}/menu`" class="my-5" width="100%" max-width="100%" tile outlined color="green darken-2" style="border-radius: 5px;">
        <v-icon left size="17" class="mr-4">mdi-book-open-outline</v-icon> Expore Our Menu
      </v-btn>

      <div class="mb-5">
        <v-card-subtitle class="pl-0 pb-1 font-weight-bold">WE THINK YOU'LL LIKE</v-card-subtitle>
        <v-row class="ma-0">
          <v-list style="max-height: 220px; display: flex; overflow-x: auto; overflow-y: hidden">
            <PopularProductCard v-for="i in 5" :key="i"/>
          </v-list>
        </v-row>
      </div>

      <div class="mb-5">
        <v-card-subtitle class="pl-0 pb-1 font-weight-bold">RECOMMENDED PRODUCTS</v-card-subtitle>
        <v-row class="ma-0">
          <v-list style="max-height: 220px; display: flex; overflow-x: auto; overflow-y: hidden">
            <PopularProductCard v-for="i in 5" :key="i"/>
          </v-list>
        </v-row>
      </div>

    </div>

  </v-flex>

</template>

<script>

import PopularProductCard from '@/components/PopularProductCard';

export default {

  name: 'Home',

  components: {
    PopularProductCard,
  },

  data: () => ({
    store: null,
    images: [
      { id: 1, url: "https://tinyurl.com/tvttsft" },
      { id: 2, url: "https://singlestroke.io/wp-content/uploads/2015/10/high-quality-food-stock-photos-thumbnail.jpg" },
    ],
  }),

  methods: {
    async retrieveStore() {
      try {
        var res = await this.apiGet("@store")
        this.store = res.store
      }
      catch(error) {
        console.log(error)
      }
    }
  },

  created() {
    this.retrieveStore()
  }

}

</script>
