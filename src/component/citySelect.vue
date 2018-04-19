<template>
  <el-cascader
    placeholder="试试搜索：玉溪"
    expand-trigger="hover"
    :options="cityInfo"
    v-model="bindArea"
    :props="cityInfoProp"
    @change="selectCity"
    filterable
  >
  </el-cascader>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default{
    props: {
      level: {
        type: Number,
        default: 3
      },
      area: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    computed: {
      ...mapGetters(['q_cityInfo']),
    },
    created(){
      this.getCityInfoByLevel()
      this.bindArea = JSON.parse(JSON.stringify(this.area))
      console.log(this.bindArea)
    },
    data(){
      return {
        cityInfoProp: {
          label: 'name',
          value: 'id',
          children: 'nextArea'
        },
        cityInfo: [],
        bindArea: []
      }
    },
    methods: {
      getCityObjById(id){ // 更具id获取城市对象
        let result = null
        let step = function (item) {
          if (item.id === id) {
            result = item
            return
          }
          if (item.nextArea && item.nextArea.length > 0) {
            item.nextArea.forEach(innerItem => {
              step(innerItem)
            })
          }
        }
        this.q_cityInfo.forEach(item => {
          step(item)
        })
        return JSON.parse(JSON.stringify(result))
      },
      selectCity(val){
        let data = {
          province: this.getCityObjById(val[0]),
          city: this.getCityObjById(val[1]),
          county: this.getCityObjById(val[2]),
        }
        console.log(this.bindArea)
        this.$emit('selectCity', data)
      },
      getCityInfoByLevel(){
        this.cityInfo = JSON.parse(JSON.stringify(this.q_cityInfo))
        let step = (item) => {
          if (item.levelType === this.level) {
            delete item.nextArea
            //item.nextArea = null
          } else {
            item.nextArea.forEach((child) => {
              step(child)
            })
          }
        }
        this.cityInfo.forEach(item => {
          step(item)
        })
      }
    }
  }
</script>

<style lang='scss' rel='stylesheet/scss' scoped></style>
