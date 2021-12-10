<template>
  <view :id="chartId" :style="{ height: height, width: width }" />
</template>

<script>
  import baseChart from '@/components/charts/mixins/baseChart.js'
  export default {
    mixins: [baseChart],
    name: "RingPie",
		props: {
			chartId: {
				type: String,
				// require: true
				default: 'RingPie'
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
          tooltip: {
            trigger: "item",
            // formatter: "{a} <br />{b}: {c} ({d}%)"
            formatter: function(val) {
              return "关注度<br />" + val.name + "：" + val.value
            }
          },
          legend: {
            show: false,
            data: ['肉夹馍', '凉皮', '羊肉泡馍', '老友粉', '柠檬鸭', '火锅', '桂林米粉']
          },
          color: ['#4472c4', '#ed7d31', '#ffc000', '#a5a5a5'],
          series: [{
              name: "地名",
              type: "pie",
              selectedMode: "single",
              silent: true, // 点击饼图不显示动画和tooltip
              radius: ["30%", "60%"],
              label: {
                position: "inner",
                fontSize: 11
              },
              labelLine: {
                show: false
              },
              itemStyle: {
                borderColor: '#fff',
                borderWidth: 1
              },
              data: [{
                  name: '西安',
                  value: 9
                },
                {
                  name: '南宁',
                  value: 4
                },
                {
                  name: '成都',
                  value: 2
                },
                {
                  name: '桂林',
                  value: 2
                }
              ]
            },
            {
              name: "美食",
              type: "pie",
              radius: ["60%", "90%"],
              labelLine: {
                show: false
              },
              label: {
                position: "inner",
                fontSize: 11
              },
              itemStyle: {
                borderColor: '#fff',
                borderWidth: 1
              },
              data: [{
                  itemStyle: {
                    color: '#4472c4'
                  },
                  name: "肉夹馍",
                  value: 3
                },
                {
                  itemStyle: {
                    color: '#4472c4'
                  },
                  name: "凉皮",
                  value: 3
                },
                {
                  itemStyle: {
                    color: '#4472c4'
                  },
                  name: "羊肉泡馍",
                  value: 3
                },
                {
                  itemStyle: {
                    color: '#ed7d31'
                  },
                  name: "老友粉",
                  value: 2
                },
                {
                  itemStyle: {
                    color: '#ed7d31'
                  },
                  name: "柠檬鸭",
                  value: 2
                },
                {
                  itemStyle: {
                    color: '#ffc000'
                  },
                  name: "火锅",
                  value: 2
                },
                {
                  itemStyle: {
                    color: '#a5a5a5'
                  },
                  name: "桂林米粉",
                  value: 2
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
