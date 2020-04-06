import store from '../store'
import { throttle, debounce } from './utils'
// 开始拖动
const DRAG_START = (data, e) => {
  store.commit('setCurrentDrag', data)
  const svg = document.querySelector('#drag-img')
  e.dataTransfer.setDragImage(svg, 300, 160)
}
const DRAG_END = () => {
  store.commit('setCurrentDrag', {})
}
const DRAG_OVER = ($ref, data, e, prev, next) => {
  const currentDrag = store.state.currentDrag
  return new Promise((reslove, reject) => {
    // 判断是不是自身
    if (currentDrag.id === data.id) return reject('isSelf')

    // 判断是不是父元素
    if (currentDrag.children && currentDrag.children.filter(v => (v.id === data.id)).length > 0) return reject('isParent')

    // 可以通过这个来做边界判定
    const top  = $ref.getBoundingClientRect().top
    const height = $ref.getBoundingClientRect().height
    const ratio = (e.clientY - top)/height
    const state = data.children ? dragstateToFolder(ratio, prev, next) : dragstateToUrl(ratio, prev, next)
    reslove(state)
  })
}

// 获取拖拽时的状态
function dragstateToFolder(ratio, prev, next) {
  // 判断当前拖拽元素是不是自己的prev或者是next
  // 判断第一个和最后一个的逻辑待添加
  const isPrevOrNext = checkPrevOrNext(prev, next)
  if (!isPrevOrNext) {
    if (ratio > .25 && ratio < .75) return 'on'
    else if (ratio <= .25) return 'above'
    else return 'below'
  }

  if (isPrevOrNext === 'isPrev') {
    if (ratio < .5) return 'on'
    else return 'below'
  }

  if (isPrevOrNext === 'isNext') {
    if (ratio > .5) return 'on'
    else return 'above'
  }
}

function dragstateToUrl(ratio, prev, next) {
  // 判断当前拖拽元素是不是自己的prev或者是next
  // 判断第一个和最后一个的逻辑待添加
  const isPrevOrNext = checkPrevOrNext(prev, next)
  if (!isPrevOrNext) {
    if (ratio > .5) return 'below'
    else return 'above'
  }

  if (isPrevOrNext === 'isPrev') {
    if (ratio > .5) return 'below'
  }

  if (isPrevOrNext === 'isNext') {
    if (ratio < .5) return 'above'
  }
}

function checkPrevOrNext(prev, next) {
  const currentDrag = store.state.currentDrag
  if (currentDrag.id === next.id) return 'isNext'
  if (currentDrag.id === prev.id) return 'isPrev'
  return false
}



export function install(Vue) {
	Vue.prototype.$_drag = {
    dragEvent: {
      DRAG_START,
      DRAG_END,
      DRAG_OVER,
    },
  }
}
