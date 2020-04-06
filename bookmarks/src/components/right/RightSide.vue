<template>
  <div class="right-side">
    <ul>
      <right-side-item
        v-for="(item, index) in currentFolder.children"
        :key="item.id"
        :data="item"
        :prev="currentFolder.children[index-1]||{}"
        :next="currentFolder.children[index+1]||{}"
        @click="setActiveData(item)"
      />
    </ul>
  </div>
</template>

<script>
import RightSideItem from './RightSideItem'
import { mapState } from 'vuex'
export default {
  name: 'RightSide',
  components: {
    RightSideItem,
  },
  computed: {
    ...mapState({
      currentFolder: state => state.currentFolder,
    })
  },
  data() {
    return {
      activeData: [],
    }
  },
  methods: {
    setActiveData(item) {
      this.activeData.push(item)
    },
  }
}
</script>

<style>

</style>
