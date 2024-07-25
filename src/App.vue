<script setup lang="ts">
import DescriptionSide from './components/DescriptionSide.vue'
import FooterSide from './components/FooterSide.vue'
import InventorySide from './components/Inventory/InventorySide.vue'
import { useItemsArrayStore } from '@/stores/itemsArrayStore'
import { storeToRefs } from 'pinia'


const itemsArrayStore = useItemsArrayStore()
const { itemsArray } = storeToRefs(itemsArrayStore)



const openItem=({i})=>{
  console.log(itemsArray.value[i])
}
</script>

<template>

  <div class="wrapper">
    <description-side />
    <inventory-side  @open-item="openItem"/>
  </div>


  <div class="footer_wrapper"><footer-side /></div>
  
</template>

<style scoped>
.wrapper {
  width: 944px;
  display: flex;
  margin: 35px 35px 24px 35px;
}
.footer_wrapper{
  width: 944px;
  margin: 0px 35px 35px 35px;
}
</style>
