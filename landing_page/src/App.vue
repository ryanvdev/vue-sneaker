<script setup lang="ts">
import { RouterView } from 'vue-router';
import { VProgressLinear } from 'vuetify/components';
</script>

<template>
  <v-progress-linear :class="style['process']" color="red" indeterminate></v-progress-linear>
  <RouterView />
</template>

<style module="style" lang="scss">
.process{
  position: fixed;
  z-index: 10;

  top: 0px;
  left: 0px;
}
</style>