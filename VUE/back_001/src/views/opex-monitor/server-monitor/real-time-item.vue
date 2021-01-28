<!-- 实时监控模块 -->
<template>
  <div class="real-time-item-wp" :style="{borderColor: detail.color.border}">
    <div class="title" :style="{color: detail.color.text, borderColor: detail.color.border}">
      {{detail.name}}
    </div>
    <div class="row1">
      <span class="hr" :style="{borderColor: detail.color.border}"></span>
      <div class="bar" ref="barEchart"></div>
      <div class="box">
        <div class="item clearfix">
          <div class="name" :style="{background: detail.color.label}">当天预警次数</div>
          <div class="value">
            <span class="num">{{detail.num.current}}</span>
            <span class="unit">次</span>
          </div>
        </div>
        <div class="item clearfix">
          <div class="name" :style="{background: detail.color.label}">累计预警次数</div>
          <div class="value">
            <span class="num">{{detail.num.total}}</span>
            <span class="unit">次</span>
          </div>
        </div>
      </div>
    </div>
    <div class="area" ref="areaEchart"></div>
  </div>
</template>
<script>
export default {
  name: 'real-time-item',
  data () {
    return {
      barChart: null,
      areaChart: null,
    }
  },
  props: {
    detail: {
      default () {
        return {}
      }
    }
  },
  mounted () {
    this.initBar(); // 设置环图
    this.initArea();
  },
  methods: {
    renewOption () {
      this.setBarOption();
      this.setAreaOption();
    },

    initBar () {
      var oEchart = this.$refs.barEchart;
      this.barChart = this.$echarts.init(oEchart);
      window.addEventListener('resize', () => {
        this.barChart.resize();
      })
      this.setBarOption();
    },
    setBarOption () {
      var option = {
        title: [
          {
            text: '利用率',
            x: 'center',
            top: '55%',
            textStyle: {
              color: '#666666',
              fontSize: 13,
              fontWeight: '100',
            }
          }, {
            text: this.detail.num.ratio+'%',
            x: 'center',
            top: '37%',
            textStyle: {
              fontSize: '24',
              color: '#387DC9',
              fontFamily: 'Lato',
              foontWeight: '600',
            }
          }
        ],
        polar: {
          radius: ['85%', '65%'],
          center: ['50%', '50%'],
        },
        angleAxis: {
          max: 100,
          show: false,
        },
        radiusAxis: {
          type: 'category',
          show: true,
          axisLabel: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false
          },
        },
        series: [
          {
            name: '',
            type: 'bar',
            roundCap: true,
            barWidth: 60,
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(66, 66, 66, .3)',
            },
            data: [this.detail.num.ratio],
            coordinateSystem: 'polar',
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                  offset: 0,
                  color: '#387ECA'
                }, {
                  offset: 1,
                  color: '#2AB176'
                }]),
              }
            }
          }
        ]
      }

      this.barChart.setOption(option);
    },

    initArea () {
      var oEchart = this.$refs.areaEchart;
      this.areaChart = this.$echarts.init(oEchart);
      window.addEventListener('resize', () => {
        this.areaChart.resize();
      })
      this.setAreaOption();
    },
    setAreaOption () {
      var option = {
        title: {
          text: this.detail.area.name,
          top: 18,
          left: '50%',
          textAlign: 'center',
          textStyle: {
            fontSize: 16,
            color: '#377DC9',
            fontWeight: 400
          }
        },
        tooltip: {
          trigger: 'axis'
        },
        grid: {
            left: '4%',
            right: '4%',
            top: 50,
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,//坐标轴两边留白
          data: this.detail.area.xData,
          axisLabel: { //坐标轴刻度标签的相关设置。
            interval: 0,//设置为 1，表示『隔一个标签显示一个标签』
            rotate: 30,
            textStyle: {
              color: '#1B253A',
              fontStyle: 'normal',
              fontFamily: '微软雅黑',
              fontSize: 12,
            },
          },
          axisTick:{//坐标轴刻度相关设置。
            show: false,
          },
          axisLine:{//坐标轴轴线相关设置
            lineStyle:{
              color:'#E5E9ED',
              opacity:0.5
            }
          },
          splitLine: { //坐标轴在 grid 区域中的分隔线。
            show: true,
            lineStyle: {
              color: '#E5E9ED',
              opacity:0.5
            }
          }
        },
        yAxis: [
          {
            type: 'value',
            splitNumber: 5,
            axisLabel: {
              textStyle: {
                color: '#a8aab0',
                fontStyle: 'normal',
                fontFamily: '微软雅黑',
                fontSize: 12,
              }
            },
            axisLine:{
              show: false
            },
            axisTick:{
              show: false
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#E5E9ED',
                opacity:0.5
              }
            }
          }
        ],
        series: [
          {
            type: 'line',
            itemStyle: {
            normal: {
              color: this.detail.color.area[0],
              lineStyle: {
                color: this.detail.color.area[0],
                width:1
              },
              areaStyle: { 
                color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                  offset: 0,
                  color: this.detail.color.area[1]
                }, {
                  offset: 1,
                  color: this.detail.color.area[2]
                }]),
              }
            }
            },
            data: this.detail.area.yData
          },
        ]
      }
      this.areaChart.setOption(option);
    }
  }
}
</script>
<style lang="scss" scoped>
.real-time-item-wp {
  border: 1px solid #DDF0FF;
  .title {
    padding-left: 20px;
    line-height: 45px;
    font-size: 16px;
    font-weight: bold;
    color: #377DC9;
    border-bottom: 1px solid #DDF0FF;
  }
  .row1 {
    position: relative;
    display: flex;
    align-items: center;
    .hr {
      content: '';
      position: absolute;
      left: 30px;
      right: 30px;
      bottom: 0;
      border-bottom: 1px solid #DDF0FF;
    }
    .bar {
      width: 196px;
      height: 164px;
    }
    .box {
      flex: 1;
      .item {
        & + .item {
          margin-top: 26px;
        }
        .name, .value {
          float: left;
          width: 50%;
          height: 35px;
          line-height: 35px;
          box-sizing: border-box;
          font-size: 16px;
        }
        .name {
          padding: 0 5px;
          color: #fff;
          text-align: center;
          background: linear-gradient(90deg, #377DC9, #5C9FE8);
          border-radius: 3px 0 0 3px;
        }
        .value {
          padding: 0 5px 0 12%;
          background: #F5FBFF;
          color: #666;
          .num {
            margin-right: 10px;
            color: #E50C0E;
            font-size: 20px;
          }
        }
      }
      .item:nth-child(2) {
        .value .num {
          color: #FCA007;
        }
      }
    }
  }
  .area {
    height: 266px;
  }

}
</style>