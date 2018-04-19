<template>
  <div class="add-role">
    <div class="return" @click="goBack">返回</div>
    <div class="form">
      <div class="title">添加角色</div>
      <div class="middle">
        <el-form :model="formData" :rules="rules" class="middle-input" ref="form">
          <el-form-item label="角色名称：" prop="name" class="input-item">
            <el-input v-model="formData.name" placeholder="名称为1-20位汉子、字母、数字、特殊字符"></el-input>
          </el-form-item>
          <el-form-item label="权限配置：" prop="type" class="check-wrap">
            <el-tree :data="urlData"
                     show-checkbox
                     default-expand-all
                     :expand-on-click-node="false"
                     @check-change="checkChange"
                     ref="tree"
                     :defaultCheckedKeys="defaultChecked"
                     v-if="showTree"
                     node-key="id"
            >
            </el-tree>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="confirm-btn">
      <div class="q-btn-confirm" @click.stop="submit">确定</div>
      <div class="q-btn-cancel" @click.stop="goBack">取消</div>
    </div>
  </div>
</template>


<script>
  import Api from '@/api/api'
  import {code} from '@/config/config'
  import {mapGetters} from 'vuex'
  export default{
    data(){
      return {
        formData: {
          name: '',
          type: []
        },
        checked: false,
        input: '',
        rules: {
          name: [
            {required: true, message: '请输入角色名称', trigger: 'blur'},
            {min: 1, max: 20, message: '名称为1-20位汉子、字母、数字、特殊字符', trigger: 'blur'}
          ],
          type: [
            {type: 'array', required: true, message: '请至少选择一个权限配置', trigger: 'change'}
          ],
        },
        urlData: [],
        defaultChecked: [],
        showTree: false
      }
    },
    computed: {
      ...mapGetters(['sysAuthUrls'])
    },
    async created(){
      if (this.$route.params.id) {
        await this.getRoleDetail()
      }
      this.urlFormat()
      this.showTree = true
    },
    methods: {
      goBack(){
        this.$router.back()
      },
      submit(){
        this.$refs.form.validate(valid => {
          if (valid) {
            let ids = []
            Api.systemRole.addOrUpdateRole({
              roleName: this.formData.name,
              urls:  this.formData.type,
              id: this.$route.params.id || null
            }).then(data => {
              if (data.code === code.SUCCESS) {
                this.$message.success(this.$route.params.id ? '修改成功' : '添加成功')
                this.$router.back()
              } else {
                this.$message.error(data.mesg)
              }
            })
          }
        })
      },
      urlFormat(){
        let result = []
        let hasParent = []
        let arr = JSON.parse(JSON.stringify(this.sysAuthUrls))
        arr.forEach(item => {
          item.label = item.name
          if (item.parentId !== 0) {
            hasParent.push(item)
            for (let i = 0; i < arr.length; i++) {
              if (item.parentId === arr[i].id) {
                if (arr[i].children) {
                  let flag = false
                  arr[i].children.forEach(child => {
                    if (child.id === item.id) {
                      flag = true
                    }
                  })
                  if (!flag) {
                    arr[i].children.push(item)
                  }
                } else {
                  arr[i].children = [item]
                }
              }
            }
          }
        })
        result = arr.filter((item) => {
          let flag = true
          hasParent.forEach(a => {
            if (a.id === item.id) {
              flag = false
            }
          })
          return flag
        })
        this.urlData = result
      },
      checkChange(a, b, c){
        let nodes = this.$refs.tree.getCheckedNodes()
        let result = []
        nodes.forEach(item => {
          result.push(item.id)
          if (item.parentId !== 0) {
            result.push(item.parentId)
          }
        })
        console.log(this.formData.type)
        this.formData.type = Array.from(new Set(result))
      },
      async getRoleDetail(){
        let data = await Api.systemRole.getRole({id: parseInt(this.$route.params.id)})
        this.defaultChecked = data.data.urlId
        this.formData.name = data.data.roleName
        this.formData.type = data.data.urlId
      }
    }
  }
</script>

<style lang='scss' rel='stylesheet/scss'>
  .add-role {
    padding: 20px;
    .return {
      background: #fe842b;
      color: #ffffff;
      height: 28px;
      width: 56px;
      line-height: 28px;
      text-align: center;
      cursor: pointer;
    }
    .form {
      border: 1px dashed #d9d9d9;
      border-top: none;
      margin-top: 16px;
      .label {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 12px;
        span {
          color: red;
          margin-right: 6px;
        }
      }
      .title {
        background: #f8e8dd;
        color: #ff6c00;
        padding-left: 20px;
        height: 46px;
        line-height: 46px;
      }
      .middle {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 26px;
        border-bottom: 1px dashed #d9d9d9;
        .check-wrap {
          .el-form-item__content {
            flex: 1;
          }
        }
        .middle-input {
          width: 600px;
          margin-top: 36px;
          .input-item {
            display: flex;
            width: 100%;
            .el-form-item__content {
              flex: 1;
            }
          }
          .check-wrap {
            display: flex;
            .el-checkbox-group {
              flex: 1;
              display: flex;
              flex-direction: column;
              .el-checkbox {
                margin-left: 0;
              }
            }
            .el-form-item__error {
              width: 400px;
            }
          }
          .input {
            flex: 1;
          }
        }
        .middle-checkbox {
          display: flex;
          width: 600px;
          margin-top: 26px;
          .label {
            align-items: flex-start;
          }
          .checkbox-group {
            flex: 1;
            display: flex;
            flex-direction: column;
            .box {
              margin: 0 0 20px 0;
            }
          }
        }
        .el-tree {
          .el-tree-node__children {
            margin-left: 30px !important;
          }
          .el-tree-node__content {
            padding: 0 !important;
            margin-bottom: 8px;
            margin-top: 6px;

          }
          .el-tree-node__expand-icon {
            display: none;
          }
          .el-tree-node__children {
            display: flex;
            .el-tree-node {
              flex: 1;
            }
          }
        }
      }
      .bottom {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 26px;
        padding-left: 183px;
        .bottom-item {
          width: 600px;
          display: flex;
          margin-bottom: 26px;
          .box {
            flex: 1;
          }
        }
      }
    }
    .confirm-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 64px;
    }
  }
</style>
