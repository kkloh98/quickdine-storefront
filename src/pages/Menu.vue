<template>
  <v-flex fill-height class="pt-3">
    <v-tabs
      v-model="tab"
      grow
      height="40"
      color="green darken-2"
    >
      <v-tab
        v-for="(item, i) in tabs"
        :key="i"
        :href="`#tab-${i}`"
        style="font-size: 11px;"
      >
        {{ item }}
        <v-icon v-if="icons">mdi-phone</v-icon>
      </v-tab>

      <v-tab-item
        v-for="(collection, i) in collections"
        :key="i"
        :value="'tab-' + i"
        class="px-3"
      >
        <v-card-title class="my-5">{{ collection.name }}</v-card-title>
        <v-divider/>
        <router-link
          v-for="(product, j) in collection.products" :key="j"
          :to="`/stores/1/products/${j}`"
          style="text-decoration: none;"
        >
          <v-card class="pa-3 my-5">
            <v-row justify="space-around">
              <v-col cols="3" class="text-left">
                <v-img :src="product.image_url" style="border-radius: 3px;"/>
              </v-col>
              <v-col class="text-left font-weight-bold" style="font-size: 15px;">{{ product.name }}</v-col>
              <v-col class="text-right" style="font-size: 14px;">{{ formatPrice(product.price) }}</v-col>
            </v-row>
          </v-card>
        </router-link>
      </v-tab-item>
    </v-tabs>
  </v-flex>
</template>

<script>
export default {

  name: 'Menu',

  data: () => ({
    tab: null,
    grow: true,
    tabs: ['Foods', 'Beverages', 'Desserts'],
    collections: [
      {
        name: 'Foods',
        products: Array(3).fill({
          name: 'Food sample',
          price: 10.00,
          image_url: 'https://www.chatelaine.com/wp-content/uploads/2019/01/canada-new-food-guide-2019.jpeg'
        })
      },
      {
        name: 'Beverages',
        products: Array(3).fill({
          name: 'Beverage sample',
          price: 5.00,
          image_url: 'https://www.chatelaine.com/wp-content/uploads/2019/01/canada-new-food-guide-2019.jpeg'
        })
      },
      {
        name: 'Desserts',
        products: Array(3).fill({
          name: 'Desserts sample',
          price: 8.00,
          image_url: 'https://www.chatelaine.com/wp-content/uploads/2019/01/canada-new-food-guide-2019.jpeg'
        })
      }
    ],
  }),

  methods: {

    formatPrice(price) {
      return price.toLocaleString(
        'en-US',
        {
          style: 'currency',
          currency: 'MYR'
        }
      );
    },

  },

  created() {
    this.tab = `tab-${this.$route.query.type}`;
  }

}
</script>
