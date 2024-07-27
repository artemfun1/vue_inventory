<template>
  <div class="description">
     <p class="test">click img - clear localStorage </p>
    <img @click="clear" class="description_img" src="../assets/Img.png" alt="img" />
   

    <div class="description_skeleton">
      <skeleton-side />
    </div>
  </div>
</template>

<script setup>
import SkeletonSide from '../components/SkeletonSide.vue'

const clear = () => {
  localStorage.removeItem('items')
  console.log('clear local storage')
}
</script>

<style scoped>
.test{
  position: absolute;
  color:#4d4d4d ;
}
.description {
  background-color: #262626;
  width: 240px;
  height: 100%;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #4d4d4d;

  & .description_img {
    margin-top: 16px;
    margin-bottom: 40px;
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
