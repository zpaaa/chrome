<template>
  <li class="folder-item">
    <div class="floder-title"
      draggable="true"
      ref="dragTarget"
      @dragover.prevent="dragover"
      @click.stop="toggleList"
      :style="{paddingLeft: (tabMoreIndex *20) + 'px'}"
    >
      <p>
        <span
          :class="showChild ? 'icon icon-arrow-down' : 'icon icon-arrow-up'"
          v-if="checkChildrenHasFolderType()"
        >
        </span>
        {{data.title}}</p>
    </div>
    <ul
      class="floder-list"
      v-if="checkChildrenHasFolderType()"
    >
      <template v-for="item in data.children">
        <left-side-item
          :key="item.index"
          :data="item"
          v-if="showChild && item.children"
          :tabIndex="tabMoreIndex"
        />
      </template>
    </ul>
  </li>
</template>
<script>
export default {
  name: "LeftSideItem",
  props: {
    data: {
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
  methods: {
    // 展开收起菜单
    toggleList() {
      this.showChild = !this.showChild;
    },
    checkChildrenHasFolderType() {
      return this.data.children.filter(v => v.children).length > 0
    },
    dragover(e) {
      // 可以通过这个来做边界判定
      const targetRef = this.$refs.dragTarget
      const top  = targetRef.getBoundingClientRect().top
      const height = targetRef.getBoundingClientRect().height
      // console.log(`dragover---x: ${e.clientY - top} ${height}`)
      // 文件夹到非相邻文件夹 1：2：1
      const state = (e.clientY - top)/height * 4
      // console.log(state)
      if (state > 1 && state < 3 ) {
        targetRef.classList.add('floder-title-hover')
      } else {
        targetRef.classList.remove('floder-title-hover')
      }




      // console.log(e)
    }
  }
};
</script>

<style lang="scss">
.floder-list {
  // padding-left: 20px;
  .folder-item {
    user-select: none;
    .floder-title {
      &.floder-title-hover {
        background: cornflowerblue;
      }
      p {
        position: relative;
        height: 28px;
        padding-left: 20px;
        line-height: 28px;
        font-size: 12px;
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
