<template>
  <view class="progress-bar">
    <view class="progress100">
      <view class="progress-position" :style="{width: width}">
        <image class="img" :src="require('@/static/p1.png')" alt="" />
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: "ProgressBar",
    data() {
      return {
        width: '70%'
      }
    }
  }
</script>

<style lang="scss" scoped>
  .progress-bar {
    padding: 20px 0;
    text-align: center;
    margin: 0 10px;

    .progress100 {
      width: 100%;
      height: 10px;
      background: #FDF3DC;
      border-radius: 10px;
      position: relative;
    }

    .progress-position {
      width: 0%;
      height: 10px;
      border-radius: 10px;
      top: 0;
      left: 0;
      background: linear-gradient(to top, #F3B945, #F8D64C);
      position: relative;
    }

    .img {
      background-size: cover;
      width: 25px;
      height: 25px;
      position: absolute;
      top: -8px;
      right: 0;
    }
  }
</style>
