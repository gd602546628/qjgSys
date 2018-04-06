<template>
  <div class="cate-manage">
    <div class="title">分类管理</div>
    <div class="cate-wrap">
      <div class="cate-item" v-for="item in cateList">{{item.name}}</div>
      <div class="cate-item add-cate" @click="addCate">
        <i class="icon-add"></i>
        <p>添加分类</p>
      </div>
    </div>
    <common-model title="添加分类" :show="showAddModel" class="add-box" @closeModel="add_cancel">
      <el-form class="add-content">
        <el-form-item class="add-item" label="分类名称：">
          <el-input placeholder="请输入分类名称"></el-input>
        </el-form-item>
        <div class="tips">注：分类添加后不能删除，请谨慎操作</div>
      </el-form>
      <div class="btn-group">
        <div class="q-btn-confirm" @click="add_confirm">确定</div>
        <div class="q-btn-cancel" @click="add_cancel">取消</div>
      </div>
    </common-model>
  </div>
</template>


<script>
  import commonModel from '../../../component/commonModel.vue'
  export default{
    components: {
      commonModel
    },
    data(){
      return {
        cateList: [
          {name: '住宅'},
          {name: '商业'},
          {name: '旅游'},
          {name: '行政'},
          {name: '住宅'},
          {name: '商业'},
          {name: '旅游'},
          {name: '行政'}
        ],
        addParam: {},
        showAddModel: false,
        isAdd: true, // true添加 false编辑
      }
    },
    methods: {
      addCate(){ // 添加分类
        this.showAddModel = true
      },
      add_confirm(){
      },
      add_cancel(){
        this.showAddModel = false
      }
    }
  }
</script>

<style lang='scss' rel='stylesheet/scss'>
  .cate-manage {
    padding: 20px;
    .title {
      color: #525252;
    }
    .cate-wrap {
      display: flex;
      margin-top: 20px;
      flex-wrap: wrap;
      .cate-item {
        &:nth-child(6n) {
          margin-right: 0;
        }
        background: #20a7fe;
        color: #ffffff;
        margin-right: 1%;
        margin-bottom: 10px;
        width: 15.8%;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 6px;
        cursor: pointer;
      }
      .add-cate {
        background: #ffffff;
        color: #525252;
        border: 1px dashed #000000;
        p {
          margin-left: 4px;
        }
        .icon-add {
          &:before {
            color: #525252;
          }
        }
      }
    }
    .add-box {
      .add-content {
        padding: 20px;
        .add-item {
          display: flex;
          .el-form-item__content {
            flex: 1;
          }
        }
        .tips {
          color: #606266;
          margin-left: 80px;
          font-size: 14px;
        }
      }
      .btn-group {
        display: flex;
        justify-content: center;
      }
    }
  }
</style>
