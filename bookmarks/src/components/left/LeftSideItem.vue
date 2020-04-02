<template>
  <li>
    <div class="floder-title"  @click.stop="toggleList">{{data.title}}</div>
    <ul class="floder-list" v-if="checkChildrenHasFolderType()">
      <template v-for="item in data.children">
        <left-side-item :key="item.index" :data="item" v-if="showChild && item.children" />
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
      required: true
    }
  },
  data() {
    return {
      showChild: true
    };
  },
  methods: {
    toggleList() {
      this.showChild = !this.showChild;
    },
    checkChildrenHasFolderType() {
      return this.data.children.filter(v => v.children).length > 0
    }
  }
};
</script>

<style lang="scss">
.floder-list {
  margin-left: 20px;
  .floder-title {
    height: 28px;
    line-height: 28px;
  }
}
</style>
