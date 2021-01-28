<!-- 模板 -->
<template>
  <div class="server-moniter-detail-wp com-wrapper" v-loading="tableLoading" element-loading-text="拼命加载中">
    <div class="com-content">
      <div class="title clearfix">
        <i class="icon iconfont iconfuwuqi-copy"></i>
        <span>当前服务器</span>
        <span v-if="serverInfo" class="name">{{serverInfo.serverName}} - {{serverInfo.ip}}</span>
        <el-button class="pull-right" type="primary" size="mini" @click="loadRealTime()">刷新</el-button>
      </div>

      <el-row :gutter="15">
        <el-col :span="8">
          <div class="real-time-item">
            <real-time-item :detail="realTime[0]" ref="realtimeCpu"></real-time-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="real-time-item">
            <real-time-item :detail="realTime[1]" ref="realtimeMem"></real-time-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="real-time-item">
            <real-time-item :detail="realTime[2]" ref="realtimeDisk"></real-time-item>
          </div>
        </el-col>
      </el-row>

      <el-form :inline="true" size="small" :model="form" class="com-form">
        <el-form-item label="日期选择">
          <el-date-picker
            v-model="form.time"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search()">查询</el-button>
        </el-form-item>
      </el-form>

      <el-table :data="table.data" style="width: 100%"
        stripe
        fit
        border
        highlight-current-row
        :header-cell-style="{background: '#F5FBFF',color: '#555555'}">
        <el-table-column v-for="(item, index) in table.head" :key="index" 
          :prop="item.key"
          :label="item.name"
          :min-width="item.width || '150px'"
          align="center"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <!-- 状态 -->
            <template v-if="item.key == 'statusStr'">
              <div :style="{color: getSystemStatusByCode(scope.row.status).color}">
                <i class="icon iconfont"
                  :class="[getSystemStatusByCode(scope.row.status).icon]"></i>
                {{scope.row.statusStr}}
              </div>
            </template>
            <template v-else>
              <span :class="[item.warn ? (item.warn(scope.row[item.key]) ? 'warn' : '') : '']">{{scope.row[item.key]}}</span> 
            </template>
          </template>
        </el-table-column>
      </el-table>

      <!--页码-->
      <pubPage :pageObj="page" @changePage="changePage"></pubPage>

    </div>
  </div>
</template>
<script>

import realTimeItem from "./real-time-item.vue";
import pubPage from '@/components/page.vue'

import {mtServer} from "@/config/api.js";
import {storage, switchTime, toFixed, getSystemStatusByCode} from "@/utils/tools";

