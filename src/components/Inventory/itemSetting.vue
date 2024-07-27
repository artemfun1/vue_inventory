<template>
  <div
    ref="item_settings"
    class="item_settings"
    :class="{ is_open: props.isOpenS.isOpen, is_close: !props.isOpenS.isOpen }"
  >
    <img
      class="closeBtn"
      @click="emit('closeItem')"
      src="../../assets/carbon_close.svg"
      alt="img"
    />
    <div class="img_item" ref="img_elem"></div>
    <hr class="line" />

    <skeleton-item />

    <hr class="line" />

    <button @click="isVisibleBtn = true" class="btn_item">Удалить предмет</button>

    <div v-if="isVisibleBtn" class="block_delete">
      <div class="block_input">
        <input v-model="value" type="number" placeholder="Введите количество" class="input" />
      </div>
      <div class="block_btn">
        <button @click="isVisibleBtn = false" class="btn_cancel">Отмена</button>
        <button @click="() => deleteCount()" class="btn_confirm">Подтвердить</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useItemsArrayStore } from '@/stores/itemsArrayStore'

import { useItems } from '@/hooks/useItems'
import { storeToRefs } from 'pinia'
import { onUpdated, ref } from 'vue'
import SkeletonItem from './SkeletonItem.vue'

const { createGreen, createYellow, createViolet } = useItems()

const props = defineProps<{
  isOpenS: {
    isOpen: boolean
    index: number
  }
}>()
const value = ref('')
const emit = defineEmits(['closeItem'])
const isVisibleBtn = ref(false)
const itemsArrayStore = useItemsArrayStore()
const { itemsArray } = storeToRefs(itemsArrayStore)
const deleteCount = () => {
  const obj = itemsArray.value[props.isOpenS.index]
  const index = props.isOpenS.index

  const num = +value.value

  itemsArrayStore.setCount(obj, num, index)
  value.value = ''
  isVisibleBtn.value = false
}
onUpdated(() => {
  if (itemsArray.value[props.isOpenS.index].description) {
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

    if (img_elem.value?.childNodes.length) {
      img_elem.value?.replaceChildren()
    }

    elem.value?.setAttribute('style', 'width:180px;height:180px')
    img_elem.value?.appendChild(elem.value as HTMLImageElement)
  }
})

const imageItem = ref<string | null>(null)

const img_elem = ref<null | HTMLDivElement>(null)
</script>

<style scoped>
.item_settings {
  position: absolute;
  background-color: #262626;
  width: 340px;
  right: -340px;
  height: 100%;
  border: 1px solid #4d4d4d;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;

  & .closeBtn {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
  }
  & .img_item {
    width: 180px;
    height: 180px;
    margin: 70px 0 30px 0;
  }
  & .line {
    width: 85%;
    border: 1px solid #4d4d4d;
  }
  & .btn_item {
    margin: 10px 0 10px 0;
    height: 50px;
    width: 85%;
    border-radius: 15px;
    background-color: #fa7272;
    color: aliceblue;
    border: none;
    &:hover {
      background-color: #fa72727b;
      &:active {
        border: 1px solid #262626;
      }
    }
  }
  & .block_delete {
    border: 1px solid #4d4d4d;
    background-color: #262626;
    position: absolute;
    width: 100%;
    height: 150px;
    bottom: 0;
    right: 0;
    display: flex;
    flex-direction: column;

    & .block_input {
      display: flex;
      align-items: center;
      height: 50%;
      width: 100%;
      justify-content: center;

      & .input {
        width: 50%;
        background-color: transparent;
        border: 1px solid #4d4d4d;
        outline: none;
        width: 80%;
        height: 35px;
        position: relative;
        top: 6px;
        border-radius: 5px;
        color: #ababab;
        padding-left: 10px;
        padding-right: 10px;
      }
    }
    & .block_btn {
      display: flex;
      align-items: center;
      height: 50%;
      width: 100%;
      display: flex;
      justify-content: center;
      gap: 5px;

      & .btn_cancel {
        width: 35%;
        border-radius: 15px;
        height: 40px;
        border: none;
        position: relative;
        top: -6px;
        &:hover {
          background-color: #acacac7b;
          &:active {
            border: 1px solid #262626;
          }
        }
      }
      & .btn_confirm {
        position: relative;
        top: -6px;
        width: 55%;
        border-radius: 15px;
        height: 40px;
        color: aliceblue;
        background-color: #fa7272;
        border: none;
        &:hover {
          background-color: #fa72727b;
          &:active {
            border: 1px solid #262626;
          }
        }
      }
    }
  }
}

.is_close {
  transition: transform 2s;
  transform: translateX(340px);
}

.is_open {
  transition: transform 1s;
  transform: translateX(-340px);
}
</style>
