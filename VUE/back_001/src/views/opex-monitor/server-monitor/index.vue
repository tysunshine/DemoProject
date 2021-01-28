<!-- 服务器监控 -->
<template>
  <div class="server-minitor-wp com-wrapper" v-loading="tableLoading" element-loading-text="拼命加载中">

    <el-row class="machine-num" :gutter="16">
      <el-col :span="8">
        <div class="item">
          <i class="icon iconfont iconneicunjingbao"></i>
          <div class="text">
            <p class="name">内存预警服务器数量(台)</p>
            <p class="value">{{memMax}}</p>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="item cp">
          <i class="icon iconfont iconcipanjingbao"></i>
          <div class="text">
            <p class="name">磁盘预警服务器数量(台)</p>
            <p class="value">{{diskMax}}</p>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="item cpu">
          <i class="icon iconfont iconcpujingbao"></i>
          <div class="text">
            <p class="name">CPU预警服务器数量(台)</p>
            <p class="value">{{cpuMax}}</p>
          </div>
        </div>
      </el-col>
    </el-row>

    <div class="com-content">
      <el-form :inline="true" size="small" :model="form" class="com-form">
        <el-form-item label="服务器名称">
          <el-input v-model="form.serverName" placeholder="请输入服务器名称" clearable></el-input>
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
          :align="item.align || 'center'"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <!-- 服务器名称 -->
            <template v-if="item.key == 'serverName'">
              <div :style="{color: getSystemStatusByCode(scope.row.status).color}">
                <i class="icon iconfont" 
                  :class="[getSystemStatusByCode(scope.row.status).icon]"></i>
                {{scope.row.serverName}}
              </div>
            </template>
            <!-- 当前状态 -->
            <template v-else-if="item.key == 'statusStr'">
              <span :style="{color: getSystemStatusByCode(scope.row.status).color}">
                {{scope.row.statusStr}}
              </span>
            </template>
            <template v-else>
              <span :class="[item.warn ? (item.warn(scope.row[item.key]) ? 'warn' : '') : '']">{{scope.row[item.key]}}</span> 
            </template>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="80px" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="showDetail(scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
      
  </div>
</template>
<script>

import pubPage from '@/components/page.vue';
import {mtServer} from "@/config/api";
import {storage, toFixed, getSystemStatusByCode} from "@/utils/tools";

export default {
  name: 'server-minitor',
  components: {
    pubPage,
  },
  data () {
    return {
      // 超载
      memMax: 0,
      diskMax: 0,
      cpuMax: 0,

      form: {
        serverName: '', // 服务器id
      },

      // 服务器状态
      statusList: [
        {name: '未知', value: '-1', icon: 'iconweizhi', color: '#FF9703'},
        {name: '预警', value: '0', icon: 'iconjingbao', color: '#DD0000'},
        {name: '在线', value: '1', icon: 'iconzhengchang', color: '#2AB176'},
        {name: '离线', value: '2', icon: 'iconxiaxian', color: '#727671'},
      ],

      table: {
        head: [
          {name: '服务器名称', key: 'serverName', width: '300px', align: 'left'},
          {name: '当前状态', key: 'statusStr', width: '100px'},
          {name: 'IP', key: 'ip'},
          {name: '内存总量（GB）', key: 'memTotal'},
          {name: '内存使用量（GB）', key: 'memUsed'},
          {name: '内存缓存量（GB）', key: 'memCache'},
          {name: '内存占用率(%)', key: 'memUsedRate', warn: (val) => {return val > 75}},
          {name: '磁盘总量（GB）', key: 'diskTotal'},
          {name: '磁盘使用量（GB）', key: 'diskUsed'},
          {name: '磁盘占用率(%)', key: 'diskUsedRate', warn: (val) => {return val > 75}},
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
    this.search();
  },
  methods: {
    getData () {
      var param = {
        areaCode: this.userMsg.areaCode, // 区域编码
        serverId: '', // 服务器id
        serverName: this.req.serverName, // 服务器名称
      }
      this.$postForm(mtServer.list, param).then(res => {
        if(res.result == 200) {
          this.table.data = this.format(res.data);
        }
      })
    },

    // 格式化
    format (data) {
      var memMax = 0, diskMax = 0, cpuMax = 0;
      data.forEach(item => {
        // 内存占用率
        item.memUsedRate = toFixed(item.memUsedRate * 100, 2);
        if (this.calcMax('memUsedRate', item.memUsedRate)) {
          memMax++;
        }

        // 磁盘占用率
        item.diskUsedRate = toFixed(item.diskUsedRate * 100, 2);
        if (this.calcMax('diskUsedRate', item.diskUsedRate)) {
          diskMax++;
        }

        // cpu占用率
        if (this.calcMax('cpuUs', item.cpuUs)) {
          cpuMax++;
        }

        // 当前状态
        item.statusStr = getSystemStatusByCode(item.status).name;
      })

      this.memMax = memMax;
      this.diskMax = diskMax;
      this.cpuMax = cpuMax;

      return data;
    },

    // 计算超出
    calcMax (key, value) {
      var res = false;
      for (var i = 0; i < this.table.head.length; i++) {
        var item = this.table.head[i];
        if (item.key == key) {
          res = item.warn(value);
          break;
        }
      }
      return res;
    },

    // 显示详情
    showDetail (row) {
      storage.set('serverInfo', {
        areaCode: row.areaCode,
        serverId: row.serverId,
        serverName: row.serverName,
        ip: row.ip
      })
      this.$router.push('/opexmonitor/server/detail');
    },

  }
}
</script>
<style lang="scss" scoped>
.server-minitor-wp {
  .warn {
    color: red;
  }

  .machine-num {
    margin-bottom: 15px;
    .item {
      display: flex;
      alin-items: center;
      background: #fff;
      i {
        width: 130px;
        height: 112px;
        background: linear-gradient(180deg, #409AF9, #367CC6);
        text-align: center;
        line-height: 112px;
        font-size: 80px;
        color: #fff;
      }
      .text {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 15px;
        box-sizing: border-box;
        .name {
          font-size: 20px;
          color: #00142A;
          line-height: 24px;
        }
        .value {
          margin-top: 10px;
          font-size: 36px;
          color: #F33838;
          line-height: 40px;
        }
      }
    }
    .item.cp i {
      background: linear-gradient(180deg, #F0A910, #DB951C);
    }
    .item.cpu i {
      background: linear-gradient(180deg, #5AE4A8, #36C687);
    }
  }
}
</style>

