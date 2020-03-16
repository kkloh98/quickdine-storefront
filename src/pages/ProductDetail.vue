<template>

  <v-flex
    fill-height
    class="mx-auto"
  >

    <v-carousel
      height="250"
      hide-delimiter-background
      delimiter-icon="mdi-minus"
    >
      <v-carousel-item
        v-for="(image, i) in product.images"
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

    <v-card-title>{{product.name}}</v-card-title>

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

      <div>{{product.description}}</div>
    </v-card-text>

    <v-divider class="my-4"></v-divider>

    <div v-for="(variant, index) in product.variants" :key="index">

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

  </v-flex>

</template>

<script>

  export default {
    data: () => ({
      product: {
        variants: [],
        images: [],
        combinations: [],
      },
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
    }),
    methods: {

      async retrieveProduct() {

        try {

          var res = await this.apiGet(`@store/products/${this.$route.params.product_id}`)

          var product = res.product

          var combinations = product.variants;

          var variants = product.variant_types;

          variants = variants.map(variant => {
            variant.type = { id: variant.id, name: variant.name };
            delete variant.id;
            delete variant.name;
            variant.options = variant.variant_options;
            delete variant.variantOptions;
            return variant;
          })

          product.variants = variants

          var options = variants.map(variant => variant.options).flat();

          combinations = combinations.map(combination => {
            var option_values = combination.options
              .split(", ")
              .map(x => x.split("_")[1]);

            option_values = option_values.map(
              x => options.filter(option => option.id == x)[0].name
            );

            combination.option_values = option_values;

            return combination;
          });

          product.combinations = combinations

          this.product = product

        } catch(error) {

          console.log(error)

        }

      },
      addToOrder() {
        this.$router.push({ name: 'Menu' });
      },
      log() {
        console.log(this.variants)
      }

    },
    created() {

      this.retrieveProduct();

    }
  }
</script>
