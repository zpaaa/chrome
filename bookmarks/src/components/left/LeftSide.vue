<template>
  <div class="left-side">
    <template v-for="(item, index) in data" >
        <ul
          class="folder-list"
          v-if="item.children"
          :key="item.id">
          <left-side-item
            :data="item"
            :tabIndex="0"
            :prev="data[index - 1] || {}"
            :next="data[index + 1] || {}"
          />
        </ul>
    </template>
  </div>
</template>

<script>
import LeftSideItem from './LeftSideItem'
import { data } from '../../data'
export default {
  name: 'LeftSide',
  data() {
    return {
      data: []
    }
  },
  components: {
    LeftSideItem,
  },
  created() {
    this.data = data[0].children
    console.log(data)
  }
}
</script>

<style lang="scss">
</style>
