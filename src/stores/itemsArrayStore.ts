import { useItems } from '@/hooks/useItems'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useItemsArrayStore = defineStore('counter', () => {
  const { createGreen, createYellow, createViolet } = useItems()

  const itemsArray = ref<
    { item: string | HTMLImageElement | null; count: number; description: string | null }[]
  >([
    {
      item: 'green',
      count: 1,

      description: 'green'
    },
    {
      item: 'violet',
      count: 1,
      description: 'violet'
    },
    {
      item: 'yellow',
      count: 1,
      description: 'yellow'
    },
    {
      item: null,
      count: 0,
      description: null
    },
    {
      item: null,
      count: 0,
      description: null
    },
    {
      item: null,
      count: 0,
      description: null
    },
    {
      item: null,
      count: 0,
      description: null
    },
    {
      item: null,
      count: 0,
      description: null
    },
    {
      item: null,
      count: 0,
      description: null
    },
    {
      item: null,
      count: 0,
      description: null
    },
    {
      item: null,
      count: 0,
      description: null
    },
    {
      item: null,
      count: 0,
      description: null
    },
    {
      item: null,
      count: 0,
      description: null
    },
    {
      item: null,
      count: 0,
      description: null
    },
    {
      item: null,
      count: 0,
      description: null
    },
    {
      item: null,
      count: 0,
      description: null
    },
    {
      item: null,
      count: 0,
      description: null
    },
    {
      item: null,
      count: 0,
      description: null
    },
    {
      item: null,
      count: 0,
      description: null
    },
    {
      item: null,
      count: 0,
      description: null
    },
    {
      item: null,
      count: 0,
      description: null
    },
    {
      item: null,
      count: 0,
      description: null
    },
    {
      item: null,
      count: 0,
      description: null
    },
    {
      item: null,
      count: 0,
      description: null
    },
    {
      item: null,
      count: 0,
      description: null
    }
  ])

  if (localStorage.getItem('items')) {
    itemsArray.value = JSON.parse(localStorage.getItem('items')!)
  }

  const clearIndex =ref(0)

  const upItem = (index: string, color: string) => {
    clearIndex.value = +index
  }

  const downItem = (index: string, color: string) => {
    itemsArray.value[clearIndex.value] = {
      item: null,
      count: 0,
      description: null
    }
    const i = +index
    let elem: HTMLImageElement | null = null
    switch (color) {
      case 'green':
        elem = createGreen()
        break
      case 'yellow':
        elem = createYellow()
        break
      case 'violet':
        elem = createViolet()
        break
      default:
        console.log('все сломалось')
    }

    itemsArray.value[i] = {
      item: color,
      count: 0,
      description: color
    }

    itemsArray.value.forEach((obj) => {
      obj.item = obj.description
    })

    localStorage.setItem('items', JSON.stringify(itemsArray.value))
  }

  itemsArray.value.forEach((obj, i) => {
    if (obj.item !== null) {
      switch (obj.item) {
        case 'green':
          itemsArray.value[i].item = createGreen()
          break
        case 'yellow':
          itemsArray.value[i].item = createYellow()
          break
        case 'violet':
          itemsArray.value[i].item = createViolet()
          break
        default:
          console.log('все сломалось')
      }
    }
  })

  return { itemsArray, downItem, upItem }
})
