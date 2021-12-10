<template>
  <view class="assets-tag">
    <view class="ring">
      <view class="total">
        <view class="money">
          2000000.00
        </view>
        <view class="name">
          月末总资产(元)
        </view>
      </view>
      <view class="circle" v-for="(item, index) in dataList" :key="index">
        {{item.title}}
      </view>
    </view>
  </view>
</template>
<script>
  export default {
    name: "AssetsTag", // 资产标签
    // props: {
    //   dataList: {
    //     type: Array,
    //     required: false,
    //   }
    // },
    data() {
      return {
        dataList: [{
            title: '资产稳定'
          },
          {
            title: '风险降低'
          },
          {
            title: '流动性好'
          }, {
            title: '保障大人'
          },
          {
            title: '收益性好'
          },
          {
            title: '流动性良好'
          }
        ]
      }
    },
    mounted() {
      const ele = document.querySelector('.ring')
      this.initRing(ele, this.dataList)
    },
    methods: {
      initRing(ctn, data) {
        let ws = window.screen.width;
        let lx = 1.2, // 改变显示为圆或椭圆的因素
          tx = 1.5;
        if (ws <= 900 && ws >= 420) {
          lx = 2;
          tx = 1;
        }
        if (ws <= 280) {
          lx = 1;
          tx = 1.8;
        }
        let items = ctn.querySelectorAll('.circle'),
          R = 90, // 圆半径
          angle = 360 / (items.length),
          offsetX = getStyle(ctn).width / 2, // 中心点x轴偏移值
          offsetY = getStyle(ctn).height / 2; // 中心点y轴偏移值
        Array.from(items).map(function(item, index) {
          let dw = getStyle(item).width / 2,
            dh = getStyle(item).height / 2; // 计算菜单坐标
          let hudu = (2 * Math.PI / 360) * angle * index,
            left = (Math.cos(hudu) * R * lx + offsetX - dw).toFixed(2),
            top = (Math.sin(hudu) * R / tx + offsetY - dh).toFixed(2);
          item.style.setProperty('left', left + 'px');
          item.style.top = top + 'px';
        });

        function getStyle(domObj) {
          var style = document.defaultView.getComputedStyle(domObj);
          var width = style.width.replace('px', '') * 1 + style['padding-left'].replace('px', '') * 1 + style[
              'padding-right'].replace('px', '') * 1,
            height = style.height.replace('px', '') * 1 + style['padding-top'].replace('px', '') * 1 + style[
              'padding-bottom'].replace('px', '') * 1;
          return {
            width: width,
            height: height
          };
        }
      }
    },
  };
</script>

<style lang="scss">
  .assets-tag {
    width: 100%;
    height: 200px;
    position: relative;
	text-align: center;

    .ring {
      position: relative;
      top: 80px;
      // left: 33%;
      display: inline-block;
      padding: 2px 10px;
    }

    .total {
      text-align: center;
    }

    .money {
      font-size: 16px;
      font-weight: 600;
    }

    .name {
      font-size: 14px;
    }

    .circle {
      position: absolute;
      cursor: pointer;
      font-size: 12px;
      padding: 4px 0.5em;
      border-radius: 10px;
      display: inline-block;
      border: 1px solid #f2f2f2;
      box-shadow: 1px 6px 15px 0 rgba(89, 167, 255, 0.3);
      overflow: hidden;
      word-break: keep-all;
      transition: left 0.5s linear, top 0.5s linear, color 0.5s linear, background-color 0.5s linear, box-shadow 0.5s linear;
    }
  }
</style>
