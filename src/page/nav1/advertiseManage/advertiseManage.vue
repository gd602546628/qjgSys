<template>
  <div class="advManage-page">
    <top-filter title="广告管理">
      <div slot="top">
        <div class="form-item">
          <span>广告标题：</span>
          <el-input placeholder="请输入广告标题" v-model="formData.title"></el-input>
        </div>
        <div class="form-item">
          <span>广告区域：</span>
          <city-select @selectCity="selectCity" :level="2"></city-select>
        </div>
      </div>
      <div slot="bottom">
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
        <div class="form-item">
          <span>发布状态：</span>
          <el-select v-model="formData.status" placeholder="请选择广告发布状态">
            <el-option
              v-for="item in attrList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div slot="btn-group">
        <el-button type="primary" class="add-btn" icon="el-icon-plus" @click.stop="goAdd">添加广告</el-button>
        <el-button type="primary" class="select-btn" icon="el-icon-search" @click="select">筛选</el-button>
      </div>
    </top-filter>
    <q-table :tableHeader="tableHeader"
             :tableData="tableData"
             :showOperation="true"
             @deleteAll="deleteAll"
             :hideDelete="true"
    ></q-table>
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="this.formData.pageSize"
        :page-count="pageCount"
        @current-change="loadPage"
      >
      </el-pagination>
    </div>
    <phone-model :src="phoneSrc" :show="showPhoneModel" @closeModel="closePhoneModel"></phone-model>
  </div>
</template>


<script>
  import qTable from '@/component/table.vue'
  import topFilter from '../../../component/topFilter.vue'
  import Api from '../../../api/api'
  import citySelect from '../../../component/citySelect.vue'
  import {code, advertPre} from '../../../config/config'
  import phoneModel from '../../../component/phoneModel.vue'
  export default{
    components: {
      qTable,
      topFilter,
      citySelect,
      phoneModel
    },
    data(){
      return {
        pageCount: 1,
        total: 1,
        tableHeader: [
          {
            label: '标题',
            prop: 'title'
          },
          {
            label: '添加时间',
            prop: 'createTime'
          },
          {
            label: '广告区域',
            prop: 'areaLabel'
          },
          {
            label: '发布状态',
            prop: 'statusLabel'
          },
          {
            label: '点击量',
            prop: 'hits'
          }
        ],
        tableData: [],
        operationPublic: [
          {
            label: '预览',
            color: '#20a7fe',
            handle: this.look,
          },
          {
            label: '撤销',
            color: '#f6781d',
            handle: this.stop,
          },
          {
            label: '修改',
            color: '#20a7fe',
            handle: this.edit,
          },
          {
            label: '删除',
            color: '#ff5656',
            handle: this.delete,
          }
        ],
        operationUnPublic: [
          {
            label: '预览',
            color: '#20a7fe',
            handle: this.look,
          },
          {
            label: '发布',
            color: '#20a7fe',
            handle: this.start,
          },
          {
            label: '修改',
            color: '#20a7fe',
            handle: this.edit,
          },
          {
            label: '删除',
            color: '#ff5656',
            handle: this.delete,
          }
        ],
        attrList: [
          {
            value: 0,
            label: '未发布'
          },
          {
            value: 1,
            label: '已发布'
          }],
        formData: {
          status: '',
          startTime: '',
          endTime: '',
          title: '',
          pageNum: 1,
          pageSize: 10,
          provinceCode: '',
          cityCode: ''
        },
        showPhoneModel: false,
        phoneSrc: ''
      }
    },
    created(){
      this.getList()
    },
    methods: {
      look(index, item){ // 查看
        /*TODO 预览*/
        this.showPhoneModel = true
        this.phoneSrc = advertPre + item.id
      },
      closePhoneModel(){
        this.showPhoneModel = false
      },
      edit(index, item){ // 修改
        this.$router.push({
          name: 'addAdvertise',
          params: {
            id: item.id
          }
        })
      },
      async stop(index, item){ // 撤销
        let data = await Api.advert.publish({id: item.id, status: 0})
        if (data.code === code.SUCCESS) {
          item.operation = this.operationUnPublic
          item.statusLabel = '未发布'
          this.$message.success('撤销成功')
        } else {
          this.$message.error(data.mesg)
        }
      },
      async delete(index, item){ // 删除
        let data = await Api.advert.deleteById({
          id: item.id
        })
        if (data.code === code.SUCCESS) {
          this.tableData.splice(index, 1)
          this.$message.success('删除成功')
        } else {
          this.$message.error(data.mesg)
        }
      },
      async start(index, item){ // 发布
        let data = await Api.advert.publish({id: item.id, status: 1})
        if (data.code === code.SUCCESS) {
          item.operation = this.operationPublic
          item.statusLabel = '已发布'
          this.$message.success('发布成功')
        } else {
          this.$message.error(data.mesg)
        }
      },
      deleteAll(arr){ //删除所选
        console.log(arr)
      },
      goAdd(){ //跳转添加
        this.$router.push({
          name: 'addAdvertise'
        })
      },
      select(){ // 筛选
        this.formData.pageNum = 1
        this.getList()
      },
      loadPage(currentPage){ // 点击分页器
        this.formData.pageNum = currentPage
        this.getList()
      },
      async getList(){
        let data = await Api.advert.getList(this.formData)
        this.total = data.data.allCount
        this.pageCount = data.data.totalPage
        data.data.list.forEach(item => {
          if (item.status === 0) {
            item.statusLabel = '未发布'
            item.operation = this.operationUnPublic
          } else {
            item.operation = this.operationPublic
            item.statusLabel = '已发布'
          }
          item.areaLabel = item.provinceName + item.cityName
        })
        this.tableData = data.data.list
      },
      selectCity(data){
        this.formData.cityName = data.city.name
        this.formData.cityCode = data.city.id
        this.formData.provinceName = data.province.name
        this.formData.provinceCode = data.province.id
      }
    }
  }
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
  .advManage-page {
    padding: 20px;
    .pagination {
      margin-top: 20px;
      text-align: center;
    }
  }
</style>
