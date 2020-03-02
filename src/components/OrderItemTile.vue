<template>
  <div>
    <v-card
      class="mx-auto"
      outlined
    >
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title>{{ order.name }}</v-list-item-title>
          <v-list-item-subtitle>{{ formatPrice(order.price) }}</v-list-item-subtitle>
        </v-list-item-content>

        <!-- <v-list-item-avatar
          size="80"
          color="grey"
        ></v-list-item-avatar> -->
        <v-img
          :src="`https://picsum.photos/500/300?image=15`"
          :lazy-src="`https://picsum.photos/10/6?image=15`"
          aspect-ratio="1"
          class="grey lighten-2 mt-5 mb-5"
          max-height="80"
          max-width="80"
          style="border-radius: 10px;"
        />
      </v-list-item>

      <v-list-item>
        <v-spacer/>
        <v-list-item-title :style="{ textAlign: 'right' }">{{ formatPrice(totalPrice) }}</v-list-item-title>
      </v-list-item>

      <v-card-actions>
        <v-btn text :style="{ minWidth: 0 }" @click="order.quantity > 1 && order.quantity--"><v-icon size="15">mdi-minus</v-icon></v-btn>
        <v-btn text :style="{ minWidth: 0 }">{{ order.quantity }}</v-btn>
        <!-- <v-col cols="2"><v-text-field v-model="_quantity"/></v-col> -->
        <v-btn text :style="{ minWidth: 0 }" @click="order.quantity++"><v-icon size="15">mdi-plus</v-icon></v-btn>
        <v-spacer/>
        <v-btn text :style="{ minWidth: 0 }" @click="deleteOrder"><v-icon size="18" color="grey">mdi-delete-outline</v-icon></v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>

export default {

  name: 'OrderItemTile',

  props: ['value', 'cartProp'],

  data: () => ({
    order: null,
    totalPrice: 0,
    cart: null,
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

    deleteOrder() {

      this.cart.orders.splice(this.$vnode.key, 1);
      localStorage.setItem('cart', JSON.stringify(this.cart));
      this.$emit('refreshCart');

    }

  },

  watch: {

    'order.quantity': {
      handler: function(val) {

        this.totalPrice = val * this.order.price;

        this.cart.orders[this.$vnode.key].quantity = val;
        localStorage.setItem('cart', JSON.stringify(this.cart));

      },
      deep: true,
    }

  },

  created() {

    this.order = this.value;
    this.totalPrice = this.order.price * this.order.quantity;
    this.cart = this.cartProp;

  }

}

</script>
