<template>
  <div class="add-advertise-page">
    <common-box title="添加广告">
      <div class="form">
        <el-form :model="formData" :rules="rules" ref="form">
          <el-form-item label="标题：" prop="title">
            <el-input v-model="formData.title" placeholder="请输入文章标题"></el-input>
          </el-form-item>
          <!-- <el-form-item label="广告属性：" prop="attr">
             <el-select v-model="formData.attr" placeholder="请选择广告属性">
               <el-option
                 v-for="item in attrList"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value">
               </el-option>
             </el-select>
           </el-form-item>-->
          <el-form-item label="广告图片：" prop="image">
            <div class="upload">
              <el-upload
                class="avatar-uploader"
                :show-file-list="false"
                :action="advertUpload"
                list-type="picture"
                :on-success="uploadSuccess"
                :multiple="false"
              >
                <img v-if="formData.image" :src="addFilePre(formData.image)" class="avatar"/>
                <span v-if="!formData.image" class="el-icon-plus avatar-uploader-icon"></span>
              </el-upload>
            </div>
          </el-form-item>
          <el-form-item label="广告区域：" prop="provinceName">
            <city-select @selectCity="selectCity" :level="2" :area="area"></city-select>
          </el-form-item>
          <el-form-item label="内容来源：" prop="link">
            <el-radio-group v-model="isLink">
              <el-radio :label="0">内部文章</el-radio>
              <el-radio :label="1">外部url</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="外部链接：" prop="url" v-if="isLink===1">
            <el-input v-model="formData.url" placeholder="请输入链接地址"></el-input>
          </el-form-item>
          <el-form-item label="文章内容：" v-if="isLink===0" prop="content">
            <quill-editor v-model="formData.content"
                          ref="myQuillEditor"
                          :options="editorOption"
            >
            </quill-editor>
            <el-upload :show-file-list="false"
                       :action="advertUpload"
                       list-type="picture"
                       :on-success="boxUploadSuccess"
                       :multiple="false"
                       ref="boxUpload"
            >
              <div ref="uploadButton"></div>
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
    </common-box>
    <div class="btn-group">
      <div class="q-btn-confirm" @click="confirm">确定</div>
      <div class="q-btn-cancel" @click="cancel">取消</div>
    </div>
  </div>
</template>
<script>
  import commonBox from '@/component/commonBox.vue'
  import citySelect from '../../../component/citySelect.vue'
  import {mapGetters} from 'vuex'
  import {filePre, code} from '../../../config/config'
  import Api from '../../../api/api'
  export default{
    components: {
      commonBox,
      citySelect
    },
    computed: {
      ...mapGetters(['advertUpload']),
      editor() {
        return this.$refs.myQuillEditor.quill;
      }
    },
    data(){
      return {
        isLink: 0,
        formData: {
          cityCode: '',
          cityName: '',
          content: '',
          image: '',
          provinceCode: '',
          provinceName: '',
          title: '',
          url: ''
        },
        rules: {
          title: [{required: true, message: '请输入标题', trigger: 'blur'},
            {min: 1, max: 20, message: '标题为1-20位汉子、字母、数字、特殊字符', trigger: 'blur'}],
          url: [{required: true, message: '请输入外部链接', trigger: 'blur'}],
          image: [{required: true, message: '请上传广告图片', trigger: 'blur'}],
          content: [{required: true, message: '请输入文章内容', trigger: 'blur'}],
          provinceName: [{required: true, message: '请选择区域', trigger: 'blur'}]
        },
        imageUrl: '',
        attrList: [
          {
            value: 0,
            label: '默认广告'
          },
          {
            value: 1,
            label: '系统推荐广告'
          }],
        editorOption: {},
        area: []
      }
    },
    created(){
      if (this.$route.params.id) {
        this.getDetail()
      }
    },
    mounted(){
      // 重写图片上传方法
      this.$refs.myQuillEditor.quill.getModule('toolbar').addHandler('image', this.imgHandler)
    },
    methods: {
      addFilePre(val){
        return filePre + val
      },
      uploadSuccess(data){
        this.formData.image = data.data
        this.imageUrl = filePre + data.data
      },
      confirm(){
        this.$refs.form.validate(async flag => {
          if (flag) {
            if (this.isLink === 0) { // 内部文章
              this.formData.url = null
            } else {
              this.formData.content = null
            }
            let data = null
            if (this.$route.params.id) {
              data = await Api.advert.update(this.formData)
            } else {
              data = await Api.advert.add(this.formData)
            }
            if (data.code === code.SUCCESS) {
              this.$message.success(this.$route.params.id ? '更新成功' : '添加成功')
              this.$router.back()
            } else {
              this.$message.error(data.mesg)
            }
          }
        })
      },
      cancel(){
        this.$router.back()
      },
      selectCity(data){
        this.formData.cityName = data.city.name
        this.formData.cityCode = data.city.id
        this.formData.provinceName = data.province.name
        this.formData.provinceCode = data.province.id
      },
      async getDetail(){
        let data = await Api.advert.getById({
          id: parseInt(this.$route.params.id)
        })
        if (data.data.url) {
          this.isLink = 1
        } else {
          this.isLink = 0
        }
        this.area = [data.data.provinceCode, data.data.cityCode]
        this.formData = data.data
      },
      imgHandler(){
        this.$refs.uploadButton.click()
      },
      boxUploadSuccess(data){ // 富文本框图片上传成功
        console.log(data)
        this.editor.focus()
        this.editor.insertEmbed(this.editor.getSelection().index, 'image', filePre + data.data);
      },
    }
  }
</script>

<style lang='scss' rel='stylesheet/scss'>
  .add-advertise-page {
    padding: 20px;
    .form {
      display: flex;
      justify-content: center;
      margin-top: 20px;
      .el-form-item {
        display: flex;
        .el-form-item__content {
          width: 720px;
        }
        .el-form-item__label {
          width: 100px;
        }
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
            width: 178px;
            height: 178px;
            line-height: 178px;
            text-align: center;
          }
          .avatar {
            width: 178px;
            height: 178px;
            display: block;
          }
        }
      }
    }
    .btn-group {
      display: flex;
      justify-content: center;
      padding-top: 30px;
    }
  }
</style>
