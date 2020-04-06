<template>
  <div id="bookmarks">
    <left-side id="left-side" />
    <right-side id="right-side" />
    <drag-img id="drag-img" />
  </div>
</template>

<script>
import LeftSide from './components/left/LeftSide'
import RightSide from './components/right/RightSide'
import DragImg from './components/DragImg'
export default {
  name: 'App',
  components: {
    LeftSide,
    RightSide,
    DragImg,
  },
  created() {
  }
}
</script>

<style lang="scss">
$color: red;
#bookmarks {
  display: flex;
  #left-side {
    width: 150px;
    padding-left: 19px;
    border-right: 1px solid #ccc;
    box-sizing: border-box;
  }
  #right-side {
    width: calc(100% - 150px);
    padding: 20px;
    box-sizing: border-box;
  }
}
</style>
