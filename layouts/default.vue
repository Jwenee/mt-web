<template>
  <el-container class="layout-default">
    <el-header height="auto">
      <my-header />
    </el-header>
    <el-main>
      <nuxt />
    </el-main>
    <el-footer height="100%">
      <my-footer />
    </el-footer>
  </el-container>
</template>

<script>
import MyHeader from '@/components/public/header/index.vue'
import MyFooter from '@/components/public/footer/index.vue'
export default {
  components: {
    MyHeader,
    MyFooter
  }
}
</script>

<style lang="scss" scoped>
.el-header,.el-main,.el-footer{
  width: 1190px;
  margin: 0 auto;
  padding: 0;
  overflow: unset;
}

.el-header{
    background: #F8F8F8;
    color: #999;
    width: 100%;
    font-size: 12px;
    .m-header{
        width: 1190px;
        margin: 0 auto;
    }
}

.layout-default{
    -webkit-font-smoothing: antialiased;
    font-family: "-apple-system",
    BlinkMacSystemFont,
    Roboto,
    "Helvetica Neue",
    "MIcrosoft YaHei",
    sans-serif !important;
    background-color: #F8F8F8;
}

</style>
