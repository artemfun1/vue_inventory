<template>
  <div ref="inventory" class="inventory">
    <div
      class="cell"
      v-for="i in 25"
      :key="i"
      @click="() => getIndexClick(i - 1)"
      :itemId="i - 1"
      ref="inventory"
    >
      <div v-if="isCountArray[i - 1]" class="cell_count">1</div>
    </div>
    <item-setting :is-open-s="isOpen"  />
  </div>
</template>

<script setup lang="ts">
import { useColorItemDown } from '@/hooks/useColorItemDown'
import { useIndexCell } from '@/hooks/useIndexCell'
import { useItemsArrayStore } from '@/stores/itemsArrayStore'
import { storeToRefs } from 'pinia'
import { setBorderInventory } from '@/utils/setBorderInventory'
import itemSetting from './itemSetting.vue'

import { onMounted, ref, watch } from 'vue'

let isOpen= ref<{
  isOpen:boolean
  index:null | number
}>({
  isOpen:false,
  index:null
})



function getIndexClick(i:number) {
  
  isOpen.value = {
    isOpen:true,
    index:i
  }

}

const itemsArrayStore = useItemsArrayStore()
const { itemsArray } = storeToRefs(itemsArrayStore)
const { upItem, downItem } = itemsArrayStore

const inventory = ref<HTMLDivElement | null>(null)

const items = ref<NodeListOf<HTMLElement> | null>(null)

const isCountArray = ref<boolean[]>([])

const addCountArr = () => {
  isCountArray.value = []
  itemsArray.value.forEach((obj) => {
    if (obj.description) {
      isCountArray.value.push(true)
    } else {
      isCountArray.value.push(false)
    }
  })
}

watch(itemsArray, addCountArr, { deep: true })

onMounted(() => {
  addCountArr()
  setBorderInventory(inventory)

  for (let i = 0; i < itemsArray.value.length; i++) {
    if (itemsArray.value[i].item !== null) {
      inventory.value?.children[i].appendChild(itemsArray.value[i].item as HTMLImageElement)
    }
  }

  items.value = document.querySelectorAll('.item')

  for (let i = 0; i < items.value.length; i++) {
    let currentDroppable: null | HTMLElement = null

    items.value[i].onmousedown = function (event: MouseEvent) {
      const item = items.value![i]

      const indexItemDown = useIndexCell(item, event, enterDroppable)

      const colorItemDown = useColorItemDown(event)
      if (indexItemDown && colorItemDown) {
        upItem(indexItemDown, colorItemDown)
      }

      let shiftX = event.clientX - item.getBoundingClientRect().left
      let shiftY = event.clientY - item.getBoundingClientRect().top

      item.style.position = 'absolute'
      item.style.zIndex = '10'
      item.style.width = '80px'
      item.style.height = '80px'
      item.style.outlineOffset = '10px'
      item.style.outline = '1px dashed white'
      item.style.borderRadius = '20px'
      item.style.cursor = 'pointer'

      document.body.append(item)

      moveAt(event.pageX, event.pageY)

      function moveAt(pageX: number, pageY: number) {
        item.style.left = pageX - shiftX + 'px'
        item.style.top = pageY - shiftY + 'px'
      }

      function onMouseMove(event: MouseEvent) {
        moveAt(event.pageX, event.pageY)

        item.hidden = true
        let elemBelow = document.elementFromPoint(event.clientX, event.clientY)
        item.hidden = false

        if (!elemBelow) return

        let droppableBelow: HTMLElement | null = elemBelow.closest('.cell')

        if (currentDroppable != droppableBelow) {
          if (currentDroppable) {
            // логика обработки процесса "вылета" из droppable (удаляем подсветку)
            leaveDroppable(currentDroppable)
          }

          currentDroppable = droppableBelow
          if (currentDroppable) {
            // логика обработки процесса, когда мы "влетаем" в элемент droppable
            enterDroppable(currentDroppable)
          }
        }
      }

      document.addEventListener('mousemove', onMouseMove)

      item.onmouseup = function (event: MouseEvent) {
        item.hidden = true
        let elemBelow = document.elementFromPoint(event.clientX, event.clientY)
        item.hidden = false

        if (!elemBelow) return

        let droppableBelow: HTMLElement | null = elemBelow.closest('.cell')

        if (droppableBelow) {
          droppableBelow.style.background = '#262626'
          droppableBelow?.append(item)
        }

        item.style.outlineOffset = ''
        item.style.outline = ''
        item.style.borderRadius = ''

        item.style.position = 'static'
        item.style.zIndex = '1000'
        item.style.width = '80px'
        item.style.height = '80px'
        item.style.cursor = 'pointer'

        const putIndex = currentDroppable?.getAttribute('itemid')

        if (putIndex && colorItemDown) {
          downItem(putIndex, colorItemDown)
        }

        document.removeEventListener('mousemove', onMouseMove)
        item.onmouseup = null
      }

      function enterDroppable(elem: HTMLElement) {
        elem.style.background = '#4d4d4d'
      }

      function leaveDroppable(elem: HTMLElement) {
        elem.style.background = ''
      }
    }
    items.value[i].ondragstart = function () {
      return false
    }
  }
})
</script>

<style scoped>
.inventory {
  background-color: #262626;
  min-width: 680px;
  max-width: 680px;
  min-height: 680px;
  max-height: 680px;
  margin-left: 24px;
  border-radius: 15px;
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;

  display: grid;

  grid-template-areas:
    '0 1 2 3 4 '
    '5 6 7 8 9 '
    '10 11 12 13 14'
    '15 16 17 18 19'
    '20 21 22 23 24';
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;

  & .cell {
    border: 1px solid #4d4d4d;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  & .cell_count {
    color: #b6b6b6;
    position: absolute;
    width: 27px;
    height: 27px;
    display: flex;
    align-items: center;
    justify-content: center;
    right: 0;
    bottom: 0;
    border-top: 2px solid #4d4d4d;
    border-left: 2px solid #4d4d4d;
    border-top-left-radius: 15px;
  }
  & .item {
    width: 80px;
    height: 80px;
  }
}
</style>
