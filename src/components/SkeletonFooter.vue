<template>
  <Skeletor height="50%" pill width="85%" />

  <img src="../assets/carbon_close.svg" alt="img" />
</template>

<script setup>
import 'vue-skeletor/dist/vue-skeletor.css'
import { Skeletor } from 'vue-skeletor'
</script>

<style scoped>
img {
  position: absolute;
  right: 5px;
  top: 5px;
}
</style>
