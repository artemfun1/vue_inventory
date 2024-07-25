
import ItemGreen from '../assets/ItemGreen.png'
import ItemViolet from '../assets/ItemViolet.png'
import ItemYellow from '../assets/ItemYellow.png'


export const useItems=()=>{

  const GreenItem:HTMLImageElement = document.createElement("img")
  GreenItem.setAttribute('class','item')
  GreenItem.setAttribute('src',ItemGreen)
  GreenItem.setAttribute('alt','img')
  GreenItem.setAttribute('style','width:80px;height:80px')
  
  const YellowItem:HTMLImageElement = document.createElement("img")
  YellowItem.setAttribute('class','item')
  YellowItem.setAttribute('src',ItemYellow)
  YellowItem.setAttribute('alt','img')
  YellowItem.setAttribute('style','width:80px;height:80px')
  
  const VioletItem:HTMLImageElement = document.createElement("img")
  VioletItem.setAttribute('class','item')
  VioletItem.setAttribute('src',ItemViolet)
  VioletItem.setAttribute('alt','img')
  VioletItem.setAttribute('style','width:80px;height:80px')

return{
  GreenItem,
  YellowItem,
  VioletItem
}



}



