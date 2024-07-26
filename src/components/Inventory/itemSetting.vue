<script setup lang="ts">
import { useItemsArrayStore } from '@/stores/itemsArrayStore'

import { useItems } from '@/hooks/useItems'
import { storeToRefs } from 'pinia'
import { onMounted, onUpdated, ref } from 'vue'
import SkeletonSide from '../SkeletonSide.vue'

const { createGreen, createYellow, createViolet } = useItems()

const props = defineProps<{
  isOpenS: {
    isOpen: boolean
    index: null | number
  }
}>()
const itemsArrayStore = useItemsArrayStore()
const { itemsArray } = storeToRefs(itemsArrayStore)

onUpdated(() => {
  if (props.isOpenS.index) {
    imageItem.value = itemsArray.value[props.isOpenS.index].description

    let elem = ref<HTMLImageElement | null>(null)

    switch (imageItem.value) {
      case 'green':
        elem.value = createGreen()
        break
      case 'yellow':
        elem.value = createYellow()
        break
      case 'violet':
        elem.value = createViolet()
        break
      default:
        console.log('все сломалось')
    }

 


    if(img_elem.value?.childNodes.length){
      img_elem.value?.replaceChildren()
    }
    img_elem.value?.appendChild(elem.value as HTMLImageElement)
  }
})

const imageItem = ref<string | null>(null)

const img_elem = ref<null | HTMLDivElement>(null)
</script>

<template>
  <div ref="item_settings" class="item_settings" :class="{ is_open: props.isOpenS.isOpen }">
    <div ref="img_elem"></div>

    <div><hr /></div>

    <skeleton-side />

    <div></div>
    <hr />

    <button>ddsds</button>
  </div>
</template>

<style scoped>
.item_settings {
  position: absolute;
  background-color: #fff;
  width: 340px;
  right: -340px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.is_close {
  transition: transform 2s;
}

.is_open {
  transition: transform 2s;
  transform: translateX(-340px);
}
</style>
