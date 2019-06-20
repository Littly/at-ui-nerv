export function styleStr2Obj (str) {
  const obj = {}
  if (typeof str === 'string') {
    const arr = str.split(';')
    arr.forEach((item) => {
      if (item.length > 0) {
        const arrTemp = item.split(':')
        const key = arrTemp[0]
        const value = arrTemp[1]
        obj[key] = value
      }
    })
  }
  return obj
}
export function calculatePosition (placement = 'top', trigger, popover) {
  if (!(trigger && popover)) {
    return
  }
  const position = {
    left: 0,
    top: 0
  }
  switch (placement) {
    case 'top' :
      position.left = trigger.offsetLeft - (popover.offsetWidth / 2) + (trigger.offsetWidth / 2)
      position.top = trigger.offsetTop - popover.offsetHeight
      break
    case 'top-left':
      position.left = trigger.offsetLeft
      position.top = trigger.offsetTop - popover.offsetHeight
      break
    case 'top-right':
      position.left = trigger.offsetLeft + trigger.offsetWidth - popover.offsetWidth
      position.top = trigger.offsetTop - popover.offsetHeight
      break
    case 'left':
      position.left = trigger.offsetLeft - popover.offsetWidth
      position.top = trigger.offsetTop + (trigger.offsetHeight / 2) - (popover.offsetHeight / 2)
      break
    case 'left-top':
      position.left = trigger.offsetLeft - popover.offsetWidth
      position.top = trigger.offsetTop
      break
    case 'left-bottom':
      position.left = trigger.offsetLeft - popover.offsetWidth
      position.top = trigger.offsetTop + trigger.offsetHeight - popover.offsetHeight
      break
    case 'right':
      position.left = trigger.offsetLeft + trigger.offsetWidth
      position.top = trigger.offsetTop + (trigger.offsetHeight / 2) - (popover.offsetHeight / 2)
      break
    case 'right-top':
      position.left = trigger.offsetLeft + trigger.offsetWidth
      position.top = trigger.offsetTop
      break
    case 'right-bottom':
      position.left = trigger.offsetLeft + trigger.offsetWidth
      position.top = trigger.offsetTop + trigger.offsetHeight - popover.offsetHeight
      break
    case 'bottom':
      position.left = trigger.offsetLeft - (popover.offsetWidth / 2) + (trigger.offsetWidth / 2)
      position.top = trigger.offsetTop + trigger.offsetHeight
      break
    case 'bottom-left':
      position.left = trigger.offsetLeft
      position.top = trigger.offsetTop + trigger.offsetHeight
      break
    case 'bottom-right':
      position.left = trigger.offsetLeft + trigger.offsetWidth - popover.offsetWidth
      position.top = trigger.offsetTop + trigger.offsetHeight
      break
    default:
      // if user set wrong placement, then use default 'top'
      position.left = trigger.offsetLeft - (popover.offsetWidth / 2) + (trigger.offsetWidth / 2)
      position.top = trigger.offsetTop - popover.offsetHeight
      break
  }
  return position
}
