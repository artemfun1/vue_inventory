<template>
  <div class="sk_item">
    <Skeletor height="30" pill width="80%" />

    <Skeletor height="15" pill width="60%" />
    <Skeletor height="15" pill width="80%" />
    <Skeletor height="15" pill width="70%" />
    <Skeletor height="15" pill width="60%" />
    <Skeletor height="15" pill width="50%" />
    <Skeletor class="end" height="15" pill width="35%" />
  </div>
</template>

<script setup>
import { Skeletor } from 'vue-skeletor'
</script>

<style scoped>
.sk_item {
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
}
.end {
  margin-top: 20px;
}
</style>
