<template>
  <div>
    <template v-for="item in data" >
      <div
        class="left-side"
        v-if="item.children"
        :key="item.id">
        <ul>
          <left-side-item :data="item" />
        </ul>
      </div>
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
    // this.data = filterFloders(data)
    this.data = data
    console.log(this.data)
  }
}
</script>

<style lang="scss">
</style>
