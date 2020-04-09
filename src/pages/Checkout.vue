<template>
  <transition name="slide-right">
    <v-flex fill-height>
      <v-card class="ma-3" v-for="item in cart.items" :key="item.variant_id">
        <v-row align="center" justify="space-around" class="px-3">
          <v-btn icon color="green darken-2" @click="minusQuantity(item.variant_id)">
            <v-icon size="15">mdi-minus</v-icon>
          </v-btn>
          <span style="font-size: 13px;">{{ item.quantity }}</span>
          <v-btn icon color="green darken-2" @click="plusQuantity(item.variant_id)">
            <v-icon size="15">mdi-plus</v-icon>
          </v-btn>
          <v-col class="text-truncate text-left" style="font-size: 13px;">{{ item.product.name }}</v-col>
          <v-col
            class="font-weight-medium text-right"
            style="font-size: 13px;"
          >{{ (item.total_price * item.quantity).formatPrice() }}</v-col>
        </v-row>
      </v-card>
      <div class="my-5"></div>
      <v-card class="px-3 mx-3">
        <v-row justify="space-between" class="py-2">
          <v-col class="text-left" style="font-size: 13px;">Subtotal</v-col>
          <v-col
            class="text-right font-weight-medium"
            style="font-size: 13px;"
          >{{ total_price.formatPrice() }}</v-col>
        </v-row>
        <v-row justify="space-between" class="py-2">
          <v-col class="text-left" style="font-size: 13px;">Delivery fee</v-col>
          <v-col class="text-right font-weight-medium" style="font-size: 13px;">MYR 0.00</v-col>
        </v-row>
        <v-row justify="space-between" class="py-2">
          <v-col class="text-left" style="font-size: 13px;">Discount</v-col>
          <v-col class="text-right font-weight-medium" style="font-size: 13px;">MYR 0.00</v-col>
        </v-row>
        <v-divider />
        <v-row justify="space-between" class="py-2">
          <v-col class="text-left font-weight-black">Total</v-col>
          <v-col class="text-right font-weight-black">{{ total_price.formatPrice() }}</v-col>
        </v-row>
      </v-card>

      <v-menu v-if="cart.items.length" transition="slide-y-transition" bottom max-height="50%">
        <template v-slot:activator="{ on }">
          <v-col cols="12">
            <v-btn
              style="width: 100%;"
              color="green darken-2"
              outlined
              v-on="on"
            >{{ selected_table ? `Table ${selected_table.number}` : 'Choose your table' }}</v-btn>
          </v-col>
        </template>
        <v-list>
          <v-list-item v-for="(table, i) in tables" :key="i" @click="selected_table = table">
            <v-list-item-title>{{ table.number }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-footer fixed class="font-weight-medium pa-5" color="transparent">
        <v-btn
          v-if="cart.items.length"
          height="4.5vh"
          dark
          color="green darken-2"
          width="100%"
          :style="{ borderRadius: 5 }"
          @click="placeOrder()"
        >PLACE ORDER</v-btn>
        <v-btn
          v-else
          height="4.5vh"
          dark
          color="green darken-2"
          width="100%"
          :style="{ borderRadius: 5 }"
          @click="$router.push(`/stores/${$route.params.store_id}/menu`)"
        >BACK TO THE MENU</v-btn>
      </v-footer>
    </v-flex>
  </transition>
</template>

<script>
export default {
  name: "Checkout",

  data: () => ({
    cart: {
      items: []
    },
    total_price: 0,
    tables: [],
    selected_table: null
  }),

  methods: {
    plusQuantity(product_id) {
      this.cart.items = this.cart.items.map(item =>
        item.id === product_id ? { ...item, quantity: item.quantity + 1 } : item
      );
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },

    minusQuantity(product_id) {
      this.cart.items = this.cart.items.map(item =>
        item.variant_id === product_id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      this.cart.items = this.cart.items.filter(item => item.quantity > 0);
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },

    recalculate() {
      if (this.cart.items.length) {
        this.total_price = this.cart.items
          .map(item => item.total_price * item.quantity)
          .reduce((total, num) => total + num);
      } else {
        this.total_price = 0;
      }
    },

    async placeOrder() {
      var cart = {
        items: []
      };

      this.cart.items.forEach(item => {
        var variants = [];

        item.product.variant_types.forEach(type => {
          var variant = { type_id: type.id, option_ids: [] };
          type.variant_options.forEach(option => {
            if (option.is_selected) {
              variant.option_ids.push(option.id);
            }
          });
          if (variant.option_ids.length) variants.push(variant);
        });

        cart.items.push({
          product_id: item.product.id,
          variants,
          quantity: item.quantity
        });
      });

      var res = await this.apiPost("@store/orders", cart).catch(console.error);

      if (res.success) {
        localStorage.removeItem("cart");
        this.$router.push(`/stores/${this.$route.params.store_id}`);
      }
    },

    async listTables() {
      var res = await this.apiGet("@store/tables").catch(console.error);

      if (res.success) {
        this.tables = res.tables;
      }
    }
  },

  watch: {
    "cart.items": {
      handler() {
        this.recalculate();
      },
      deep: true
    }
  },

  created() {
    var cart = localStorage.getItem("cart");

    cart = cart == undefined ? { items: [] } : JSON.parse(cart);

    this.cart = cart;

    this.recalculate();

    this.listTables();
  }
};
</script>
