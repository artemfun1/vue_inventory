



export const useColorItemDown=(event:MouseEvent)=>{


  return document
  .elementFromPoint(event.clientX, event.clientY)
  ?.getAttribute('color')







}