<template>
  <div class="page-changeCity">
    <el-row>
      <el-col :span="24">
        <city-select />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <city-hot />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <category />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import CitySelect from '@/components/changeCity/iselect.vue'
import CityHot from '@/components/changeCity/hot.vue'
import Category from '@/components/changeCity/category.vue'
export default {
  components: {
    CitySelect,
    CityHot,
    Category
  }
}
</script>

<style lang="scss" scoped>
.page-changeCity{
  width: 1190px;
  box-sizing: border-box;
  margin: 20px auto 0;
  background-color: #fff;
  border: 1px solid #E5E5E5;
  border-radius: 4px;
  min-height: 1000px;
  padding: 20px;
  .el-row {
    padding-bottom: 20px;
    &:after{
      content: ' ';
      height: 1px;
      width: 100%;
      border-bottom: 1px solid #E5E5E5;
      padding-top: 20px;
    }
  }
}
</style>
