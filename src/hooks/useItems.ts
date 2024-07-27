import ItemGreen from '../assets/ItemGreen.png'
import ItemViolet from '../assets/ItemViolet.png'
import ItemYellow from '../assets/ItemYellow.png'

export const useItems = () => {
  const createGreen = () => {
    const GreenItem: HTMLImageElement = document.createElement('img')
    GreenItem.setAttribute('class', 'item')
    GreenItem.setAttribute('src', ItemGreen)
    GreenItem.setAttribute('alt', 'img')
    GreenItem.setAttribute('style', 'width:80px;cursor:pointer;height:80px')
    GreenItem.setAttribute('color', 'green')
    return GreenItem
  }

  const createYellow = () => {
    const YellowItem: HTMLImageElement = document.createElement('img')
    YellowItem.setAttribute('class', 'item')
    YellowItem.setAttribute('src', ItemYellow)
    YellowItem.setAttribute('alt', 'img')
    YellowItem.setAttribute('style', 'width:80px;cursor:pointer;height:80px')
    YellowItem.setAttribute('color', 'yellow')
    return YellowItem
  }

  const createViolet = () => {
    const VioletItem: HTMLImageElement = document.createElement('img')
    VioletItem.setAttribute('class', 'item')
    VioletItem.setAttribute('src', ItemViolet)
    VioletItem.setAttribute('alt', 'img')
    VioletItem.setAttribute('style', 'width:80px;cursor:pointer;height:80px')
    VioletItem.setAttribute('color', 'violet')
    return VioletItem
  }

  return {
    createGreen,
    createYellow,
    createViolet
  }
}
