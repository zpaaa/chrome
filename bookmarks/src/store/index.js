import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentDrag: null,        // 当前拖拽的元素
    currentFolder: {},    // 当前选中的侧边栏文件夹
    dragInfo: {},
  },
  getters: {
    dragInfo: state => {
      const { currentDrag } = state
      if (currentDrag) {
        return {
          title: currentDrag.title,
          isFolder: !!currentDrag.children
        }
      }
      return {}

    }
  },
  mutations: {
    setCurrentDrag(state, currentDrag) {
      state.currentDrag = currentDrag
    },
    setCurrentFolder(state, currentFolder) {
      state.currentFolder = currentFolder
    },
    setDragInfo(state, dragInfo) {
      state.dragInfo = dragInfo
    },
  },
  actions: {
  },
  modules: {
  }
})
