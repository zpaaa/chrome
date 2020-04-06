<template>
  <li class="folder-item">
    <div class="folder-title"
      draggable="true"
      ref="dragTarget"
      @click="setCurrentFolder(data)"
      @dragstart="dragstart"
      @dragend="dragend"
      @dragenter="dragenter"
      @dragover.prevent="dragover"
      @dragleave="dragleave"
      @click.stop="toggleList"
      :style="{paddingLeft: (tabMoreIndex *20) + 'px'}"
    >
      <p :class="{'is-current-folder': currentFolder.id === data.id}">
        <span
          :class="showChild ? 'icon icon-arrow-down' : 'icon icon-arrow-up'"
          v-if="checkChildrenHasFolderType()"
        >
        </span>
        {{data.title}}
      </p>
    </div>
    <ul
      class="folder-list"
      v-if="checkChildrenHasFolderType()"
    >
      <template v-for="(item, index) in data.children">
        <left-side-item
          :key="item.index"
          :data="item"
          :prev="data.children[index - 1] || {}"
          :next="data.children[index + 1] || {}"
          v-show="showChild"
          v-if="item.children"
          :tabIndex="tabMoreIndex"
        />
      </template>
    </ul>
  </li>
</template>
<script>
import { debounce, throttle } from '../../lib/utils'
import { mapState, mapMutations } from 'vuex'
export default {
  name: "LeftSideItem",
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    prev: {
      type: Object,
      default: () => {
        return {}
      }
    },
    next: {
      type: Object,
      default: () => {
        return {}
      }
    },
    tabIndex: {
      type: Number,
      default: () => {
        return 0
      }
    }
  },
  data() {
    // 用作缩进判断
    this.tabMoreIndex = this.tabIndex + 1
    return {
      showChild: true
    };
  },
  computed: {
    ...mapState({
      currentDrag: state => state.currentDrag,
      currentFolder: state => state.currentFolder,
    }),
    isDragUrl() {
      return !this.currentDrag.children
    }
  },
  watch: {
    currentDrag(curr) {
      if (!curr) {
        this.clearDragStyle()
      }
    }
  },
  methods: {
    ...mapMutations({
      setCurrentFolder: 'setCurrentFolder',
    }),
    // 展开收起菜单
    toggleList() {
      this.showChild = !this.showChild;
    },
    checkChildrenHasFolderType() {
      return this.data.children.filter(v => v.children).length > 0
    },
    dragstart(e) {
      this.$_drag.dragEvent.DRAG_START(this.data, e)
    },
    dragend(e) {
      this.$_drag.dragEvent.DRAG_END()
    },
    dragenter() {
      if(this.isDragUrl) {
        // 如果是自己的子元素 就没有变化
        if(this.data.children.filter(v => (v.id === this.currentDrag.id)).length > 0) return
        const targetRef = this.$refs.dragTarget
        targetRef.classList.add(`folder-title-on`)
      }
    },

    dragover(e) {
      // 文件 -> 文件夹
      if (this.isDragUrl) return
      const targetRef = this.$refs.dragTarget
      this.$_drag.dragEvent.DRAG_OVER(
        targetRef,
        this.data,
        e,
        this.prev,
        this.next)
      .then(state => {
        // console.log(state)
        this.clearDragStyle()
        targetRef.classList.add(`folder-title-${state}`)
      }).catch(err => {
        console.log(err)
      })
    },

    dragleave() {
      this.clearDragStyle()
    },

    clearDragStyle() {
      const targetRef = this.$refs.dragTarget
      targetRef.classList.remove('folder-title-on')
      targetRef.classList.remove('folder-title-above')
      targetRef.classList.remove('folder-title-below')
    }

  }
};
</script>

<style lang="scss">
.folder-list {
  // padding-left: 20px;
  .folder-item {
    user-select: none;
    .folder-title {
      position: relative;
      &.folder-title-on {
        background: cornflowerblue;
        p {
          color: grey;
        }
      }
      &.folder-title-above {
        &::after {
          content: '';
          position: absolute;
          top: -1px;
          left: 0;
          width: 100%;
          height: 2px;
          background: cornflowerblue;
        }
      }
      &.folder-title-below {
        &::before {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          width: 100%;
          height: 2px;
          background: cornflowerblue;
        }
      }
      p {
        position: relative;
        height: 28px;
        padding-left: 20px;
        line-height: 28px;
        font-size: 12px;
        box-sizing: border-box;
        &.is-current-folder {
          color: cornflowerblue;
        }
        .icon {
          position: absolute;
          left: 0px;
          top: 8px;
          text-align: center
        }
      }

    }
  }
}
</style>
