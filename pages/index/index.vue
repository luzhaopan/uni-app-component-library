<template>
	<view class="container">
		<view class="title">component-view navigation</view>
		<view class="">
			<button type="default" @click="goPie">RingPie</button>
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
			}
		},
	}
</script>

<style>
	.container {
		padding: 10px;
		font-size: 14px;
		line-height: 24px;
	}
	.title {
		text-align: center;
		font-size: 40rpx;
		margin: 40rpx 0;
	}
</style>
