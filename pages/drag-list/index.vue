<template>
  <!-- 拖动 -->
  <view class="edit-box">
    <view class='zhuti'>
      <scroll-view :scroll-y='pageInfo.scrollY' class='product-section'>
        <block v-for="(item,index) in optionLists" :key="index">
          <!-- 此处 :key='index' 不能改,只支持拖动排序,不支持修改 -->
          <view class='row list-row' :class='{"ready-place":pageInfo.readyPlaceIndex === index}'
            :style='"height: "+pageInfo.rowHeight+"px;"'>
            <view class='col1 content'>
              <text>{{item.name}}</text>
            </view>
            <view class="col3">
              <text class="iconfont icon-tuodong" 
                :data-index='index' @touchstart='dragStart'
                @touchmove='dragMove' @touchend='dragEnd'
              >
								<icon type="download" size="26"/>
							</text>
            </view>
          </view>
        </block>
      </scroll-view>
      <movable-area class="movable-area"
        :style='"display:"+movableViewInfo.showClass+"; height:"+pageInfo.scrollHeight+"%"'>
        <movable-view class='row list-row movable-row' :out-of-bounds='true' damping='999'
          :style='"height:"+pageInfo.rowHeight+"px;"' direction="vertical" :y="movableViewInfo.y"
        >
          <view class='col1 content'>{{movableViewInfo.data}}</view>
          <view class="col3">
            <text class="iconfont icon-tuodong"></text>
          </view>
        </movable-view>
      </movable-area>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'dragEdit',
    data() {
        return {
        // 拖动框内数据,配置
        movableViewInfo: {
          y: 0,
          showClass: 'none',  
          data: {}
        },
        optionLists: [
          { name: '苹果', code:'apple' },
          { name: '橘子', code:'orange' },
          { name: '香蕉', code:'banana' },
          { name: '油桃', code:'nectarine' },
          { name: '桃子', code:'peach' },
          { name: '蟠桃', code:'peento' },
          { name: '葡萄', code:'grape' },
          { name: '椰子', code:'coco' },
          { name: '草莓', code:'strawberry' },
          { name: '牛油果', code:'avocado' },
          { name: '枇杷', code:'loquat' },
          { name: '梨', code:'pear' },
          { name: '杏子', code:'apricot' },
          { name: '樱桃', code:'cherry' },
          { name: '甜瓜', code:'cantaloupe' },
          { name: '西瓜', code:'watermelon' },
          { name: '蓝莓', code:'blueberry' },
          { name: '猕猴桃', code:'kiwifruit' },
          { name: '菠萝', code:'pineapple' },
          { name: '柿子', code:'persimmon' },
          { name: '无花果', code:'fig' },
        ],
        pageInfo: {
          scrollY: true,        // 当为true时拖动单条,整个大盒子不会滚动
          rowHeight: 37,      // 单条行高
          scrollHeight: 100,      // 拖动时行高,百分比
          startIndex: null,     // 当前拖动第几条
          startY: 0,            // 定位拖动时的位置,需要减去上方空白部分
          readyPlaceIndex: null,    // 拖动预放置位置,拖动时有阴影的部分
          selectedIndex: null,  // 放置的位置
        }
      }
    },
    methods:{
      // 拖拽开始(按下)
      dragStart(event) {
        var startIndex = event.currentTarget.dataset.index
        // 初始化页面数据
        var pageInfo = this.pageInfo
        // 减去距离页面顶部的距离
        pageInfo.startY = event.touches[0].clientY-162
        pageInfo.readyPlaceIndex = startIndex
        pageInfo.selectedIndex = startIndex
        pageInfo.scrollY = false
        pageInfo.startIndex = startIndex
        
        // console.log('startIndex', pageInfo.readyPlaceIndex)
        this.movableViewInfo.y = pageInfo.startY - (pageInfo.rowHeight / 2)
        // 初始化拖动控件数据
        var movableViewInfo = this.movableViewInfo
        movableViewInfo.data = this.optionLists[startIndex].name
        movableViewInfo.showClass = "inline"
      
      
        this.movableViewInfo = movableViewInfo,
        this.pageInfo = pageInfo
      },
      // 拖拽移动(按住不松)
      dragMove(event) {
        var optionLists = this.optionLists
        var pageInfo = this.pageInfo
        // 计算拖拽距离
        var movableViewInfo = this.movableViewInfo
        var movedDistance = event.touches[0].clientY-162 - pageInfo.startY
        movableViewInfo.y = pageInfo.startY - (pageInfo.rowHeight / 2) + movedDistance
        // console.log('移动的距离为', movedDistance, movableViewInfo.y)
      
        // 修改预计放置位置
        var movedIndex = parseInt(movedDistance / pageInfo.rowHeight)
        var readyPlaceIndex = pageInfo.startIndex + movedIndex
        if (readyPlaceIndex < 0) {
          readyPlaceIndex = 0
        } else if (readyPlaceIndex >= optionLists.length) {
          readyPlaceIndex = optionLists.length - 1
        }
      
        if (readyPlaceIndex != pageInfo.selectedIndex) {
          var selectedData = optionLists[pageInfo.selectedIndex]
      
          optionLists.splice(pageInfo.selectedIndex, 1)
          optionLists.splice(readyPlaceIndex, 0, selectedData)
          // console.log('======optionLists', optionLists)
          pageInfo.selectedIndex = readyPlaceIndex
        }
        // 移动movableView
        pageInfo.readyPlaceIndex = readyPlaceIndex
        // console.log('移动到了索引', readyPlaceIndex, '选项为', optionLists[readyPlaceIndex])
      
      
        this.movableViewInfo = movableViewInfo
        this.optionLists = optionLists
        this.pageInfo = pageInfo
      },
      // 拖拽结束(松手)
      dragEnd(event) {
        /**
         * this.optionLists 在 dragMove 函数已经出现,
         * 但是在 dragMove 函数会多次触发,
         * 发送数据,及观察数据,在此处即可
         */
        let arr = []
        this.optionLists.forEach(item=>{
          arr.push(item.name)
        })
        console.log('optionLists',arr)
        
        // 重置页面数据
        var pageInfo = this.pageInfo
        // console.log('=====this.pageInfo before', this.pageInfo)
        // console.log('event', event)
        pageInfo.readyPlaceIndex = null
        pageInfo.startY = null
        pageInfo.selectedIndex = null
        pageInfo.startIndex = null
        pageInfo.scrollY = true
        // 隐藏movableView
        var movableViewInfo = this.movableViewInfo
        movableViewInfo.showClass = 'none'
        this.movableViewInfo = movableViewInfo
        this.pageInfo = pageInfo
        // console.log('=====this.movableViewInfo', this.movableViewInfo)
        // console.log('=====this.pageInfo', this.pageInfo)
      },
    },
  }
