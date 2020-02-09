<template>
  <div class="page-order">
    <el-row>
      <el-col :span="4" class="navbar">
        <h3>我的美团</h3>
        <dl>
          <dt>我的订单</dt>
          <dd>全部订单<i class="el-icon-arrow-right" /></dd>
          <dd>待付款<i class="el-icon-arrow-right" /></dd>
          <dd>待使用<i class="el-icon-arrow-right" /></dd>
        </dl>
        <dl>
          <dt>我的收藏</dt>
          <dd>收藏的商家<i class="el-icon-arrow-right" /></dd>
          <dd>收藏的团<i class="el-icon-arrow-right" /></dd>
        </dl>
        <dl>
          <dt>抵用券</dt>
          <dd>可用券<i class="el-icon-arrow-right" /></dd>
          <dd>失效券<i class="el-icon-arrow-right" /></dd>
        </dl>
        <dl>
          <dt>个人信息</dt>
          <dd>账户设置<i class="el-icon-arrow-right" /></dd>
        </dl>
      </el-col>
      <el-col :span="19" class="table">
        <el-tabs
          v-model="activeName"
          @tab-click="handleClick"
        >
          <el-tab-pane label="全部订单" name="all">
            <list :cur="cur" />
          </el-tab-pane>
          <el-tab-pane label="待付款" name="unpay">
            <list :cur="cur" />
          </el-tab-pane>
          <el-tab-pane label="待使用" name="unuse">
            <list :cur="cur" />
          </el-tab-pane>
          <el-tab-pane label="待评价" name="unreplay">
            <list :cur="cur" />
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import List from '@/components/order/list.vue'
export default {
  components: {
    List
  },
  data() {
    return {
      activeName: 'all',
      list: [],
      cur: []
    }
  },
  watch: {
    activeName(val) {
      this.cur = this.list.filter((item) => {
        switch (val) {
          case 'unpay':
            return item.status === 0
          case 'all':
            return true
          default:
            return false
        }
      })
    },
    list() {
      const val = this.name
      this.cur = this.list.filter((item) => {
        // if (val === 'unpay') {
        //   return item.status ===0
        // } else if (val === 'all') {
        //   return true
        // } else {
        //   return false
        // }
        switch (val) {
          case 'unpay':
            return item.status === 0
          case 'all':
            return true
          default:
            return false
        }
      })
    }
  },
  async asyncData(ctx) {
    console.log('order')
    const { status, data: { code, list } } = await ctx.$axios.post('/order/getOrders')
    if (status === 200 && code === 0 && list.length) {
      return {
        list: list.map((item) => {
          return {
            img: item.imgs.length ? item.imgs[0].url : '/logo.png',
            name: item.name,
            count: 1,
            total: item.total,
            status: item.status,
            statusTxt: item.status === 0 ? '待付款' : '已付款'
          }
        }),
        cur: list.map((item) => {
          return {
            img: item.imgs.length ? item.imgs[0].url : '/logo.png',
            name: item.name,
            count: 1,
            total: item.total,
            status: item.status,
            statusTxt: item.status === 0 ? '待付款' : '已付款'
          }
        })
      }
    }
  },
  methods: {
    handleClick(tab) {
      this.activeName = tab.name
    }
  }
}
</script>

<style lang="scss" scoped>
.page-order {
  margin-top: 20px;
  .navbar {
    background: #FFF;
    border: 1px solid #E5E5E5;
    border-radius: 4px;
    box-sizing: border-box;
    padding-bottom: 20px;
    font-size: 16px;
    color: #222;
    padding: 30px 20px 0 30px;
    dd {
      font-size: 14px;
      color: #666;
      margin: 15px 0;
      >i {
        float: right;
        margin-top: 3px;
      }
    }
  }
  .table {
    background-color: #fff;
    margin-left: 10px;
    white-space: nowrap;
    border: 1px solid #E5E5E5;
    border-radius: 4px;
    padding: 20px 20px 0;
    .el-row {
      padding: 20px 0;
      height: 131px;
      border-bottom: 1px solid #E5E5E5;
      &:last-child {
        border: none;
      }
      .el-col {
        height: 90px;
        justify-content: center;
        align-items: center;
        display: flex;
        flex-direction: column;
        &:nth-child(2) {
          align-items: flex-start;
          h4 {
            font-size: 16px;
            color: #222;
            margin: 10px 0 10px 0;
            font-weight: 500;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            max-width: 300px;
          }
        }
      }
    }
  }
}
</style>
