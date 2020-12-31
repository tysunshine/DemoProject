<!-- 公共表格 -->
<template>
  <div class="com-table-wp">
    <el-form ref="form" :model="form" :inline="true">
      <el-form-item label="时间筛选">
        <el-input v-model="form.time"></el-input>
      </el-form-item>
      <el-form-item label="区域">
        <el-select v-model="form.area" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="success">搜 索</el-button>
        <el-button type="warning">重 置</el-button>
      </el-form-item>
    </el-form>

    <div class="table-box">
      <div class="table-title">全市医疗机构中医类医疗费用统计</div>
      <div class="row1">
        <div class="item">
          <span>时间范围：</span>
          <span>2020年</span>
        </div>
        <div class="item">
          <span>单位：</span>
          <span>万元、元</span>
        </div>
      </div>
      <el-table class="this-table" :data="table.data">
        <el-table-column v-for="(item, index) in table.head" :key="index"
          :prop="item.key"
          :label="item.name">
        </el-table-column>
      </el-table>
    </div>

  </div>
</template>
<script>
export default {
  name: 'com-table',
  data () {
    return {
      // 表单
      form: {
        time: '',
        area: '',
      },
      req: null,
      

      table: {
        head: [
          {name: '行政区划', key: 'a1'},
          {name: '中处方费用（万元）', key: 'a2'},
          {name: '中药饮片处方费用（万元）', key: 'a3'},
          {name: '中成药处方费用（万元）', key: 'a4'},
          {name: '西药处方费用（万元）', key: 'a5'},
          {name: '门诊病人次均处方费用（元）', key: 'a6'},
        ],
        data: [
          {a1: '重庆市', a2: '5858', a3: '213', a4: '23', a5: '8918', a6: '888'},
          {a1: '万州区', a2: '5858', a3: '213', a4: '23', a5: '8918', a6: '888'},
          {a1: '涪陵区', a2: '5858', a3: '213', a4: '23', a5: '8918', a6: '888'},
          {a1: '渝中区', a2: '5858', a3: '213', a4: '23', a5: '8918', a6: '888'},
        ]
      },

      page: {
        current: 1,
        total: 1,
        size: 10
      },
    }
  },
  props: {

  },
  mounted () {

  },
  methods: {
    getData () {

    },
  }
}
</script>
<style lang="scss" scoped>
.com-table-wp {
  .table-box {
    .table-title {
      text-align: center;
    }
    .row1 {
      display: flex;
      justify-content: space-between;
    }
    .this-table {
      width: 100%;
    }
  }
}
</style>