</script>

<style lang="scss" scoped>
  // @import '/static/css/iconfont.css';
  /* 模块编辑 */
  .edit-box { 
		// width: 100%; 
		// position: relative;
  //   bottom: 0; 
		// left: 0; 
		// overflow: hidden; 
		// margin-bottom: 20rpx;
  }
  .marginL6 { 
		margin-left: 12rpx; 
	}
  .product-section { 
		height:100%;
	}
  .zhuti { 
		width: 100%; 
		position: absolute; 
		top: 10px;
    bottom: 0; 
		left: 0; 
		overflow: scroll; 
	}
  .row { 
		height: 47px; 
		width: 100%; 
		display: flex; 
		justify-content: 
		space-between; 
		align-items: 
		center; 
	}
  .title-row { 
		border-bottom: 1px solid #888888; 
		color: #888888; 
	}
  .list-row { 
		padding: 4px 24rpx; 
		background-color: white; 
		box-sizing: border-box;
	}
  .movable-area { 
		position: absolute; 
		top: 0; 
		left: 0; 
		z-index: 10; 
		width: 100%; 
	}
  .movable-row { 
		box-shadow: #D9D9D9 0 0 20px; 
	}
  .col1 { 
		width: 90%;
	}
  .col3 { 
		width: 6%; 
		color: #3C63EB; 
	}
  .ready-place { 
		background: rgba(238, 240, 254, 0.6); 
	}
  .content { 
		font-size: 14px; 
		white-space: nowrap; 
		overflow: hidden; 
		text-overflow: ellipsis; 
		border: 1rpx solid #3C63EB; 
		color:#3C63EB; 
		box-sizing: border-box; 
		height: 58rpx; 
		padding: 8rpx 0 8rpx 32rpx; 
		border-radius: 4rpx; 
	}
</style>