<template>
	<view :id="chartId" :style="{ height: height, width: width }" />
</template>

<script>
	import resize from '@/components/charts/mixins/resize.js'
	export default {
		name: "BubbleChart",
		mixins: [resize],
		props: {
			chartId: {
				// required: true,
				type: String,
				default: 'BubbleChart'
			},
			chartData: {
				// required: true,
				type: Object
			},
			chartOption: {
				type: Object,
				default () {
					return {}
				}
			},
			width: {
				type: String,
				default: '100%'
			},
			height: {
				type: String,
				default: '200px'
			},
		},
		data() {
			return {
				chart: null
			}
		},
		mounted() {
			this.initChart()
		},
		beforeDestroy() {
			if (this.chart) {
				this.chart.dispose()
				this.chart = null
			}
		},
		methods: {
			initChart() {
				this.chart = this.$echarts.init(document.getElementById(this.chartId))
				const option = this.getOption()
				this.chart.setOption(option, true)
			},
			getOption() {
				var reslult = [{
						name: '家庭主妇',
						value: 50,
						color: '#999',
						position: [0, 60],
						fontSize: '12',
						number: '2',
					},
					{
						name: '白富美',
						value: 37,
						color: '#999',
						position: [20, 30],
						fontSize: '12',
						number: '4',
					},
					{
						name: '高富帅',
						value: 35,
						color: '#999',
						position: [40, 70],
						number: '2',
						fontSize: '12',
					},
					{
						name: '买买买',
						value: 35,
						color: '#999',
						position: [20, 90],
						number: '6',
						fontSize: '12',
					},
					{
						name: '人民公仆',
						value: 55,
						color: '#999',
						position: [55, 30],
						number: '10',
						fontSize: '12',
					},
					{
						name: 'IT男',
						value: 38,
						color: '#999',
						position: [66, 90],
						fontSize: '12',
						number: '3',
					},
					{
						name: '精打细算',
						value: 50,
						color: '#999',
						position: [85, 75],
						fontSize: '12',
						number: '2',
					},
					{
						name: '程序猿',
						value: 41,
						color: '#999',
						position: [80, 33],
						number: '4',
						fontSize: '12',
					}
				];
				var data = [];
				// 渲染数据，并写入chart
				reslult.map((item) => {
					data.push({
						name: item.name,
						value: item.position,
						symbolSize: item.value,
						label: {
							normal: {
								formatter: function(param) {
									var newParamsName = ''; //返回文字格式
									var paramsNameNumber = param.name.length; //获取显示文字长度
									var number = parseInt(item.number); //超过多少字换行
									var rowNumber = Math.ceil(paramsNameNumber / number); //最多能显示几行
									if (paramsNameNumber > number) {
										//如果长度大于每行最多显示的字数
										for (var p = 0; p < rowNumber; p++) {
											//循环次数就是行数
											var tempStr = ''; //每次截取的字符
											var start = p * number; //截取的起点
											var end = start + number; //截取的终点
											if (p == rowNumber - 1) {
												//最后一行就不换行了
												tempStr = param.name.substring(start);
											} else {
												tempStr = param.name.substring(start, end) + '\n';
											}
											newParamsName += tempStr; //拼接字符串
										}
									} else {
										newParamsName = param.name; //如果小于每行最多显示的字数就返回原来的字符串
									}
									return newParamsName;
								},
								show: true,
								textStyle: {
									fontSize: item.fontSize,
									color: '#333',
									opacity: 1,
								},
							},
						},
						itemStyle: {
							normal: {
								color: new this.$echarts.graphic.RadialGradient(0.5, 0.5, 1, [{
										offset: 0.3,
										color: '#fff',
									},
									{
										offset: 0.5,
										color: '#F2F1FC',
									},
								]),
								opacity: 1,
								borderWidth: 1,
								borderColor: '#F2F1FC',
							},
						},
					});
				});

				const option = {
					grid: {
						show: false,
						top: 10,
						bottom: 10,
					},
					xAxis: [{
						gridIndex: 0,
						type: 'value',
						show: false,
						min: 0,
						max: 100,
						nameLocation: 'middle',
						nameGap: 5,
					}, ],
					yAxis: [{
						gridIndex: 0,
						min: 0,
						show: false,
						max: 100,
						nameLocation: 'middle',
						nameGap: 30,
					}, ],

					series: [{
						type: 'scatter',
						symbol: 'circle',
						symbolSize: 30,
						label: {
							normal: {
								show: true,
								formatter: '{b}',
								color: '#fff',
								textStyle: {
									fontSize: '20',
								},
							},
						},
						animationDurationUpdate: 500,
						animationEasingUpdate: 500,
						animationDelay: function(idx) {
							// 越往后的数据延迟越大
							return idx * 100;
						},
						data: data,
					}, ],
				};

				// 合并传入option
				Object.assign(option, this.chartOption)
				return option

			}
		}
	}
</script>
