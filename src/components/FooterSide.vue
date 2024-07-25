<template>
  <footer class="footer">
    <skeleton-footer />
  </footer>
</template>

<script setup>
import SkeletonFooter from '../components/SkeletonFooter.vue'
</script>

<style scoped>
.footer {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  
  height: 72px;
  background-color: #262626;
  position: relative;
  border: 1px solid #4D4D4D
}
</style>
