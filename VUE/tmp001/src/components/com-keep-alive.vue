<!-- 缓存组件 -->
<template>
  <div class="com-keep-alive-wp">
    <i v-show="rootMenu.children && rootMenu.children.length"
      class="btn layout-btn" :class="[showAside ? 'el-icon-back' : 'el-icon-right']"
      @click="showAside = !showAside"></i>
    <i class="btn layout-btn" :class="[showHeader ? 'el-icon-top' : 'el-icon-bottom']" @click="showHeader = !showHeader"></i>
    <i class="btn el-icon-d-arrow-left"></i>
    <div class="list-wrapper" ref="wrapper">
      <div class="scroll" ref="scroll">
        <ul class="clearfix list" ref="list" :style="{width: ulLength}">
          <li v-for="(item, index) in pathList" :key="index" class="item"
            :class="{active: index == current}"
            :style="{width: item.width+'px'}"
            @mousedown="itemMousedown($event)"
            @mouseup="itemMouseup($event, index)">
            {{item.text}}
            <i v-if="index != 0" class="del-btn el-icon-error"
              @mousedown.stop="deleteMousedown($event)"
              @mouseup.stop="deleteMouseup($event, index)"></i>
          </li>
        </ul>
      </div>
    </div>
    <span class="btn el-icon-d-arrow-right"></span>
    <span class="btn"></span>
    <div class="area-text">
      当前区域：<span>重庆市</span>
    </div>
  </div>
</template>
<script>

import '@/assets/js/calcTextWidth.js';
import '@/assets/js/onelresize.js';

