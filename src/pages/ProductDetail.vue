<template>
  <v-flex fill-height class="mx-auto">
    <v-carousel height="250" hide-delimiter-background delimiter-icon="mdi-minus">
      <v-carousel-item
        v-for="(image, i) in product.images"
        :key="i"
        reverse-transition="fade-transition"
        transition="fade-transition"
      >
        <v-img max-height="250" max-width="500" aspect-ratio="1" :src="image.url"></v-img>
      </v-carousel-item>
    </v-carousel>

    <v-card-title>{{product.name}}</v-card-title>

    <v-card-text>
      <v-row align="center" class="mx-0">
        <v-rating :value="4.5" color="amber" dense half-increments readonly size="14"></v-rating>

        <div class="grey--text ml-4">4.5 (413)</div>
      </v-row>

      <div class="my-4">{{product.description}}</div>
    </v-card-text>

    <v-divider class="my-4"></v-divider>

    <!-- <div v-for="(variant, index) in product.variants" :key="index">

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

    </div>-->

    <div v-for="(type, i) in product.variant_types" :key="i" class="px-5">
      <v-card-title class="px-0">{{type.name}}</v-card-title>
      <v-radio-group v-if="type.is_required" v-model="type.is_selected">
        <v-row
          v-for="(option, j) in type.variant_options"
          :key="j"
          justify="space-between"
          align="center"
          class="px-2"
        >
          <v-radio :label="option.name" v-model="option.is_selected"></v-radio>
          <p class="price">+ {{option.add_price.formatPrice()}}</p>
        </v-row>
      </v-radio-group>
      <v-row
        v-else
        v-for="(option, j) in type.variant_options"
        :key="j"
        justify="space-between"
        align="center"
        class="px-2"
      >
        <v-checkbox v-model="option.is_selected" :label="option.name" color="green darken-2"></v-checkbox>
        <p class="price">+ {{option.add_price.formatPrice()}}</p>
      </v-row>
    </div>

    <v-card-title>Quantity</v-card-title>
    <v-row class="mx-3 mb-10" align="center">
      <v-btn icon color="green darken-2" @click="quantity > 1 && quantity--">
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <div class="mx-2">{{ quantity }}</div>
      <v-btn icon color="green darken-2" @click="quantity++">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-row>

    <v-row justify="center" class="ma-5">
      <v-btn
        height="4.5vh"
        dark
        color="green darken-2"
        width="100%"
        :style="{ borderRadius: 5 }"
        @click="addToOrder"
      >ADD TO CART</v-btn>
    </v-row>
  </v-flex>
</template>

<script>
export default {
  data: () => ({
    product: {
      variants: [],
      images: [],
      combinations: []
    },
    quantity: 1,
    variants: [
      {
        type: { id: 1, name: "Size" },
        options: [
          { id: 1, name: "Small", selected: true },
          { id: 2, name: "Medium", selected: false },
          { id: 3, name: "Large", selected: false }
        ]
      },
      {
        type: { id: 2, name: "Color" },
        options: [
          { id: 4, name: "Red", selected: true },
          { id: 5, name: "Blue", selected: false }
        ]
      }
    ]
  }),
  methods: {
    async retrieveProduct() {
      try {
        var res = await this.apiGet(
          `@store/products/${this.$route.params.product_id}`
        );

        this.product = res.product;

        this.product.variant_types = this.product.variant_types.map(type => {
          type.variant_options = type.variant_options.map((option, i) => {
            option.is_selected = false;
            if (type.is_required && i == 0) option.is_selected = true;
            return option;
          });
          return type;
        });
      } catch (error) {
        console.log(error);
      }
    },
    addToOrder() {
      var total_price = parseFloat(this.product.price);

      this.product.variant_types.forEach(type => {
        type.variant_options.forEach(option => {
          total_price += option.is_selected ? parseFloat(option.add_price) : 0;
        });
      });

      var cart = localStorage.getItem("cart");
      cart = cart == undefined ? { items: [] } : JSON.parse(cart);
      cart.items.push({
        product: this.product,
        quantity: this.quantity,
        total_price
      });
      localStorage.setItem("cart", JSON.stringify(cart));
      this.$router.push({ name: "Menu" });
    }
  },
  created() {
    this.retrieveProduct();
  }
};
</script>

<style lang="scss" scoped>
.price {
  font-size: 12px;
  color: grey;
}
</style>
