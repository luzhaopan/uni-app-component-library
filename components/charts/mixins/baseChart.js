import resize from './resize.js'
export default {
	mixins: [resize],
	props: {
		chartData: {
			type: Object,
			// require: true,
			default: () => {
			 return { seriesData: [1] }
			}
		},
		chartOption: {
			type: Object,
			default: () => {}
		},
		className: {
			type: String,
			default: 'chart'
		},
		width: {
			type: String,
			default: '100%'
		},
		height: {
			type: String,
			default: '300px'
		}
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
				this.updateOption(this.getOption(chartData))
			}
		}
	},
	mounted() {
		this.initChart()
	},
	beforeDestroy() {
		if (!this.chart) {
			this.chart.dispose()
			this.chart = null
		}
	},
	methods: {
		// initChart() {
		// 	//customed 已注册的主题名称
		// 	this.chart = this.$echarts.init(
		// 		document.getElementById(this.chartId),
		// 		'customed'
		// 	)
		// 	const option = this.getOption(this.chartData)
		// 	this.updateOption(option)
		// },
		updateOption(option) {
			const {
				seriesData = []
			} = this.chartData
			if (seriesData.length === 0) {
				this.chart.clear()
				this.chart.showLoading({
					text: '暂无数据',
					color: '#fff',
					textColor: '#909399',
					fontSize: '14px'
				})
			} else {
				this.chart.hideLoading()
				this.chart.setOption(option, true)
			}
		}
	}
}
