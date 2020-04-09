<template>
  <v-dialog :value="value" @input="$emit('input')" @click.native="$emit('input')">
    <v-card>
      <v-card-title>
        <span class="headline">{{ form == 'register' ? 'Register' : 'Login' }}</span>
        <v-spacer />
        <v-btn icon @click="$emit('input')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="6" sm="6" md="4" class="py-0">
              <v-text-field
                v-if="form == 'register'"
                v-model="customer.first_name"
                color="green darken-2"
                label="First name*"
                v-validate="'required'"
                name="first_name"
              ></v-text-field>
              <span
                v-if="errors.has('first_name')"
                style="font-size: 12px;"
                class="red--text"
              >* First name is required</span>
            </v-col>
            <v-col v-if="form == 'register'" cols="6" sm="6" md="4" class="py-0">
              <v-text-field v-model="customer.last_name" color="green darken-2" label="Last name"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4" class="py-0">
              <v-text-field
                v-model="customer.email"
                color="green darken-2"
                label="Email*"
                name="email"
                v-validate="'required|email'"
              ></v-text-field>
              <span
                v-if="errors.has('email')"
                style="font-size: 12px;"
                class="red--text"
              >* Email is required</span>
            </v-col>
            <v-col v-if="form == 'register'" cols="12" class="py-0">
              <v-text-field
                v-model="customer.phone"
                color="green darken-2"
                label="Phone"
                type="phone"
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="py-0">
              <v-text-field
                v-model="customer.password"
                color="green darken-2"
                label="Password*"
                type="password"
                name="password"
                ref="password"
                v-validate="'required'"
              ></v-text-field>
              <span
                v-if="errors.has('password')"
                style="font-size: 12px;"
                class="red--text"
              >* Password is required</span>
            </v-col>
            <v-col v-if="form == 'register'" cols="12" class="py-0">
              <v-text-field
                v-model="customer.confirm_password"
                color="green darken-2"
                label="Confirm Password*"
                type="password"
                name="confirm_password"
                v-validate="'required|confirmed:password'"
              ></v-text-field>
              <p
                style="font-size: 12px;"
                v-if="errors.has('confirm_password')"
                class="red--text"
              >* Password does not match</p>
            </v-col>
            <!-- <v-col cols="12" sm="6">
              <v-select
                :items="['0-17', '18-29', '30-54', '54+']"
                label="Age*"
                required
              ></v-select>
            </v-col>
            <v-col cols="12" sm="6">
              <v-autocomplete
                :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                label="Interests"
                multiple
              ></v-autocomplete>
            </v-col>-->
          </v-row>
        </v-container>
        <p style="font-size: 12px;">* Indicates required field</p>
      </v-card-text>
      <v-card-actions>
        <v-row justify="center" class="ma-2">
          <v-btn
            v-if="form == 'register'"
            @click="register()"
            dark
            color="green darken-2"
            width="100%"
          >SIGN UP</v-btn>
          <v-btn v-else @click="login()" dark color="green darken-2" width="100%">SIGN IN</v-btn>
        </v-row>
      </v-card-actions>
      <v-card-subtitle
        class="text-center blue--text"
        style="font-size: 12px;"
        @click="changeForm()"
      >
        {{
        form == 'register' ? 'Already have an account? Sign In here' : "Don't have an account? Sign Up here"
        }}
      </v-card-subtitle>
    </v-card>
  </v-dialog>
</template>

<script>
import Cookies from "js-cookie";

export default {
  name: "LoginDialog",

  props: ["value"],

  data: () => ({
    form: "register",
    valid: null,
    customer: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      password: "",
      confirm_password: ""
    }
  }),

  methods: {
    changeForm() {
      this.form = this.form == "register" ? "login" : "register";
    },

    async register() {
      this.valid = await this.$validator.validateAll();

      if (!this.valid) return;

      if (this.customer.password !== this.customer.confirm_password) return;

      var res = await this.apiPost("@store/auth/register", this.customer);

      if (res.success) {
        Cookies.set("token", {
          value: res.token,
          store_id: this.$route.params.store_id
        });
        this.clearFields();
        window.location.href = `/stores/${this.$route.params.store_id}`;
      }
    },

    async login() {
      this.valid = await this.$validator.validateAll();

      if (!this.valid) return;

      var res = await this.apiPost("@store/auth/login", this.customer);

      if (res.success) {
        Cookies.set("token", {
          value: res.token,
          store_id: this.$route.params.store_id
        });
        this.clearFields();
        window.location.href = `/stores/${this.$route.params.store_id}`;
      }
    },

    clearFields() {
      for (var i in this.customer) {
        this.customer[i] = "";
      }
    }
  }
};
</script>
