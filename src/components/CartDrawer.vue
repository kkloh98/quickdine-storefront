<template>
  <div v-click-outside="onClickOutside">
    <v-navigation-drawer
      :value="value"
      app
      right="right"
    >
      <v-flex fill-height>
        <v-layout column justify-space-between fill-height>
          <v-list dense>
            <v-card-title>Your Orders</v-card-title>
            <v-divider v-if="!cart.orders.length"/>
            <v-card-subtitle v-if="!cart.orders.length">Your cart is empty</v-card-subtitle>
            <OrderItemTile v-for="(order, i) in cart.orders" :key="i"
              :value="order"
              :cartProp="cart"
              @refreshCart="refreshCart"
            />
          </v-list>
          <v-btn v-if="cart.orders.length" width="100%" min-height="6%" color="green darken-2" dark style="border-radius: 0;">CHECKOUT</v-btn>
        </v-layout>
      </v-flex>
    </v-navigation-drawer>
  </div>
</template>

<script>

import OrderItemTile from './OrderItemTile';
import vClickOutside from 'v-click-outside'

export default {

  name: 'CartDrawer',

  components: {
    OrderItemTile
  },

  props: ['value'],

  data: () => ({
    cart: null,
  }),

  directives: {
    clickOutside: vClickOutside.directive
  },

  methods: {
    onClickOutside() {
      this.$emit('input');
    },
    refreshCart() {
      this.cart = JSON.parse(localStorage.getItem('cart'));
      console.log(this.cart);
    }
  },

  created() {

    var cart = {
      orders: [
        {
          product_id: 1,
          variant_id: 1,
          name: 'Food Name',
          price: 15.00,
          quantity: 3,
        }
      ]
    };

    localStorage.setItem('cart', JSON.stringify(cart));

    this.cart = JSON.parse(localStorage.getItem('cart'));

  }

}
</script>
