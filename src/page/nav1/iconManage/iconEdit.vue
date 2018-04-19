<template>
  <div class="icon-manage">
    <div class="title">图标管理</div>
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
      <div class="icon-item" v-for="item in iconList" :class="{active:item.selected}" @click="select(item)">
        <img :src="addFilePre(item.url)">
        <p>{{item.name}}</p>
      </div>
    </div>
    <div class="btn-group">
      <el-button type="primary" @click="confirm">删除</el-button>
      <el-button @click="cancel">取消</el-button>
    </div>
  </div>
</template>
<script>
  import Api from '../../../api/api'
  import {code, filePre} from '../../../config/config'
  export default{
    data(){
      return {
        currentIndex: 0,
        tabMap: ['文字', '链接', '场景', '图片', '视频'],
        iconList: [],
      }
    },
    created(){
      this.getList()
    },
    methods: {
      addFilePre(val){
        return filePre + val
      },
      tabClick(index){
        this.currentIndex = index
        this.getList()
      },
      async getList(){
        let data = await Api.icon.getAll({type: this.currentIndex})
        data.data.forEach(item => {
          item.selected = false
        })
        this.iconList = data.data
      },
      select(item){
        item.selected = !item.selected
      },
      async confirm(){
        let ids = []
        let left = []
        this.iconList.forEach((item, index) => {
          if (item.selected) {
            ids.push(item.id)
          } else {
            left.push(item)
          }
        })
        let data = await Api.icon.deleteById({
          ids
        })
        if (data.code === code.SUCCESS) {
          this.iconList = left
          this.$message.success('删除成功')
        } else {
          this.$message.error(data.mesg)
        }
      },
      cancel(){
        this.$router.back()
      }
    }
  }
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
  .icon-manage {
    padding: 20px;
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
    .title {
      color: #525252;
      margin-bottom: 20px;
    }
    .btn-group {
      margin-top: 20px;
      display: flex;
      justify-content: center;
      .el-button {
        margin-right: 10px;
        width: 100px;
      }
    }
    .icon-wrap {
      display: flex;
      flex-wrap: wrap;
      border: 1px dashed #d9d9d9;
      padding: 20px;
      border-top: none;
      .icon-item {
        width: 112px;
        height: 112px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 10px;
        border-radius: 6px;
        flex-direction: column;
        p {
          margin-top: 10px;
        }
        &.active {
          background: #dedede;
        }
        img {
          width: 42px;
          height: 42px;
        }
      }
    }
  }
</style>
