<template>
  <v-flex fill-height class="pt-3">
    <v-tabs v-model="tab" grow height="40" color="green darken-2">
      <v-tab v-for="(item, i) in tabs" :key="i" :href="`#tab-${i}`" style="font-size: 11px;">{{ item }}</v-tab>

      <v-tab-item v-for="(collection, i) in collections" :key="i" :value="'tab-' + i" class="px-3">
        <v-card-title class="my-5">{{ collection.name }}</v-card-title>
        <v-divider />
        <router-link
          v-for="(product, j) in collection.products"
          :key="j"
          :to="`/stores/${$route.params.store_id}/products/${product.id}`"
          style="text-decoration: none;"
        >
          <v-card class="pa-3 my-5">
            <v-row justify="space-around">
              <v-col cols="3" class="text-left">
                <v-img :src="product.images[0].url" style="border-radius: 3px;" />
              </v-col>
              <v-col class="text-left font-weight-bold" style="font-size: 15px;">{{ product.name }}</v-col>
              <v-col class="text-right" style="font-size: 14px;">{{ product.price.formatPrice() }}</v-col>
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
    tabs: [],
    collections: [],
  }),

  methods: {
    async listProducts() {
      try {
        var res = await this.apiGet('@store/collections')

        this.collections = res.collections

        this.tabs = this.collections.map((collection) => collection.name)
      } catch (error) {
        console.log(error)
      }
    },
  },

  created() {
    this.listProducts()
  },
}
</script>
