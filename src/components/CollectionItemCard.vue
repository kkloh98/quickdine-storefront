<template>
  <v-card
    class="mr-3"
    max-width="180"
    min-height="140"
    max-height="140"
    style="border-radius: 5px;"
    @click="$router.push(`/stores/${$route.params.store_id}/products/${id}`)"
  >
    <v-img
      class="white--text align-end"
      width="150"
      height="100"
      max-width="150"
      max-height="100"
      aspect-ratio="1"
      :src="image_url"
    ></v-img>

    <v-card-text class="text--primary pa-2" style="font-size: 11px;">
      <strong>{{ name }}</strong>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "CollectionItemCard",

  props: ["id", "name", "image_url"]
};
</script>
