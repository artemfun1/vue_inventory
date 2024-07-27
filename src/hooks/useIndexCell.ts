export const useIndexCell = (item: HTMLElement, event: MouseEvent, func: Function) => {
  item.hidden = true
  let elemBelow = document.elementFromPoint(event.clientX, event.clientY)
  item.hidden = false

  if (!elemBelow) return
  let droppableBelow: HTMLElement | null = elemBelow.closest('.cell')
  func(droppableBelow)

  const index = droppableBelow?.getAttribute('itemid')
  return index
}
