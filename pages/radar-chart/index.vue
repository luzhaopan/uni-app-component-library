<template>
  <view :id="chartId" :style="{ height: height, width: width }" />
</template>

<script>
  import baseChart from '@/components/charts/mixins/baseChart.js'
  export default {
    mixins: [baseChart],
    name: "RadarChart",
		props: {
			chartId: {
				type: String,
				// require: true
				default: 'radarChart'
			},
		},
    methods: {
			initChart() {
				//customed 已注册的主题名称
				this.chart = this.$echarts.init(
					document.getElementById(this.chartId),
					'customed'
				)
				const option = this.getOption(this.chartData)
				this.updateOption(option)
			},
      getOption() {
        const option = {
          color: [ '#abe5ff'],
          tooltip: {
            trigger: 'axis'
          },
          radar: [
            {
              radius: '55%',
              startAngle: 120,
              splitNumber: 5,
              shape: 'circle',
              splitLine: {
                show: true,
                lineStyle: {
                  color: ['#9c9c9c', '#9c9c9c','#9c9c9c','#9c9c9c','#9c9c9c','#555']
                }
              },
              axisName: {
                formatter: '{value}',
                textStyle: {
                  color: '#555'
                },
              },
              indicator: [
                { name: '可持续性', max: 6},
                { name: '风险的能力', max: 16},
                { name: '稳定性', max: 30},
                { name: '管理的能力', max: 38},
                {
                  name: '投资能力',
                  max: 52,
                  axisLabel: {
                    show: true,
                    color: "#555",
                    formatter: function (value, index) {
                      return index;
                    },
                  },
                  axisLine: {
                    show: true,
                    lineStyle: {
                      color: "#555"
                    }
                  },
                },
                { name: '获取值的能力', max: 25}
              ],
            },
          ],
          series: [
            {
              type: 'radar',
              tooltip: {
                trigger: 'item'
              },
              areaStyle: {
                color: '#fec7c2'
              },
              data: [
                {
                  value: [5, 14, 28, 26, 42, 21],
                  name: '综合评价',
                }
              ]
            }
          ]
        }
        return option
      }
    }
  }
</script>
