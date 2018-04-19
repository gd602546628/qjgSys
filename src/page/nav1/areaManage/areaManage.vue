<template>
  <div class="area-manage">
    <top-filter title="区域管理">
      <div slot="top">
        <div class="form-item">
          <span>区域名称：</span>
          <el-input placeholder="请输入区域名称" v-model="formData.name"></el-input>
        </div>
      </div>
      <div slot="bottom">
        <div slot="top">
          <div class="form-item">
            <span>所属区域：</span>
            <city-select @selectCity="selectCity"></city-select>
          </div>
        </div>
      </div>
      <div slot="btn-group">
        <el-button type="primary" class="add-btn" icon="el-icon-plus" @click.stop="goAdd">添加区域</el-button>
        <el-button type="primary" class="select-btn" icon="el-icon-search" @click="select">筛选</el-button>
      </div>
    </top-filter>
    <common-table :tableHeader="tableHeader" :tableData="tableData" :hideDelete="true"></common-table>
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
  </div>
</template>
<script>
  import topFilter from '../../../component/topFilter.vue'
  import commonTable from '../../../component/table.vue'
  import citySelect from '../../../component/citySelect.vue'
  import {filePre, code} from '../../../config/config'
  import Api from '../../../api/api'
  export default{
    components: {
      topFilter,
      commonTable,
      citySelect
    },
    data(){
      return {
        formData: {
          name: '',
          cityCode: '',
          cityName: '',
          countyCode: '',
          countyName: '',
          provinceCode: '',
          provinceName: '',
          pageNum: 1,
          pageSize: 10
        },
        tableData: [],
        tableHeader: [
          {
            label: '名称',
            prop: 'name'
          },
          {
            label: '所属区域',
            prop: 'areaLabel'
          },
          {
            label: '创建时间',
            prop: 'createTime'
          },
        ],
        operation: [ //启用状态下操作
          {
            label: '删除',
            color: '#ff3c3c',
            handle: this.delete,
          },
        ],
        pageCount: 1,
        total: 1
      }
    },
    computed: {},
    created(){
      this.getList()
    },
    methods: {
      selectCity(data){
        this.formData.cityName = data.city.name
        this.formData.cityCode = data.city.id
        this.formData.provinceName = data.province.name
        this.formData.provinceCode = data.province.id
        this.formData.countyName = data.county.name
        this.formData.countyCode = data.county.id
      },
      async delete(index, item){
        let data = await Api.area.deleteById({id: item.id})
        if (data.code === code.SUCCESS) {
          this.$message.success('删除成功')
          this.tableData.splice(index, 1)
        } else {
          this.$message.error(data.mesg)
        }
      },
      goAdd(){
        this.$router.push({name: 'addArea'})
      },
      select(){
        this.getList()
      },
      loadPage(currentPage){
        this.formData.pageNum = currentPage
        this.getList()
      },
      async getList(){
        let data = await Api.area.getList(this.formData)
        this.total = data.data.allCount
        this.pageCount = data.data.totalPage
        data.data.list.forEach(item => {
          item.areaLabel = item.provinceName + item.cityName + item.countyName
          item.operation = this.operation
        })
        this.tableData = data.data.list
      },
    }
  }
</script>
<style lang='scss' type="text/scss" rel='stylesheet/scss' scoped>
  .area-manage {
    padding: 20px;
    .pagination {
      margin-top: 20px;
      text-align: center;
    }
  }
</style>
