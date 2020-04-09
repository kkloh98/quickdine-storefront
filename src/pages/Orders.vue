<template>
  <transition name="slide-right">
    <v-flex fill-height></v-flex>
  </transition>
</template>

<script>
export default {
  name: "Orders",

  data: () => ({
    orders: []
  }),

  methods: {
    async listOrders() {
      this.orders = await this.apiGet("@store/orders");
    }
  },

  created() {
    this.listOrders();
  }
};
</script>
