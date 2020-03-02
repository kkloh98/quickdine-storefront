<template>
  <v-dialog
    :value="value"
    @input="$emit('input')"
    @click.native="$emit('input')"
  >
    <v-card>
      <v-card-title>
        <span class="headline">Register</span>
        <v-spacer/>
        <v-btn icon @click="$emit('input')"><v-icon>mdi-close</v-icon></v-btn>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="6" sm="6" md="4" class="py-0">
              <v-text-field color="green darken-2" label="First name*" required></v-text-field>
            </v-col>
            <v-col cols="6" sm="6" md="4" class="py-0">
              <v-text-field color="green darken-2" label="Last name"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4" class="py-0">
              <v-text-field color="green darken-2" label="Email*" required></v-text-field>
            </v-col>
            <v-col cols="12" class="py-0">
              <v-text-field color="green darken-2" label="Phone" type="phone"></v-text-field>
            </v-col>
            <v-col cols="12" class="py-0">
              <v-text-field color="green darken-2" label="Password*" type="password" required></v-text-field>
            </v-col>
            <v-col cols="12" class="py-0">
              <v-text-field color="green darken-2" label="Confirm Password*" type="password" required></v-text-field>
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
            </v-col> -->
          </v-row>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-row justify="center" class="ma-2">
          <v-btn dark color="green darken-2" width="100%">SIGN UP</v-btn>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

export default {

  name: 'LoginDialog',

  props: ['value'],

}

</script>
