<template>
  <div>
    <v-card
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
            active-class="primary--text"
            column
          >
            <v-chip v-for="(option, index) in variant.options" :key="index" v-model="option.selected">{{ option.name }}</v-chip>
          </v-chip-group>
        </v-card-text>

        <v-divider class="my-4"></v-divider>

      </div>

      <v-card-title>Quantity: {{ quantity }}</v-card-title>
      <v-col cols="12">
        <v-slider
          v-model="quantity"
          step="1"
          min="1"
          max="20"
          ticks
          color="green darken-2"
        ></v-slider>
      </v-col>
    </v-card>

    <v-footer
      fixed
      class="font-weight-medium px-2"
    >
      <v-btn
        height="4.5vh"
        dark
        color="green darken-2"
        width="100%"
        :style="{ borderRadius: 5 }"
      >
        ADD TO ORDER
      </v-btn>
    </v-footer>

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
        console.log('Adding...')
      },
      log() {
        console.log(this.variants)
      }

    },
  }
</script>
