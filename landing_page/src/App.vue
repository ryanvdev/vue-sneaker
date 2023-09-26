<script setup lang="ts">
import { RouterView } from 'vue-router';
import { VProgressLinear } from 'vuetify/components';
</script>

<template>
  <v-progress-linear color="red" indeterminate></v-progress-linear>
  <RouterView />
</template>