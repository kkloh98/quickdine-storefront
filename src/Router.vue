<template>
  <transition :name="transitionName" :mode="transitionMode">
    <router-view />
  </transition>
</template>

<script>
export default {

  data: () => ({
    transitionName: 'fade',
    transitionMode: 'out-in',
  }),

  watch: {
    // '$route' (to, from) {

    //   if(to.name === 'Checkout') {
    //     this.transitionName = 'slide';
    //     this.transitionMode = 'out-in';
    //   }

    //   if(from.name === 'Checkout') {
    //     this.transitionName = 'slide';
    //     this.transitionMode = 'in-out';
    //   }

    // }
  },

}
</script>
