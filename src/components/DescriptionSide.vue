<template>
  <div class="description">
    <img class="description_img" src="../assets/Img.png" alt="img" />

    <div class="description_skeleton">
      <skeleton-side />
    </div>
  </div>
</template>

<script setup>
import SkeletonSide from '../components/SkeletonSide.vue'
</script>

<style scoped>
.description {
  background-color: #262626;
  width: 240px;
  height: 100%;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;

  & .description_img {
    margin-top: 16px;
    margin-bottom: 16px;
  }

  & .description_skeleton {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
    width: 240px;
  }
}
</style>
