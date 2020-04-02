<template>
  <div class="left-side">
    <template v-for="item in data" >
        <ul
          class="floder-list"
          v-if="item.children"
          :key="item.id">
          <left-side-item :data="item" :tabIndex="0"/>
        </ul>
    </template>
  </div>
</template>

<script>
import LeftSideItem from './LeftSideItem'
import { data } from '../../data'
import { filterFloders } from '../../native'
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
  }
}
</script>

<style lang="scss">
.left-side {
  width: 150px;
  padding-left: 39px;
  border-right: 1px solid #ccc;
}
</style>
