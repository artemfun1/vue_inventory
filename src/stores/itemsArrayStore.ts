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
      count: 5,

      description: 'green'
    },
    {
      item: 'violet',
      count: 4,
      description: 'violet'
    },
    {
      item: 'yellow',
      count: 3,
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
    console.log(JSON.parse(localStorage.getItem('items')!))
    itemsArray.value = JSON.parse(localStorage.getItem('items')!)
  }

  const clearIndex = ref(0)

  const upItem = (index: string, color: string) => {
    clearIndex.value = +index
  }

  const setCount = (
    obj: {
      item: string | HTMLImageElement | null
      count: number
      description: string | null
    },
    num: number,
    index: number
  ) => {
    const result = itemsArray.value[index].count - num > 0 ? itemsArray.value[index].count - num : 0

    if (result === 0) {
      itemsArray.value[index] = {
        item: null,
        count: 0,
        description: null
      }

      itemsArray.value.forEach((obj) => {
        obj.item = obj.description
      })
      localStorage.setItem('items', JSON.stringify(itemsArray.value))

      return
    }
    console.log(2)
    itemsArray.value[index] = {
      item: obj.description,
      count: result,
      description: obj.description
    }

    itemsArray.value.forEach((obj) => {
      obj.item = obj.description
    })

    localStorage.setItem('items', JSON.stringify(itemsArray.value))
  }

  const downItem = (index: string, color: string) => {
    const count = itemsArray.value[clearIndex.value].count

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
      count: count,
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

  return { itemsArray, downItem, upItem, setCount }
})