export default {
  name: 'com-keep-alive',
  data () {
    return {

      ulLength: '100%',

      current: 0, // 当前选中的路由
    }
  },
  computed: {
    // 当前的根菜单
    rootMenu () {
      var path = this.$tools.excludeEmpty(this.$route.path); // 排除/empty路由
      return this.$tools.menu.root(path, 1);
    },
    // 是否显示公共头部
    showHeader: {
      get () {
        return this.$store.getters.LAYOUT_SHOWHEADER;
      },
      set (val) {
        this.$store.commit('LAYOUT_SHOWHEADER', val);
      }
    },
    // 是否显示侧边栏
    showAside: {
      get () {
        return this.$store.getters.LAYOUT_SHOWASIDE;
      },
      set (val) {
        this.$store.commit('LAYOUT_SHOWASIDE', val);
      }
    },
    // 缓存路由列表
    pathList () {
      var list = JSON.parse(JSON.stringify(this.$store.getters.LAYOUT_KEEPLIST));
      this.$nextTick(() => {
        this.setItemLength(); // 根据文本获取长度
      })
      return list;
    },
  },
  watch: {
    // 根据路由变化设置缓存的路由
    '$route.fullPath' (val) {
      var idx = -1;
      for (var i = 0; i < this.pathList.length; i++) {
        var item = this.pathList[i];
        if (item.path == val) {
          idx = i;
          break;
        }
      }
      if (idx != -1) {
        this.setIndex(idx);
      }
    }
  },
  mounted () {
    // 初始化拖动
    this.init();
  },

  methods: {
    init () {
      if (this.pathList.length) {
        setTimeout(() => {
          this.setListEvent(); // 设置事件
          for (var i = 0; i < this.pathList.length; i++) {
            if (this.pathList[i].path.split('?')[0] == this.$route.path) {
              this.setIndex(i, true);
              break;
            }
          }
        }, 10);
      }
    },

    // 设置事件
    setListEvent () {
      var oWrapper = $(this.$refs.wrapper);
      var oScroll = $(this.$refs.scroll);
      var oList = $(this.$refs.list);

      var iMove = 0;
      var iClientX = 0;

      //鼠标按下
      oList[0].onmousedown = function(evt) {
        var e = evt || window.event;
        var disX = e.clientX;
        var disY = e.offsetY;
        var iLeft = parseInt(oList.css('left'));
        var wS = parseInt(oScroll.width());
        var wL = parseInt(oList.width());

        // 如果list长度不够
        if (wL < wS) {
          return;
        }

        //鼠标移动
        document.onmousemove = function(evt) {
          var e = evt || window.event;
          iMove = evt.clientX - disX + iLeft;
          // 判断界限
          if (iMove > 0) {
            iMove = 0;
          } else if (iMove < wS-wL) {
            iMove = wS-wL;
          }
          oList.css('left', iMove);
        }
        
        //鼠标松开
        document.onmouseup = function(){
          // 释放资源
          document.onmousemove = null;
          document.onmouseup = null;
        }
        return false;
      }

      // 监听包裹盒子尺寸是否变化
      // 如果滚动内容宽度 > 滚动层宽度，并且滚动层宽度 > 内容宽度 - 内容left，则内容left设置为内容宽度 - 滚动层宽度
      window.onelresize(oWrapper[0], () => {
        var wS = parseInt(oScroll.width());
        var wL = parseInt(oList.width());
        var left = parseInt(oList.css('left'));
        if (wL > wS && wS > wL + left) {
          oList.css('left', -(wL - wS));
        }
      })
    },

    // 设置当前选中的项，idx下标，noAnim是否需要动画效果
    setIndex (idx, noAnim) {
      if (idx < 0 || idx >= this.pathList.length) {
        return;
      }
      this.setCurrent(idx); // 设置当前选中的值

      var oScroll = $(this.$refs.scroll);
      var oList = $(this.$refs.list);

      var wScroll = oScroll.width();
      var lLeft = parseInt(oList.css('left'));
      var cLeft = 0;
      var iW = this.pathList[idx].width;
      for (var i = 0; i < idx; i++) {
        cLeft+=this.pathList[i].width;
      }
      
      // 设置left
      var iLeft = -1;
      if (lLeft < -cLeft) {
        iLeft = -cLeft;
      }
      if (wScroll < cLeft + iW + lLeft) {
        iLeft = wScroll - cLeft - iW;
      }
      if (iLeft != -1) {
        oList.animate({
          left: iLeft
        }, noAnim ? 0 : 300);
      }
    },

    // 设置当前选中的值
    setCurrent (idx) {
      this.current = idx;
      // this.$emit('currentChange', idx);
      // this.$emit('change', idx);
    },

    // 选项鼠标点下
    itemMousedown (event) {
      event.target.time = new Date().getTime();
      event.target.clientX = event.clientX;
    },
    // 选项鼠标抬起
    itemMouseup (event, index) {
      // 表示点击
      if ((event.target.time && new Date().getTime() - event.target.time < 300) && (event.target.clientX == event.clientX)) {
        if (index != this.current) {
          this.$router.push(this.pathList[index].path);
        }
      } else {
        event.target.time = 0;
        event.target.cientX = 0;
      }
    },

    // 选项鼠标点下
    deleteMousedown (event) {
      event.target.time = new Date().getTime();
      event.target.clientX = event.clientX;
    },
    // 选项鼠标抬起
    deleteMouseup (event, index) {
      if ((event.target.time && new Date().getTime() - event.target.time < 300) && (event.target.clientX == event.clientX)) {
        this.$store.commit('LAYOUT_KEEPLIST', index);
        if (index == this.current) {
          this.$router.push(this.pathList[this.current-1].path);
        } else if (index < this.current) {
          this.current--;
        }
        setTimeout(() => {
          // 最大滚动距离为ul长度-scroll长度
          var oScroll = $(this.$refs.scroll);
          var oList = $(this.$refs.list);
          var wS = parseInt(oScroll.width());
          var wL = parseInt(oList.width());
          var left = parseInt(oList.css('left'));
          // 判断界限
          if (wS < wL) {
            if (left < wS - wL) {
              left = wS - wL;
            }
          } else {
            left = 0;
          }
          oList.animate({
            left: left
          }, 300);
        }, 100);
      } else {
        event.target.time = 0;
        event.target.cientX = 0;
      }
    },

    // 设置当前选中的值
    setItemLength () {
      var all = 0;
      for (var i = 0; i < this.pathList.length; i++) {
        var item = this.pathList[i];
        var w = calcTextWidth({
          text: item.text,
          style: {
            fontSize: '14px'
          }
        })
        item.width = w + 30 + (i == 0 ? 0 : 20);
        all+=item.width;
      }
      this.ulLength = all + 'px';
    },
  }
}
</script>
<style lang="scss" scoped>
.com-keep-alive-wp {
  display: flex;
  border-bottom: 1px solid #d6d5d1;
  background: #F2EEE3;
  box-sizing: border-box;
  height: 41px;
  line-height: 40px;

  .btn {
    width: 40px;
    height: 100%;
    line-height: 40px;
    text-align: center;
    font-size: 20px;
    border-right: 1px solid #d6d5d1;
    cursor: pointer;
    &.layout-btn {
      color: #BF3F40;
    }
  }
  .area-text {
    padding: 0 15px 0 10px;
    color: #777;
    span {
      color: #d25455;
      font-weight: bold;
    }
  }
  .list-wrapper {
    flex: 1;
    border-right: 1px solid #d6d5d1;
    box-sizing: border-box;
    .scroll {
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
    .list {
      position: absolute;
      top: 0;
      left: 0;
      .item {
        position: relative;
        float: left;
        padding: 0 25px 0 15px;
        height: 40px;
        box-sizing: border-box;
        line-height: 40px;
        cursor: pointer;
        text-align: center;
        white-space: nowrap;
        -moz-user-select:none; /*火狐*/ 
        -webkit-user-select:none; /*webkit浏览器*/ 
        -ms-user-select:none; /*IE10*/ 
        -khtml-user-select:none; /*早期浏览器*/ 
        user-select:none;
        transition: background-color .3s;
        &:first-child {
          padding: 0 15px;
        }
        &:hover {
          background: #F2F2F2;
        }
        &.active {
          background: #BF3F40;
          color: #fff;
          .del-btn {
            color: #fff;
            &:hover {
              color: #fff;
            }
          }
        }
        .del-btn {
          width: 20px;
          height: 20px;
          text-align: center;
          line-height: 20px;
          font-size: 16px;
          color: #A19383;
          &:hover {
            color: #BF3F40;
          }
        }
      }
    }
  }
}
</style>