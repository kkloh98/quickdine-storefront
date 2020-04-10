<template>
  <v-flex fill-height>
    <v-img
      v-if="store"
      :src="store.image_url ? store.image_url : 'https://tinyurl.com/tvttsft'"
      max-height="25vh"
      min-width="100%"
    ></v-img>

    <div class="mx-3">
      <v-card-title class="font-weight-bold pl-0">{{ store ? store.name : '' }}</v-card-title>
      <v-row justify="space-between">
        <v-card-subtitle class="py-2" style="font-size: 12px;">{{ store ? store.address : '' }}</v-card-subtitle>
        <v-chip small color="red lighten-4" class="ma-2" style="color: #C62828; font-size: 10px;">
          <v-icon size="12" class="mr-1">mdi-clock-outline</v-icon>Closes in 2hrs
        </v-chip>
      </v-row>
      <v-btn
        :to="`/stores/${this.$route.params.store_id}/menu`"
        class="my-5"
        width="100%"
        max-width="100%"
        tile
        outlined
        color="green darken-2"
        style="border-radius: 5px;"
      >
        <v-icon left size="17" class="mr-4">mdi-book-open-outline</v-icon>Expore Our Menu
      </v-btn>

      <div class="mb-5" v-for="(collection, i) in collections" :key="i">
        <v-card-subtitle class="pl-0 pb-1 font-weight-bold">{{ collection.name }}</v-card-subtitle>
        <v-row class="ma-0">
          <v-list style="max-height: 220px; display: flex; overflow-x: auto; overflow-y: hidden">
            <CollectionItemCard
              v-for="(product, j) in collection.products"
              :key="j"
              :id="product.id"
              :name="product.name"
              :image_url="product.images[0].url"
            />
          </v-list>
        </v-row>
      </div>
    </div>
  </v-flex>
</template>

<script>
import CollectionItemCard from '@/components/CollectionItemCard'

export default {
  name: 'Home',

  components: {
    CollectionItemCard,
  },

  data: () => ({
    store: null,
    collections: [],
  }),

  methods: {
    async retrieveStore() {
      var res = await this.apiGet('@store').catch(console.error)
      this.store = res.store
    },

    async listCollections() {
      var res = await this.apiGet('@store/collections').catch(console.error)
      this.collections = res.collections.filter((collection) => collection.name !== 'All')
    },
  },

  created() {
    this.retrieveStore()
    this.listCollections()
  },
}
</script>
