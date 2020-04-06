import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentDrag: {},        // 当前拖拽的元素
    currentFolder: {},    // 当前选中的侧边栏文件夹
  },
  mutations: {
    setCurrentDrag(state, currentDrag) {
      state.currentDrag = currentDrag
    },
    setCurrentFolder(state, currentFolder) {
      state.currentFolder = currentFolder
    },
  },
  actions: {
  },
  modules: {
  }
})
