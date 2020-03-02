<template>
  <transition name="slide-right">
    <v-flex fill-height>
      <v-card class="my-2 py-2 px-1" v-for="item in cart.orders" :key="item.variant_id">
        <v-row align="center" justify="space-around" class="px-3">
          <v-btn icon color="green darken-2" @click="minusQuantity(item.variant_id)"><v-icon size="15">mdi-minus</v-icon></v-btn>
          <span style="font-size: 13px;">{{ item.quantity }}</span>
          <v-btn icon color="green darken-2" @click="plusQuantity(item.variant_id)"><v-icon size="15">mdi-plus</v-icon></v-btn>
          <v-col class="text-truncate text-left" style="font-size: 13px;">{{ item.name }}</v-col>
          <v-col class="font-weight-medium text-right" style="font-size: 13px;">{{ formatPrice(item.price * item.quantity) }}</v-col>
        </v-row>
      </v-card>
      <div class="my-5"></div>
      <v-card class="px-4">
        <v-row justify="space-between" class="py-2">
          <v-col class="text-left" style="font-size: 13px;">Subtotal</v-col>
          <v-col class="text-right font-weight-medium" style="font-size: 13px;">{{ formatPrice(total_price) }}</v-col>
        </v-row>
        <v-row justify="space-between" class="py-2">
          <v-col class="text-left" style="font-size: 13px;">Delivery fee</v-col>
          <v-col class="text-right font-weight-medium" style="font-size: 13px;">MYR 0.00</v-col>
        </v-row>
        <v-row justify="space-between" class="py-2">
          <v-col class="text-left" style="font-size: 13px;">Discount</v-col>
          <v-col class="text-right font-weight-medium" style="font-size: 13px;">MYR 0.00</v-col>
        </v-row>
        <v-divider/>
        <v-row justify="space-between" class="py-2">
          <v-col class="text-left font-weight-black">Total</v-col>
          <v-col class="text-right font-weight-black">{{ formatPrice(total_price) }}</v-col>
        </v-row>
      </v-card>

      <v-footer
        fixed
        class="font-weight-medium pa-5"
        color="transparent"
      >
        <v-btn
          height="4.5vh"
          dark
          color="green darken-2"
          width="100%"
          :style="{ borderRadius: 5 }"
        >
          PLACE ORDER
        </v-btn>
      </v-footer>

    </v-flex>
  </transition>
</template>

<script>
export default {

  name: "Checkout",

  data:() => ({
    cart: {
      orders: [

      ],
      total_price: 0,
    }
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

    plusQuantity(variant_id) {
      this.cart.orders = this.cart.orders.map(x => x.variant_id === variant_id ? {...x, quantity: x.quantity + 1} : x)
      localStorage.setItem('cart', JSON.stringify(this.cart));
    },

    minusQuantity(variant_id) {
      this.cart.orders = this.cart.orders.map(x => x.variant_id === variant_id ? {...x, quantity: x.quantity - 1} : x)
      this.cart.orders = this.cart.orders.filter(x => x.quantity > 0);
      localStorage.setItem('cart', JSON.stringify(this.cart));
    },

    recalculate() {
      if(this.cart.orders.length) {
        this.total_price = this.cart.orders.map(x => x.price * x.quantity).reduce((total, num) => total + num);
      } else {
        this.total_price = 0;
      }
    }

  },

  watch: {
    'cart.orders': {
      handler() {
        this.recalculate();
      },
      deep: true,
    }
  },

  created() {
    var cart = {
      orders: [
        {
          product_id: 1,
          variant_id: 1,
          name: 'Mc Chicken',
          price: 15.00,
          quantity: 1,
        },
        {
          product_id: 2,
          variant_id: 2,
          name: 'Coke',
          price: 2.00,
          quantity: 1,
        }
      ]
    };

    localStorage.setItem('cart', JSON.stringify(cart));

    this.cart = JSON.parse(localStorage.getItem('cart'));

    this.recalculate();
  }

}
</script>
