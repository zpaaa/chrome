<template>
  <li
    class="right-side-item"
    draggable="true"
    ref="dragTarget"
    @dragstart="dragstart"
    @dragend="dragend"
    @dragover.prevent="dragover"
    @dragleave="dragleave"
  >
    <span
      :class="data.children ? 'icon icon-folder' : 'icon icon-url'"
    >
    </span>
    <p>{{data.title}}</P>
  </li>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'RightSideItem',
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
  },
  computed: {
    ...mapState({
      currentDrag: state => state.currentDrag,
    }),
  },
  watch: {
    currentDrag(curr) {
      if (!curr) {
        this.clearDragStyle()
      }
    }
  },
  methods: {
    dragstart(e) {
      this.$_drag.dragEvent.DRAG_START(this.data, e)
    },
    dragend() {
      this.$_drag.dragEvent.DRAG_END()
    },
    dragover(e) {
      const targetRef = this.$refs.dragTarget
      this.$_drag.dragEvent.DRAG_OVER(
        targetRef,
        this.data,
        e,
        this.prev,
        this.next)
      .then(state => {
        if (state) {
          console.log(state)
          this.clearDragStyle()
          targetRef.classList.add(`right-side-item-${state}`)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    dragleave() {
      console.log('leave')
      this.clearDragStyle()
    },
    clearDragStyle() {
      const targetRef = this.$refs.dragTarget
      targetRef.classList.remove('right-side-item-on')
      targetRef.classList.remove('right-side-item-above')
      targetRef.classList.remove('right-side-item-below')
    }
  }
}
</script>

<style lang='scss'>
@import '@/scss/mixin.scss';
.right-side-item {
  display: flex;
  align-items: center;
  user-select: none;
  position: relative;
  &.right-side-item-on {
    background: cornflowerblue;
  }
  &.right-side-item-above {
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
  &.right-side-item-below {
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
  span {
    &.icon-folder {
      color: yellowgreen;
    }
  }
  p {
    @include line-cut;
    height: 28px;
    line-height: 28px;
    margin-left: 10px;
    font-size: 12px;
  }
}

</style>
