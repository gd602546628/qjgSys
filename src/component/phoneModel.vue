<template>
  <div v-if="show" class="phone-model" @click.stop="closeModel">
    <div class="box">
      <iframe :src="src" class="my-iframe" frameborder="0" scrolling="auto" width="220" height="398"></iframe>
    </div>
  </div>
</template>
<script>
  export default{
    props: {
      show: {
        type: Boolean,
        default: false
      },
      src: {
        type: String,
        default: ''
      }
    },
    components: {},
    data(){
      return {}
    },
    computed: {},
    created(){
    },
    methods: {
      closeModel(){
        this.$emit('closeModel')
      },
    }
  }
</script>
<style lang='scss' type="text/scss" rel='stylesheet/scss' scoped>
  .phone-model {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    .box {
      width: 256px;
      height: 519px;
      background: url("../assets/image/iPhone-6.png");
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
      overflow: hidden;
      padding-top: 64px;
      display: flex;
      justify-content: center;
      .my-iframe {
      }
    }
  }
</style>
