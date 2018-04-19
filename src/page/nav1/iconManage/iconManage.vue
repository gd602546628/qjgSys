<template>
  <div class="icon-manage">
    <div class="title">图标管理</div>
    <div class="btn-group">
      <el-button type="primary" @click="openModel">上传图标</el-button>
      <!--    <el-upload
            class="image-item"
            action=""
            :on-success="imgUploadSuccess"
            :show-file-list="false"
            :data="{type:1}"
          >
          </el-upload>-->
      <el-button type="primary" @click.stop="goEdit">编辑图标</el-button>
    </div>
    <div class="tab">
      <div class="tab-item"
           v-for="(item,index) in tabMap"
           @click.stop="tabClick(index)"
           :class="{active:currentIndex==index}"
      >
        {{item}}
      </div>
    </div>
    <div class="icon-wrap">
      <div class="icon-item" v-for="item in iconList">
        <img :src="addFilePre(item.url)">
        <p>{{item.name}}</p>
      </div>
    </div>
    <common-model title="添加图标" :show="showAddModel" class="add-box" @closeModel="add_cancel">
      <el-form class="add-content" :model="addForm" :rules="rules" ref="form">
        <el-form-item class="add-item" label="图标名称：" prop="name">
          <el-input placeholder="请输入图标名称" v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item class="add-item" label="图标类型：" prop="type">
          <el-select v-model="addForm.type" placeholder="请选择图标类型">
            <el-option
              v-for="(item,index) in tabMap"
              :key="index"
              :label="item"
              :value="index">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="add-item" label="上传图标：" prop="url">
          <div class="upload">
            <el-upload
              class="avatar-uploader"
              :show-file-list="false"
              :action="iconUpload"
              list-type="picture"
              :on-success="uploadSuccess"
              :multiple="false"
            >
              <img v-if="addForm.url" :src="addFilePre(addForm.url)" class="avatar"/>
              <span v-if="!addForm.url" class="el-icon-plus avatar-uploader-icon"></span>
            </el-upload>
          </div>
        </el-form-item>
      </el-form>
      <div class="btn-group">
        <div class="q-btn-confirm" @click="add_confirm">确定</div>
        <div class="q-btn-cancel" @click="add_cancel">取消</div>
      </div>
    </common-model>
  </div>
</template>


<script>
  import Api from '../../../api/api'
  import {code, filePre} from '../../../config/config'
  import commonModel from '../../../component/commonModel.vue'
  import {mapGetters} from 'vuex'
  export default{
    components: {
      commonModel
    },
    computed: {
      ...mapGetters(['iconUpload'])
    },
    data(){
      return {
        currentIndex: 0,
        tabMap: ['文字', '链接', '场景', '图片', '视频'],
        iconList: [],
        showAddModel: false,
        addForm: {
          name: '',
          type: 0,
          url: ''
        },
        rules: {
          name: [{required: true, message: '请输入图标名称', trigger: 'blur'}],
          type: [{required: true, message: '请选择图标类型', trigger: 'blur'}],
          url: [{required: true, message: '请上传图标', trigger: 'blur'}],
        },
      }
    },
    created(){
      this.getList()
    },
    methods: {
      addFilePre(val){
        return filePre + val
      },
      openModel(){
        this.showAddModel = true
      },
      add_confirm(){
        this.$refs.form.validate(async flag => {
          if (flag) {
            let data = await Api.icon.add(this.addForm)
            if (data.code === code.SUCCESS) {
              if (this.addForm.type === this.currentIndex) {
                this.iconList.push(JSON.parse(JSON.stringify(this.addForm)))
              }
              this.add_cancel()
              this.$message.success('添加成功')
            } else {
              this.$message.error(data.mesg)
            }
          }
        })
      },
      add_cancel(){
        this.addForm = {
          name: '',
          type: 0,
          url: ''
        }
        this.showAddModel = false
      },
      uploadSuccess(data){
        this.addForm.url = data.data
      },
      tabClick(index){
        this.currentIndex = index
        this.getList()
      },
      imgUploadSuccess(data){
      },
      goEdit(){
        this.$router.push({name: 'iconEdit'})
      },
      async getList(){
        let data = await Api.icon.getAll({type: this.currentIndex})
        this.iconList = data.data
        console.log(this.iconList)
      }
    }
  }
</script>

<style lang='scss' rel='stylesheet/scss'>
  .icon-manage {
    padding: 20px;
    .title {
      color: #525252;
      margin-bottom: 10px;
    }
    .tab {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 44px;
      background: #f8e8dd;
      .tab-item {
        display: flex;
        justify-content: center;
        width: 68px;
        height: 100%;
        align-items: center;
        color: #333333;
        cursor: pointer;
        font-weight: bold;
        margin-left: 32px;
        &.active {
          color: #fe842b;
          border-bottom: 4px solid #fe842b;
        }
      }
    }
    .btn-group {
      margin-top: 20px;
      margin-bottom: 20px;
      display: flex;
      .el-button {
        margin-right: 10px;
      }
    }
    .icon-wrap {
      display: flex;
      flex-wrap: wrap;
      padding-top: 20px;
      border: 1px dashed #d9d9d9;
      box-sizing: border-box;
      border-top: none;
      .icon-item {
        width: 112px;
        height: 112px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        img {
          width: 42px;
          height: 42px;
        }
        p {
          margin-top: 20px;
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
      }
      .btn-group {
        display: flex;
        justify-content: center;
      }
    }
  }
</style>
