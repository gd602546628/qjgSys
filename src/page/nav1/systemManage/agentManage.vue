<template>
  <div class="agent-manage">
    <top-filter title="代理商管理">
      <div slot="top">
        <div class="form-item">
          <span>账号：</span>
          <el-input placeholder="请输入账号" v-model="formData.name"></el-input>
        </div>
        <div class="form-item">
          <span>所属区域：</span>
          <city-select @selectCity="selectCity"></city-select>
        </div>
      </div>
      <div slot="bottom">
        <div class="form-item">
          <span>账号状态：</span>
          <el-select v-model="formData.attr" placeholder="请选择账号状态">
            <el-option
              v-for="item in attrList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="form-item date-picker">
          <div class="wrap">
            <span>创建时间：</span>
            <el-date-picker
              v-model="formData.startTime"
              type="datetime"
              placeholder="选择开始时间"
              class="picker"
              value-format="yyyy-MM-dd HH:mm:ss"
            >
            </el-date-picker>
            <span class="line"></span>
            <el-date-picker
              v-model="formData.endTime"
              type="datetime"
              placeholder="选择结束时间"
              class="picker"
              value-format="yyyy-MM-dd HH:mm:ss"
            >
            </el-date-picker>
          </div>
        </div>

      </div>
      <div slot="btn-group">
        <el-button type="primary" class="add-btn" icon="el-icon-plus" @click.stop="goAdd">添加账号</el-button>
        <el-button type="primary" class="select-btn" icon="el-icon-search" @click="select">筛选</el-button>
      </div>
    </top-filter>
    <common-table :tableHeader="tableHeader" :tableData="tableData"></common-table>
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="1000"
        @current-change="loadPage"
      >
      </el-pagination>
    </div>
    <common-model class="add-agent" title="添加账号" :show="showAddModel" @closeModel="add_cancel">
      <el-form class="add-agent-box" label-width="100px">

        <el-form-item label="账号：">
          <el-input placeholder="请输入账号"></el-input>
        </el-form-item>

        <el-form-item label="所属区域：">
          <city-select @selectCity="addSelectCity"></city-select>
        </el-form-item>

        <el-form-item label="磁盘容量：">
          <el-input placeholder="请输入磁盘容量"></el-input>
        </el-form-item>

        <el-form-item label="账号分类：">

        </el-form-item>

        <div class="tips">注：添加的账号密码默认为“111111”，请提示代理商登录后先修改密码后再进行操作</div>
      </el-form>
      <div class="btn-group">
        <div class="q-btn-confirm" @click="add_confirm">确定</div>
        <div class="q-btn-cancel" @click="add_cancel">取消</div>
      </div>
    </common-model>
  </div>
</template>


<script>
  import topFilter from '../../../component/topFilter.vue'
  import citySelect from '../../../component/citySelect.vue'
  import commonTable from '../../../component/table.vue'
  import commonModel from '../../../component/commonModel.vue'
  export default{
    components: {
      topFilter,
      citySelect,
      commonTable,
      commonModel
    },
    data(){
      return {
        formData: {},
        showAddModel: false,
        attrList: [
          {label: '启用', value: 0},
          {label: '停用', value: 1}
        ],
        tableData: [],
        tableHeader: [
          {
            label: '账号',
            prop: 'account'
          },
          {
            label: '所属区域',
            prop: 'area'
          },
          {
            label: '创建时间',
            prop: 'createTime'
          },
          {
            label: '用户数量',
            prop: 'userNum'
          },
          {
            label: '项目数量',
            prop: 'projectNum'
          },
          {
            label: '磁盘容量',
            prop: 'total'
          },
          {
            label: '登录次数',
            prop: 'times'
          },
          {
            label: '最后登录时间',
            prop: 'lastTime'
          },
          {
            label: '账号状态',
            prop: 'status'
          },
        ],
        operation: [ //启用状态下操作
          {
            label: '用户',
            color: '#20a7fe',
            handle: this.lookUser,
          },
          {
            label: '修改',
            color: '#07c362',
            handle: this.edit,
          },
          {
            label: '停用',
            color: '#f6781d',
            handle: this.stop,
          },
          {
            label: '重置密码',
            color: '#adadad',
            handle: this.resetPassWord,
          },
        ],
        operation1: [ //启用状态下操作
          {
            label: '用户',
            color: '#20a7fe',
            handle: this.lookUser,
          },
          {
            label: '修改',
            color: '#07c362',
            handle: this.edit,
          },
          {
            label: '启用',
            color: '#20a7fe',
            handle: this.start,
          },
          {
            label: '重置密码',
            color: '#adadad',
            handle: this.resetPassWord,
          },
        ],
      }
    },
    methods: {
      goAdd(){ // 添加账号
        this.showAddModel = true
      },
      add_confirm(){
      },
      add_cancel(){
        this.showAddModel = false
      },
      addSelectCity(){// 添加账号选择城市

      },
      select(){ // 筛选
      },
      selectCity(){ // 筛选表单选择城市
      },
      lookUser(){ // 查看用户

      },
      edit(){ // 修改

      },
      stop(){ // 停用

      },
      resetPassWord(){ // 重置密码

      },
      start(){ // 启用

      }
    }
  }
</script>

<style lang='scss' rel='stylesheet/scss'>
  .agent-manage {
    padding: 20px;
    .pagination {
      margin-top: 20px;
      text-align: center;
    }
    .add-agent {
      .add-agent-box {
        padding: 20px 40px 20px 20px;
        .tips {
          color: #606266;
          margin-left: 100px;
          width: 500px;
          font-size: 14px;
        }
        .el-form-item {
          display: flex;
          .el-form-item__content {
            flex: 1;
            margin-left: 10px !important;
          }
        }
      }
      .btn-group {
        display: flex;
        justify-content: center;
      }
    }
  }
</style>
