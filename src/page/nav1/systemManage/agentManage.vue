<template>
  <div class="agent-manage">
    <top-filter title="代理商管理">
      <div slot="top">
        <div class="form-item">
          <span>账号：</span>
          <el-input placeholder="请输入账号" v-model="formData.account"></el-input>
        </div>
        <div class="form-item">
          <span>所属区域：</span>
          <city-select @selectCity="selectCity" :level="2"></city-select>
        </div>
      </div>
      <div slot="bottom">
        <div class="form-item">
          <span>账号状态：</span>
          <el-select v-model="formData.status" placeholder="请选择账号状态">
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
    <common-table :tableHeader="tableHeader" :tableData="tableData" @deleteAll="deleteAll"></common-table>
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="loadPage"
        :page-size="this.formData.pageSize"
        :page-count="pageCount"
      >
      </el-pagination>
    </div>
    <common-model class="add-agent" title="添加账号" :show="showAddModel" @closeModel="add_cancel">
      <el-form class="add-agent-box" label-width="110px" :model="addForm" :rules="rules" ref="add_Form">

        <el-form-item label="账号：" prop="account" v-if="!addForm.id">
          <el-input placeholder="请输入账号" v-model="addForm.account"></el-input>
        </el-form-item>
        <el-form-item label="代理商名称：" prop="name">
          <el-input placeholder="请输入代理商名称" v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="所属区域：" prop="provinceCode">
          <city-select @selectCity="addSelectCity" :area="addForm.area" :level="2"></city-select>
        </el-form-item>

        <el-form-item label="磁盘容量：" prop="diskSize" v-if="!addForm.id">
          <el-input placeholder="请输入磁盘容量" v-model="addForm.diskSize"></el-input>
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
  import Api from '../../../api/api'
  import {code, filePre} from '../../../config/config'
  export default{
    components: {
      topFilter,
      citySelect,
      commonTable,
      commonModel
    },
    data(){
      return {
        formData: {
          account: '',
          endTime: '',
          pageNum: 1,
          pageSize: 10,
          startTime: '',
          status: '',
          cityCode: '',
          provinceCode: '',
          area: []
        },
        showAddModel: false,
        attrList: [
          {label: '启用', value: 0},
          {label: '停用', value: 1}
        ],
        tableData: [],
        tableHeader: [
          {
            label: '名称',
            prop: 'name'
          },
          {
            label: '账号',
            prop: 'account'
          },
          {
            label: '创建时间',
            prop: 'createTime'
          },
          {
            label: '用户数量',
            prop: 'accountNum'
          },
          {
            label: '项目数量',
            prop: 'projectNum'
          },
          {
            label: '磁盘容量',
            prop: 'diskLabel'
          },
          {
            label: '登录次数',
            prop: 'loginNum'
          },
          {
            label: '最后登录时间',
            prop: 'lastLoginTime'
          },
          {
            label: '账号状态',
            prop: 'statusLabel'
          },
        ],
        operation: [ //启用状态下操作
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
          {
            label: '删除',
            color: '#ff5656',
            handle: this.delete,
          },
        ],
        operation1: [ //停用状态下操作
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
          {
            label: '删除',
            color: '#ff5656',
            handle: this.delete,
          },
        ],
        pageCount: 1,
        total: 1,
        addForm: {
          account: '',
          cityCode: '',
          cityName: '',
          diskSize: '',
          name: '',
          password: '111111',
          provinceCode: '',
          provinceName: '',
          id: null
        },
        rules: {
          account: [
            {required: true, message: '请输入代理商账号', trigger: 'blur'},
            {min: 1, max: 20, message: '名称为1-20位汉子、字母、数字、特殊字符', trigger: 'blur'}
          ],
          name: [
            {required: true, message: '请输入代理商名称', trigger: 'blur'},
            {min: 1, max: 20, message: '名称为1-20位汉子、字母、数字、特殊字符', trigger: 'blur'}
          ],
          diskSize: [
            {required: true, message: '请输入磁盘容量', trigger: 'blur'},
          ],
          provinceCode: [
            {required: true, message: '请选择区域', trigger: 'blur'},
          ],
        },
        area: []
      }
    },
    created(){
      this.getList()
    },
    methods: {
      goAdd(){ // 添加账号
        this.showAddModel = true
      },
      add_confirm(){
        this.$refs.add_Form.validate(async flag => {
          if (flag) {
            this.addForm.diskSize = parseInt(this.addForm.diskSize) * 1024 * 1024
            let data = await Api.systemAccount.add(this.addForm)
            if (data.code === code.SUCCESS) {
              this.$message.success('添加成功')
              this.getList()
              this.add_cancel()
            } else {
              this.$message.error(data.mesg)
            }
          }
        })
      },
      add_cancel(){
        this.addForm = {
          account: '',
          cityCode: '',
          cityName: '',
          diskSize: '',
          name: '',
          password: '111111',
          provinceCode: '',
          provinceName: '',
          id: null,
          area: []
        }
        this.showAddModel = false
      },
      addSelectCity(data){// 添加账号选择城市
        this.addForm.cityName = data.city.name
        this.addForm.cityCode = data.city.id
        this.addForm.provinceName = data.province.name
        this.addForm.provinceCode = data.province.id
      },
      select(){ // 筛选
        this.formData.pageNum = 1
        this.getList()
      },
      selectCity(data){ // 筛选表单选择城市
        this.formData.cityName = data.city.name
        this.formData.cityCode = data.city.id
        this.formData.provinceName = data.province.name
        this.formData.provinceCode = data.province.id
      },
      lookUser(){ // 查看用户

      },
      edit(index, item){ // 修改
        Object.assign(this.addForm, item)
        this.addForm.area = [this.addForm.provinceCode, this.addForm.cityCode]
        this.addForm.password = null
        this.showAddModel = true
      },
      async resetPassWord(index, item){ // 重置密码
        let data = await Api.systemAccount.updatePassword({
          id: item.id,
          newPassword: '111111'
        })
        if (data.code === code.SUCCESS) {
          this.$message.success('重置密码成功')
        } else {
          this.$message.error(data.mesg)
        }
      },
      async deleteAll(arr){ // 批量删除
        let result = [] //选中的id
        let left = [] //没被选中的元素
        this.tableData.forEach(item => {
          if (arr.indexOf(item) >= 0) {
            result.push(item.id)
          } else {
            left.push(item)
          }
        })
        let data = await Api.systemAccount.deleteById({
          ids: result
        })
        if (data.code === code.SUCCESS) {
          this.tableData = left
          this.$message.success('删除成功')
        } else {
          this.$message.success('删除失败')
        }
      },
      async delete(index, item){
        let data = await Api.systemAccount.deleteById({
          ids: [item.id]
        })
        if (data.code === code.SUCCESS) {
          this.tableData.splice(index, 1)
          this.$message.success('删除成功')
        } else {
          this.$message.error('删除失败')
        }
      },
      async stop(index, item){
        let data = await Api.systemAccount.updateStatus({
          id: item.id,
          status: 1
        })
        if (data.code === code.SUCCESS) {
          this.$message.success('停用成功')
          item.status = 1
          item.operation = this.operation1
          item.statusLabel = '停用'
        }
      },
      async start(index, item){
        let data = await Api.systemAccount.updateStatus({
          id: item.id,
          status: 0
        })
        if (data.code === code.SUCCESS) {
          this.$message.success('启用成功')
          item.status = 0
          item.operation = this.operation
          item.statusLabel = '启用'
        }
      },
      loadPage(currentPage){
        this.formData.pageNum = currentPage
        this.getList()
      },
      fileSize(val){
        let kb = (val / 1024)
        let mb = (kb / 1024)
        let result = ''
        if (kb >= 1024) {
          return mb.toFixed(1) + '  mb'
        } else {
          return kb.toFixed(1) + '  kb'
        }
      },
      async getList(){
        let data = await Api.systemAccount.getList(this.formData)
        this.total = data.data.allCount
        this.pageCount = data.data.totalPage
        data.data.list.forEach(item => {
          item.statusLabel = item.status === 0 ? '启用' : '停用'
          item.diskLabel =this.fileSize(item.diskSize)
          if (item.status === 0) {
            item.operation = this.operation
          } else {
            item.operation = this.operation1
          }
        })
        this.tableData = data.data.list
      },
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
