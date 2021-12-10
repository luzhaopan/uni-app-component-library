<template>
  <view class="chart-header">
    <view class="mark" />
    <view class="title">
      <slot />
    </view>
  </view>
</template>

<script>
export default {
  name: 'ChartTitle'
}
</script>

<style lang="scss" scoped>
.chart-header {
  height: 36px;
  display: flex;
  color: #333;
  font-weight: bold;
  font-size: rpx(20);
  align-items: center;
  .mark {
    border-left: 6px solid #534fd2;
    height: 80%;
  }
  .title {
    text-indent: 10px;
    line-height: 36px;
  }
}
</style>
