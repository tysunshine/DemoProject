<!-- 应用状态监控 -->
<template>
  <div class="app-state-monitor-wp com-wrapper" v-loading="tableLoading" element-loading-text="拼命加载中">
    <div class="com-content">
      <el-form :inline="true" size="small" :model="form" class="com-form">
        <el-form-item label="服务器名称">
          <el-input v-model="form.appName" placeholder="请输入服务器名称" clearable></el-input>
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
          align="center"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <template v-if="item.key == 'statusStr'">
              <div :style="{color: getSystemStatusByCode(scope.row.status).color}">
                <i class="icon iconfont" 
                  :class="[getSystemStatusByCode(scope.row.status).icon]"></i>
                {{scope.row.statusStr}}
              </div>
            </template>
            <template v-else>
              {{scope.row[item.key]}}
            </template>
          </template>    
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>

import {mtApp} from "@/config/api.js";
import {getSystemStatusByCode} from "@/utils/tools";

export default {
  name: 'app-state-monitor',
  data () {
    return {
      form: {
        appName: '', // 应用名称
      },

      // 状态列表
      statusList: [
        {name: '未知', value: '-1'},
        {name: '预警', value: '0'},
        {name: '在线', value: '1'},
        {name: '离线', value: '2'},
      ],

      table: {
        head: [
          {name: '应用名称', key: 'appName'},
          {name: '应用状态', key: 'statusStr'},
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
        areaCode: this.userMsg.areaCode,
        appId: '',
        appName: this.req.appName,
        sendTime: '',
        dateTime: '',
        status: '',
      }
      this.$postForm(mtApp.list, param).then(res => {
        if (res.result == 200) {
          this.table.data = this.format(res.data);
        }
      })
    },

    format (data) {
      data.forEach(item => {
        // 当前状态
        item.statusStr = getSystemStatusByCode(item.status).name;
      })
      return data;
    },

  }
}
</script>
<style lang="scss" scoped>
.app-state-monitor-wp {
  
}
</style>