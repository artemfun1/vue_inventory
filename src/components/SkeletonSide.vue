<template>
  <Skeletor height="30" pill width="80%" />

  <Skeletor height="15" pill width="60%" />
  <Skeletor height="15" pill width="80%" />
  <Skeletor height="15" pill width="70%" />
  <Skeletor height="15" pill width="60%" />
  <Skeletor height="15" pill width="50%" />
  <Skeletor class="end" height="15" pill width="35%" />
</template>

<script setup>
import { Skeletor } from 'vue-skeletor'
</script>

<style scoped>
.end {
  margin-top: 20px;
}
</style>
