<template>
  <div class="cate-manage">
    <div class="title">分类管理</div>
    <div class="cate-wrap">
      <div class="cate-item" v-for="item in cateList" @click="editCate(item)">
        <img :src="addFilePre(item.image)">
        <p>{{item.name}}</p>
      </div>
      <div class="cate-item add-cate" @click="addCate">
        <i class="icon-add"></i>
        <p>添加分类</p>
      </div>
    </div>
    <common-model title="添加分类" :show="showAddModel" class="add-box" @closeModel="add_cancel">
      <el-form class="add-content" :model="addForm" :rules="rules" ref="form">
        <el-form-item class="add-item" label="分类名称：" prop="name">
          <el-input placeholder="请输入分类名称" v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item class="add-item" label="分类图片：" prop="image">
          <div class="upload">
            <el-upload
              class="avatar-uploader"
              :show-file-list="false"
              :action="cateUpload"
              list-type="picture"
              :on-success="uploadSuccess"
              :multiple="false"
            >
              <img v-if="addForm.image" :src="addFilePre(addForm.image)" class="avatar"/>
              <span v-if="!addForm.image" class="el-icon-plus avatar-uploader-icon"></span>
            </el-upload>
          </div>
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
  import Api from '../../../api/api'
  import {filePre, code} from '../../../config/config'
  import {mapGetters} from 'vuex'
  export default{
    components: {
      commonModel
    },
    data(){
      return {
        cateList: [],
        addForm: {
          image: '',
          name: ''
        },
        showAddModel: false,
        isAdd: true, // true添加 false编辑
        rules: {
          name: [{required: true, message: '请输入分类名称', trigger: 'blur'}],
          image: [{required: true, message: '请上传分类图片', trigger: 'blur'}],
        }
      }
    },
    computed: {
      ...mapGetters(['cateUpload'])
    },
    created(){
      this.getList()
    },
    methods: {
      uploadSuccess(data){
        this.addForm.image = data.data
      },
      addFilePre(val){
        return filePre + val
      },
      addCate(){ // 添加分类
        this.showAddModel = true
      },
      editCate(item){
        this.isAdd = false
        this.addForm = item
        this.showAddModel = true
      },
      add_confirm(){
        this.$refs.form.validate(async flag => {
          if (flag) {
            let data = null
            if (this.isAdd) {
              data = await Api.cate.add(this.addForm)
            } else {
              data = await Api.cate.update(this.addForm)
            }
            if (data.code === code.SUCCESS) {
              this.getList()
              this.$message.success(this.isAdd ? '添加成功' : '修改成功')
              this.add_cancel()
            } else {
              this.$message.error(data.mesg)
            }
          }
        })
      },
      add_cancel(){
        this.isAdd = true
        this.showAddModel = false
        this.addForm = {
          image: '',
          name: ''
        }
      },
      async getList(){
        let data = await Api.cate.getList()
        this.cateList = data.data
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
        img {
          height: 26px;
          width: 26px;
        }
        p {
          margin-left: 10px
        }
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
      .upload {
        display: flex;
        .label {
          width: 100px;
          text-align: right;
          vertical-align: middle;
          float: left;
          font-size: 14px;
          color: #606266;
          line-height: 40px;
          padding: 0 12px 0 0;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
        }
        .avatar-uploader {
          .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
          }
          .el-upload:hover {
            border-color: #409EFF;
          }
          .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 100px;
            height: 100px;
            line-height: 100px;
            text-align: center;
          }
          .avatar {
            width: 100px;
            height: 100px;
            display: block;
          }
        }
      }
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
