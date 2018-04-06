<template>
  <div class="advManage-page">
    <top-filter title="广告管理">
      <div slot="top">
        <div class="form-item">
          <span>广告标题：</span>
          <el-input placeholder="请输入广告标题" v-model="formData.name"></el-input>
        </div>
        <div class="form-item">
          <span>广告属性：</span>
          <el-select v-model="formData.attr" placeholder="请选择广告属性">
            <el-option
              v-for="item in attrList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
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
          <el-select v-model="formData.attr" placeholder="请选择广告发布状态">
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
    <q-table :tableHeader="tableHeader" :tableData="tableData" :showOperation="true" @deleteAll="deleteAll"></q-table>
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="1000"
        @current-change="loadPage"
      >
      </el-pagination>
    </div>
  </div>
</template>


<script>
  import qTable from '@/component/table.vue'
  import topFilter from '../../../component/topFilter.vue'
  export default{
    components: {
      qTable,
      topFilter
    },
    data(){
      return {
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
            label: '广告属性',
            prop: 'status'
          },
          {
            label: '发布状态',
            prop: 'status'
          },
          {
            label: '点击量',
            prop: 'viewCount'
          }
        ],
        tableData: [
          {
            title: '奔驰全新宣传片',
            createTime: '2017-11-23 15:23',
            status: '已发布',
            viewCount: '28'
          }
        ],
        operationPublic: [
          {
            label: '查看',
            color: '#20a7fe',
            handle: this.look,
          },
          {
            label: '置顶',
            color: '#07c362',
            handle: this.toTop,
          },
          {
            label: '撤销',
            color: '#f6781d',
            handle: this.stop,
          },
          {
            label: '修改',
            color: '#adadad',
            handle: null,
          },
          {
            label: '删除',
            color: '#adadad',
            handle: null,
          }
        ],
        operationUnPublic: [
          {
            label: '查看',
            color: '#20a7fe',
            handle: this.look,
          },
          {
            label: '置顶',
            color: '#07c362',
            handle: this.toTop,
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
            label: '默认广告'
          },
          {
            value: 1,
            label: '系统推荐广告'
          }],
        formData: {
          attr: '',
          startTime: '',
          endTime: ''
        }
      }
    },
    created(){
      this.tableData[0].operation = this.operationUnPublic
    },
    methods: {
      look(index, item){ // 查看
        console.log('查看')
      },
      edit(index, item){ // 修改
        console.log('修改')
      },
      stop(index, item){ // 撤销
        console.log('撤销')
      },
      delete(index, item){ // 删除
        console.log('删除')
      },
      start(index, item){ // 发布
        console.log('发布')
      },
      toTop(index, item){ // 置顶
        console.log('置顶')
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

      },
      loadPage(currentPage){ // 点击分页器
        console.log(currentPage)
      },
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
