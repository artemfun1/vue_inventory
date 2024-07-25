<template>
  <div ref="inventory" class="inventory">
    <div class="cell" v-for="i in 25" :key="i" ref="inventory">
      <div class="cell_count">1</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { useItems } from '@/hooks/useItems'

const inventory = ref<HTMLDivElement | null>(null)

const elems = ref<NodeListOf<HTMLElement> | null>(null)

const { GreenItem, VioletItem, YellowItem } = useItems()

onMounted(() => {
  inventory.value?.children[0].setAttribute('style', 'border-top-left-radius: 15px ;')
  inventory.value?.children[4].setAttribute('style', 'border-top-right-radius: 15px ;')
  inventory.value?.children[20].setAttribute('style', 'border-bottom-left-radius: 15px ;')
  inventory.value?.children[24].setAttribute('style', 'border-bottom-right-radius: 15px ;')
  inventory.value?.children[0].appendChild(GreenItem)
  inventory.value?.children[1].appendChild(VioletItem)
  inventory.value?.children[2].appendChild(YellowItem)

  elems.value = document.querySelectorAll('.item')

  for (let i = 0; i < elems.value.length; i++) {
    let currentDroppable: null | HTMLElement = null
    elems.value[i].onmousedown = function (event: MouseEvent) {
      const item = elems.value![i]

      let shiftX = event.clientX - item.getBoundingClientRect().left
      let shiftY = event.clientY - item.getBoundingClientRect().top

      console.log(item)

      item.style.position = 'absolute'
      item.style.zIndex = '1000'
      item.style.width = '80px'
      item.style.height = '80px'
      item.style.outlineOffset = '10px'
      item.style.outline = '1px dashed white'
      item.style.borderRadius = '20px'

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

      function onMouseUp() {
        item.style.position = 'static'
        item.style.zIndex = '1'
        item.style.width = '80px'
        item.style.height = '80px'

        currentDroppable?.append(item)
        currentDroppable!.style.background = '#262626'
      }

      document.addEventListener('mousemove', onMouseMove)
      document.addEventListener('mouseup', onMouseUp)

      item.onmouseup = function () {
        item.style.outlineOffset = ''
        item.style.outline = ''
        item.style.borderRadius = ''

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
    elems.value[i].ondragstart = function () {
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

  display: grid;
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
    color: #4d4d4d;
    position: absolute;
    width: 25px;
    height: 25px;
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
