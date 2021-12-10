<template>
	<view class="container">
		<view class="title">component-view navigation</view>
		<view class="">
			<button type="default" @click="goPie">RingPie</button>
			<button type="default" @click="goProgressBar">progress bar</button>
			<button type="default" @click="swiperCard">swiper-card</button>
			<button type="default" @click="circularCard">circular-card</button>
			<button type="default" @click="bubbleChart">bubble-chart</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				href: 'https://uniapp.dcloud.io/component/README?id=uniui'
			}
		},
		methods: {
			goPie() {
				uni.navigateTo({
					url: '/pages/ring-pie/index',
				});
      },
      goProgressBar() {
				uni.navigateTo({
					url: '/pages/progress-bar/index',
				});
      },
      swiperCard() {
				uni.navigateTo({
					url: '/pages/swiper-card/index',
				});
      },
      circularCard() {
				uni.navigateTo({
					url: '/pages/circular-card/index',
				});
      },
      bubbleChart() {
				uni.navigateTo({
					url: '/pages/bubble-chart/index',
				});
			}
		},
	}
</script>

<style lang="scss" scoped>
	.container {
		padding: 10px;
		font-size: 14px;
		line-height: 24px;

		.title {
			text-align: center;
			font-size: 40rpx;
			margin: 40rpx 0;
		}
	}
</style>
