<template>
  <div id="bookmarks">
    <left-side id="left-side"></left-side>
  </div>
</template>

<script>
import LeftSide from './components/left/LeftSide'
export default {
  name: 'App',
  components: {
    LeftSide,
  },
  created() {
  }
}
</script>

<style lang="scss">
$color: red;
.floder {
  margin-left: 20px;
}
</style>
