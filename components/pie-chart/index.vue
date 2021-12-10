<template>
	<view :id="chartId" :style="{ height: height, width: width }"></view>
</template>

<script>
	export default {
		name: "PlanCharts",
		props: {
			chartId: {
				required: true,
				type: String
			},
			chartData: {
				required: true,
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
				default: '300px'
			},
		},
		data() {
			return {
				chart: null
			}
		},
		watch: {
			chartData: {
				deep: true,
				handler(chartData) {
					this.chart.setOption(this.getOption(chartData), true)
				}
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
				this.chart.setOption(this.getOption(this.chartData), true)
			},
			getOption(data) {
				const {legendData,seriesData} = this.chartData
				const option = {
					tooltip: {
						trigger: "item",
						show: true,
						confine: true,
						formatter: "{b0}:{c0}%",
						// extraCssText: "z-index:2"
					},
					legend: {
						x: "center",
						// y: "bottom",
						data: legendData,
						icon: "circle",
						itemWidth: 8, // 设置图例icon宽度
						itemHeight: 8,
						selectedMode: false,
						bottom: '-2%',
						formatter: function(name) {
							var target;
							for (var i = 0, l = seriesData.length; i < l; i++) {
								if (seriesData[i].name === name) {
									target = seriesData[i].value;
								}
							}
							return name + "    " + target + "%";
						}
					},
					grid: {
						// top: "2%",
						// bottom: "2%"
					},
					color: [
						"#91CB74",
						"#FAC858",
						"#EE6666",
						"#73C0DE",
						"#FC8452",
						"#3CA272",
						"#9A60B4"
					],
					series: [{
						name: "",
						type: "pie",
						// hoverAnimation: false,
						radius: ["40%", "55%"],
						center: ["50%", "45%"],
						avoidLabelOverlap: false,
						label: {
							show: false,
							position: "center"
						},
						emphasis: {
							label: {
								show: false,
								fontSize: "12"
							}
						},
						labelLine: {
							show: false
						},
						data: seriesData
					}]
				}

				// 合并传入option
				Object.assign(option, this.chartOption)
				return option

			}
		}
	}
</script>
