import type { Ref } from 'vue'

export const setBorderInventory = (inventory: Ref<HTMLDivElement | null>) => {
  inventory.value?.children[0].setAttribute('style', 'border-top-left-radius: 15px ;')
  inventory.value?.children[4].setAttribute('style', 'border-top-right-radius: 15px ;')
  inventory.value?.children[20].setAttribute('style', 'border-bottom-left-radius: 15px ;')
  inventory.value?.children[24].setAttribute('style', 'border-bottom-right-radius: 15px ;')
}
