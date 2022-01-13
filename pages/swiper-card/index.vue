<template>
  <view style="background-color: #fff">
    <view class="head">
      <view class="catalog-title">
        <text class="head-name">{{ title }}</text>
      </view>
    </view>
    <view class="swiper-card">
      <image
        class="img1"
        :src="require('@/static/left.png')"
        alt
        @click.stop="leftImg" 
      />
      <swiper
        class="swiper-box"
        :indicator-dots="indicator"
        :autoplay="autoplay"
        :current="current"
        :circular="circular"
        @change="change"
      >
        <swiper-item v-for="(item, index) in swiperInfo" :key="index">
          <view class="swiper-item">
            <PieChart
              :chartId="'PieCharts' + index"
              :chart-data="swiperInfo[index]"
            />
            <text class="detail" @click="checkDetail"> 查看详情 </text>
            <view class="type">
              <text class="risk">低风险</text>
            </view>
          </view>
        </swiper-item>
      </swiper>
      <image
        class="img2"
        :src="require('@/static/right.png')"
        alt
        @click.stop="rightImg"
      />
    </view>
  </view>
</template>

<script>
import PieChart from "@/components/pie-chart";
const arr = ["稳健型投资组合(推荐)", "价值典范", "步步为营"];
export default {
  name: "SwiperCard",
  components: {
    PieChart,
  },
  watch: {
    current: {
      handler(val) {
        this.title = arr[val];
      },
    },
  },
  data() {
    return {
      title: "稳健型投资组合(推荐)",
      swiperInfo: [
        {
          legendData: ["股票型", "债券型", "货币型", "现金", "混合型"],
          seriesData: [
            {
              value: 48.65,
              name: "股票型",
            },
            {
              value: 75.88,
              name: "债券型",
            },
            {
              value: 35.21,
              name: "货币型",
            },
            {
              value: 65.08,
              name: "现金",
            },
            {
              value: 22.28,
              name: "混合型",
            },
          ],
        },
        {
          legendData: ["混合型", "现金", "货币型"],
          seriesData: [
            {
              value: 28,
              name: "混合型",
            },
            {
              value: 10.87,
              name: "现金",
            },
            {
              value: 85,
              name: "货币型",
            },
          ],
        },
        {
          legendData: ["股票型", "债券型", "现金"],
          seriesData: [
            {
              value: 88,
              name: "股票型",
            },
            {
              value: 25.33,
              name: "债券型",
            },
            {
              value: 15.09,
              name: "现金",
            },
          ],
        },
      ],
      current: 0,
      mode: "",
      indicator: false,
	  autoplay: false,
	  circular: true
    };
  },
  methods: {
    change(e) {
      this.current = e.target.current || e.detail.current;
    },
    swiperChange(type) {
      if (type === "pre") {
        if (this.current !== 0) {
          this.current--;
        } else {
          this.current = 2;
        }
      } else {
        if (this.current !== 2) {
          this.current++;
        } else {
          this.current = 0;
        }
      }
    },
    leftImg() {
      this.circular = false;
      if (this.current <= 0) {
        this.circular = true;
        this.current = 2;
      } else {
        this.current--;
      }
    },
    rightImg() {
      this.circular = true;
      if (this.current >= 2) {
        this.current = 0;
      } else {
        this.current++;
      }
    },
    checkDetail() {
      console.log(888);
    },
  },
};
</script>

<style lang="scss" scoped>
.head {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.catalog-title {
  position: relative;
  font-size: rpx(15);
  color: #fff;
  border-top: 30px solid #655cd9;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  height: 0;
  width: 200px;

  .head-name {
    position: absolute;
    top: -26px;
    width: 100%;
    text-align: center;
  }
}

.swiper-card {
  margin-top: -30px;
  height: 320px;
  position: relative;
  /* display:flex;
		justify-content: space-between;
		align-items: center; */
}

.swiper-box {
  height: 320px;
  /* width: rpx(300); */
}

.img1 {
  position: absolute;
  left: 5px;
  top: 40%;
  z-index: 1001;
  width: 25px;
  height: 25px;
}

.img2 {
  position: absolute;
  right: 5px;
  top: 40%;
  z-index: 1001;
  width: 25px;
  height: 25px;
}

.detail {
  color: #4e4ccf;
  font-size: 12px;
  position: absolute;
  top: 43%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 100%;
  text-align: center;
}

.type {
  text-align: center;
  /* margin-top: rpx(-65); */
  position: absolute;
  top: 75%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.risk {
  border: 1px solid #ddd;
  padding: 2px 10px;
  border-radius: 5px;
  font-size: 12px;
}
</style>
