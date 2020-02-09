<template>
  <div class="page-detail">
    <el-row>
      <el-col :span="24" >
        <crumbs
          :keyword="keyword"
          :type="type"
        />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" >
        <summa :meta="product" />
      </el-col>
    </el-row>
    <el-row class="m-title">
      <el-col :span="24" >
        <h3>团购商家及优惠</h3>
      </el-col>
    </el-row>
    <el-row v-if="canOrder || !login">
      <el-col :span="24" >
        <list v-if="login" :list="list" />
        <div v-else class="deal-need-login">
          <img src="//p0.meituan.net/codeman/56a7d5abcb5ce3d90fc91195e5b5856911194.png" alt="登录查看">
          <span>请登录后查看详细团购优惠</span>
          <el-button type="primary" round>
            <a href="/login">立即登录</a>
          </el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Crumbs from '@/components/detail/crumbs.vue'
import Summa from '@/components/detail/summary.vue'
import List from '@/components/detail/list.vue'
export default {
  components: {
    Crumbs,
    Summa,
    List
  },
  computed: {
    canOrder() {
      return this.list.filter((item) => item.photos.length).length
    }
  },
  async asyncData(ctx) {
    const { keyword, type } = ctx.query
    const { status, data: { product, more: list, login } } = await ctx.$axios.get('/search/products', {
      params: {
        keyword,
        type,
        city: ctx.store.state.geo.position.city
      }
    })
    if (status === 200) {
      return {
        keyword,
        product,
        type,
        list,
        login
      }
    } else {
      return {
        keyword: '',
        product: {},
        type: '',
        list: [],
        login: false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.m-title{
  font-size: 20px;
  font-weight: 700;
  line-height: 26px;
  margin-bottom: 8px;
  margin-top: 40px;
}
.deal-need-login {
  padding: 30px 0;
  margin-bottom: 40px;
  text-align: center;
  background-color: #fff;
  border: 1px solid #e5e5e5;
  >img{
    display: inline-block;
    width: 160px;
    height: 120px;
    border-radius: 4px;
  }
  >span{
    display: block;
    margin: 10px 0 14px;
    color: #666;
    font-size: 16px;
    line-height: 26px;
  }
  >button{
    background-color: #13D1BE;
    border-color: #13D1BE;
    a{
      color: #fff;
    }
  }
}
</style>
