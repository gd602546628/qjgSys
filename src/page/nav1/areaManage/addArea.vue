<template>
  <div class="add-area">
    <common-box title="添加区域">
      <el-form :model="formData" :rules="rules" ref="form" class="form">
        <el-form-item label="区域名称：" prop="name">
          <el-input placeholder="请输入区域名称" v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="所属区域：" prop="provinceName">
          <city-select @selectCity="selectCity"></city-select>
        </el-form-item>
        <el-form-item label="定位：" prop="lattitude">
          <div class="location-btn">
            <el-input placeholder="输入详细地址" v-model="address"></el-input>
            <el-button @click="location">定位</el-button>
          </div>
          <el-input v-model="formData.lattitude" style="width: 200px;" disabled></el-input>
          <el-input v-model="formData.longitude" style="margin-top: 10px; width: 200px;" disabled></el-input>
          <b-map style="width: 100%;height: 400px;margin-top: 10px" ref="bMap" @mapClick="mapClick"></b-map>
        </el-form-item>
      </el-form>
      <div class="confirm-btn">
        <div class="q-btn-confirm" @click.stop="submit">确定</div>
        <div class="q-btn-cancel" @click.stop="goBack">取消</div>
      </div>
    </common-box>
  </div>
</template>
<script>
  import commonBox from '../../../component/commonBox.vue'
  import citySelect from '../../../component/citySelect.vue'
  import BMap from '../../../component/BMap.vue'
  import Api from '../../../api/api'
  import {code} from '../../../config/config'
  export default{
    components: {
      commonBox,
      citySelect,
      BMap
    },
    data(){
      return {
        formData: {
          cityCode: '',
          cityName: '',
          countyCode: '',
          countyName: '',
          lattitude: '',
          longitude: '',
          name: '',
          provinceCode: '',
          provinceName: ''
        },
        address: '',
        rules: {
          name: [
            {required: true, message: '请输入区域名称', trigger: 'blur'},
            {min: 1, max: 20, message: '名称为1-20位汉子、字母、数字、特殊字符', trigger: 'blur'}
          ],
          provinceName: [{required: true, message: '请选择区域', trigger: 'blur'},],
          lattitude: [{required: true, message: '请进行定位', trigger: 'blur'},]
        }
      }
    },
    computed: {},
    created(){
    },
    methods: {
      async selectCity(data){
        this.formData.cityName = data.city.name
        this.formData.cityCode = data.city.id
        this.formData.provinceName = data.province.name
        this.formData.provinceCode = data.province.id
        this.formData.countyName = data.county.name
        this.formData.countyCode = data.county.id
        let point = await this.$refs.bMap.addPointByAddress(data.province.name + data.city.name + data.county.name)
        this.formData.lattitude = point.lat
        this.formData.longitude = point.lng
      },
      async location(){
        let {provinceName, cityName, countyName} = this.formData
        if (!provinceName) {
          this.$message.error('请先选择区域')
          return
        }
        let point = await this.$refs.bMap.addPointByAddress(provinceName + cityName + countyName + this.address)
        console.log(point)
      },
      async mapClick(point){
        this.$refs.bMap.addPoint(point.point)
        this.formData.lattitude = point.point.lat
        this.formData.longitude = point.point.lng
        let address = await this.$refs.bMap.pointToAddress(point.point)
        this.address = address.addressComponents.street + address.addressComponents.streetNumber
      },
      async submit(){
        this.$refs.form.validate(async flag => {
          if (flag) {
            let data = await Api.area.add(this.formData)
            if (data.code === code.SUCCESS) {
              this.$message.success('添加成功')
              this.$router.back()
            } else {
              this.$message.error(data.mesg)
            }
          }
        })
      },
      goBack(){
        this.$router.back()
      }
    }
  }
</script>
<style lang='scss' type="text/scss" rel='stylesheet/scss'>
  .add-area {
    padding: 20px;
    .form {
      padding: 40px;
      .location-btn {
        display: flex;
        .el-input {
          width: 300px;
          margin-right: 10px;
        }
      }
      .el-form-item {
        display: flex;
        .el-form-item__label {
          width: 120px;
        }
        .el-form-item__content {
          flex: 1;
        }
      }
    }
    .confirm-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
    }
  }
</style>
