<script setup lang="ts">
import { RouterView } from 'vue-router';
import { VProgressLinear } from 'vuetify/components';
import { useRootStore } from './stores/root_store';

const rootStore = useRootStore();
</script>

<template>
  <!-- Top progress -->
  <v-progress-linear 
    :class="style['process']" 
    color="red" 
    :indeterminate="rootStore.isLoading"
  ></v-progress-linear>

  <RouterView />
</template>

<style module="style" lang="scss">
.process{
  position: fixed;
  z-index: 100;

  top: 0px;
  left: 0px;
}
</style>