export default {
  name: 'server-moniter-detail',
  components: {
    realTimeItem,
    pubPage,
  },
  data () {
    return {
      realTime: [
        {
          name: 'CPU实时监控',
          num: {
            ratio: 0,
            total: 20,
            current: 2
          },
          area: {
            name: 'CPU实时使用率（%）',
            xData: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
            yData: [1,2,3,3,5,6,5,3,6,5,5,4,8,7,9]
          },
          color: {
            text: '#377DC9',
            border: '#DDF0FF',
            label: 'linear-gradient(90deg, #377DC9, #5C9FE8)',
            area: ['#377dc9', 'rgba(2,194,255,0.2)', ' rgba(2,194,255,1)']
          }
        },
        {
          name: '内存实时监控',
          num: {
            ratio: 0,
            total: 20,
            current: 2
          },
          area: {
            name: '内存实时使用率（%）',
            xData: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
            yData: [1,2,3,3,5,6,5,3,6,5,5,4,8,7,9]
          },
          color: {
            text: '#2AB176',
            border: '#CEEED1',
            label: 'linear-gradient(90deg, #2AB176, #46D496)',
            area: ['#2ab176', 'rgba(69,187,135,0.2)', 'rgba(69,187,135,1)']
          }
        },
        {
          name: '磁盘实时监控',
          num: {
            ratio: 0,
            total: 20,
            current: 2
          },
          area: {
            name: '磁盘实时使用率（%）',
            xData: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
            yData: [1,2,3,3,5,6,5,3,6,5,5,4,8,7,9]
          },
          color: {
            text: '#377DC9',
            border: '#DDF0FF',
            label: 'linear-gradient(90deg, #377DC9, #5C9FE8)',
            area: ['#377dc9', 'rgba(2,194,255,0.2)', ' rgba(2,194,255,1)']
          }
        }
      ],

      // 服务器信息 - 从列表传下来
      serverInfo: null,

      // 利用率
      useRatio: {
        cpu: 0, // cpu
        mem: 0, // 内存
        disk: 0, // 磁盘
      },

      // 表单
      form: {
        time: ''
      },

      // 表格
      table: {
        head: [
          {name: '当前状态', key: 'statusStr', width: '100px'},
          {name: '时间', key: 'dateTime', width: '180px'},
          {name: '内存总量（GB）', key: 'memTotal'},
          {name: '内存使用量（GB）', key: 'memUsed'},
          {name: '内存缓存量（GB）', key: 'memCache'},
          {name: '内存占用率(%)', key: 'memUs', warn: (val) => {return val > 75}},
          {name: '磁盘总量（GB）', key: 'diskTotal'},
          {name: '磁盘使用量（GB）', key: 'diskUsed'},
          {name: '磁盘占用率(%)', key: 'diskUs', warn: (val) => {return val > 75}},
          {name: '内核空间占用率(%)', key: 'cpuSy'},
          {name: 'CPU利用率(%)', key: 'cpuUs', warn: (val) => {return val > 75}},
          {name: '硬件中断(%)', key: 'cpuHi'},
          {name: '软件中断(%)', key: 'cpuSi'},
        ],
        data: []
      },

      // 获取状态内容方法
      getSystemStatusByCode: getSystemStatusByCode,
    }
  },
  mounted () {
    this.serverInfo = storage.get('serverInfo');
    if (!this.serverInfo) {
      this.$router.replace(this.$route.path.split('/detail')[0]);
      return;
    }
    this.search(); // 历史列表
    this.loadRealTime(); // 实时监控加载
  },
  methods: {
    getData () {
      // console.log(this.req.time);
      var param = {
        areaCode: this.serverInfo.areaCode,
        serverId: this.serverInfo.serverId,
        pageNum: this.page.targetPage,
      }

      this.$postForm(mtServer.history, param).then(res => {
        if(res.result == 200) {
          var data = res.data;
          this.table.data = this.format(data.list);
          this.page.totalPage = data.totalCount;
        }
      })
    },

    // 实时监控加载
    loadRealTime () {
      this.getInfo(); // 获取服务器监控详细信息
      this.getServerRealTimeInfo(); // 获取服务器监控实时监控信息
    },

    // 获取详情
    getInfo () {
      var param = {
        areaCode: this.serverInfo.areaCode,
        serverId: this.serverInfo.serverId,
      }
      this.$postForm(mtServer.info, param).then(res => {
        if (res.result == 200) {
          var data = res.data;

          this.realTime[0].num.ratio = data.cpuUs;
          this.realTime[1].num.ratio = toFixed(data.memUsedRate * 100, 2);
          this.realTime[2].num.ratio = toFixed(data.diskUsedRate * 100, 2);
          
          this.renewRealTime();
        }
      })
    },

    // 获取时间使用率
    getServerRealTimeInfo () {
      var param = {
        areaCode: this.serverInfo.areaCode,
        serverId: this.serverInfo.serverId,
      }
      this.$postForm(mtServer.getServerRealTimeInfo, param).then(res => {
        if (res.result == 200) {
          var data = res.data;

          var timeList = this.getTime(data.dateTimeYList); // 时间

          this.realTime[0].num.current = data.todayCpuWarnCount; // 当天预警
          this.realTime[0].num.total = data.cpuWarnCount; // 总预警
          this.realTime[0].area.xData = timeList; // 时间
          this.realTime[0].area.yData = data.cpuXList; // 数据

          this.realTime[1].num.current = data.todayMemWarnCount; // 当天预警
          this.realTime[1].num.total = data.memWarnCount; // 总预警
          this.realTime[1].area.xData = timeList; // 时间
          this.realTime[1].area.yData = data.memXList.map(item => {return toFixed(item*100, 2)}); // 数据

          this.realTime[2].num.current = data.todayDiskWarnCount; // 当天预警
          this.realTime[2].num.total = data.diskWarnCount; // 总预警
          this.realTime[2].area.xData = timeList; // 时间
          this.realTime[2].area.yData = data.disXList.map(item => {return toFixed(item*100, 2)}); // 数据

          this.renewRealTime();
        }
      })
    },

    // 更新
    renewRealTime () {
      this.$refs.realtimeCpu.renewOption();
      this.$refs.realtimeMem.renewOption();
      this.$refs.realtimeDisk.renewOption();
    },

    // 格式化
    format (data) {
      data.forEach(item => {
        // 内存占用率
        item.memUs = this.calcRatio(item.memUsed, item.memTotal);

        // 磁盘占用率
        item.diskUs = this.calcRatio(item.diskUsed, item.diskTotal);

        // 当前状态
        item.statusStr = getSystemStatusByCode(item.status).name;
      })
      return data;
    },

    // 计算比率
    calcRatio (val, all) {
      var res = '';
      if (!val || !all) {
        res = 0;
      } else {
        res = (val / all).toFixed(4) * 100;
        var arr = ('' + res).split('.');
        if (arr[1].length > 2) {
          arr[1] = arr[1].slice(0, 2);
          res = arr.join('.');
        }
      }
      return res;
    },

    // 保留时分秒
    getTime (data) {
      var res = data.map(item => {
        return switchTime(item, 'HH:mm:ss');
      })
      return res;
    },

  }
}
</script>
<style lang="scss" scoped>
.server-moniter-detail-wp {
  .title {
    margin-bottom: 15px;
    padding-bottom: 10px;
    border-bottom: 1px solid #F1F1F1;
    color: #606A76;
    i, span {
      float: left;
      line-height: 28px;
    }
    i {
      margin-right: 10px;
      font-size: 20px;
      color: #3C80CA;
    }
    .name {
      margin-left: 10px;
      color: #2AB176;
      font-weight: bold;
    }
  }

  .com-form {
    margin-top: 20px;
  }

  .warn {
    color: red;
  }
}
</style>