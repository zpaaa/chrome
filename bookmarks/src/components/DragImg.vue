<template>
  <svg
    class="drag-img"
    ref="dragIcon"
    baseProfile="full"
    width="64"
    height="16"
  >
    <!-- 底色 -->
    <rect width="100%" height="100%" fill="#3098f2" />
    <!-- 图标 -->
    <g>
      <circle cx="8" cy="8" r="6" fill="#fff" />
      <svg viewBox="0 0 1024 1024" width="8" height="8"  x="4" y="4">
        <path d="M918.673 883H104.327C82.578 883 65 867.368 65 848.027V276.973C65 257.632 82.578 242 104.327 242h814.346C940.422 242 958 257.632 958 276.973v571.054C958 867.28 940.323 883 918.673 883z" fill="#FFE9B4" p-id="2832"></path><path d="M512 411H65V210.37C65 188.597 82.598 171 104.371 171h305.92c17.4 0 32.71 11.334 37.681 28.036L512 411z" fill="#FFB02C" p-id="2833"></path><path d="M918.673 883H104.327C82.578 883 65 865.42 65 843.668V335.332C65 313.58 82.578 296 104.327 296h814.346C940.422 296 958 313.58 958 335.332v508.336C958 865.32 940.323 883 918.673 883z" fill="#FFCA28" p-id="2834"></path>
      </svg>
    </g>
    <!-- 文字标题 -->
    <foreignObject x="-6" y="-2" width="90" height="20">
      <div style="transform: scale(.5);text-align:left;color: #fff; font-size:12px;line-height: 20px" class="line-cut">{{dragInfo.title}}</div>
    </foreignObject>
    <!-- tip -->
    <foreignObject x="50" y="-10" width="20" height="16">
      <div style="transform: scale(.5);color: #fff; font-size:12px;line-height:20px;background:red;border-radius:50%;text-align: center" class="line-cut" >1</div>
    </foreignObject>
  </svg>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'DragImg',
  computed: {
    ...mapGetters([
      'dragInfo'
    ]),
  },
}
</script>

<style lang="scss">
.drag-img {
  transform: translateX(-30%) translateY(-50%) scale(.8);
  position: fixed;
  top: -9999px;
  left: -9999px;
  opacity: 1;
  overflow: visible;
}
</style>
