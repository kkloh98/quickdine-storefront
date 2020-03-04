<template>
  <div>
    <v-flex
      fill-height
      class="mx-auto mb-10"
    >

      <v-carousel
        height="250"
        hide-delimiter-background
        delimiter-icon="mdi-minus"
      >
        <v-carousel-item
          v-for="(image, i) in images"
          :key="i"
          reverse-transition="fade-transition"
          transition="fade-transition"
        >
          <v-img
            max-height="250"
            max-width="500"
            aspect-ratio="1"
            :src="image.url"
          ></v-img>
        </v-carousel-item>
      </v-carousel>

      <v-card-title>Cafe Badilico</v-card-title>

      <v-card-text>
        <v-row
          align="center"
          class="mx-0"
        >
          <v-rating
            :value="4.5"
            color="amber"
            dense
            half-increments
            readonly
            size="14"
          ></v-rating>

          <div class="grey--text ml-4">4.5 (413)</div>
        </v-row>

        <div class="my-4 subtitle-1">
          $ • Italian, Cafe
        </div>

        <div>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div>
      </v-card-text>

      <v-divider class="my-4"></v-divider>

      <div v-for="(variant, index) in variants" :key="index">

        <v-card-title>{{ variant.type.name }}</v-card-title>

        <v-card-text>
          <v-chip-group
            active-class="green--text"
            column
          >
            <v-chip v-for="(option, index) in variant.options" :key="index" v-model="option.selected">{{ option.name }}</v-chip>
          </v-chip-group>
        </v-card-text>

        <v-divider class="my-4"></v-divider>

      </div>

      <v-card-title>Quantity</v-card-title>
      <v-row class="mx-3 mb-10" align="center">
        <v-btn icon color="green darken-2" @click="quantity > 1 && quantity--"><v-icon>mdi-minus</v-icon></v-btn>
        <div class="mx-2">{{ quantity }}</div>
        <v-btn icon color="green darken-2" @click="quantity++"><v-icon>mdi-plus</v-icon></v-btn>
      </v-row>

    </v-flex>

    <v-row justify="center" class="ma-5">
      <v-btn
        height="4.5vh"
        dark
        color="green darken-2"
        width="100%"
        :style="{ borderRadius: 5 }"
        @click="addToOrder"
      >
        ADD TO ORDER
      </v-btn>
    </v-row>

  </div>
</template>

<script>

  export default {
    data: () => ({
      quantity: 1,
      variants: [
        {
          type: { id: 1, name: 'Size' },
          options: [{ id: 1, name: 'Small', selected: true }, { id: 2, name: 'Medium', selected: false }, { id: 3, name: 'Large', selected: false }],
        },
        {
          type: { id: 2, name: 'Color' },
          options: [{ id: 4, name: 'Red', selected: true }, { id: 5, name: 'Blue', selected: false }],
        }
      ],
      images: [
        { id: 1, url: "https://cdn.vuetifyjs.com/images/cards/cooking.png" },
        { id: 2, url: "https://www.cdc.gov/foodsafety/images/comms/food-Safety-Tips-small.jpg" }
      ]
    }),
    methods: {

      addToOrder() {
        this.$router.push({ name: 'Menu' });
      },
      log() {
        console.log(this.variants)
      }

    },
  }
</script>
