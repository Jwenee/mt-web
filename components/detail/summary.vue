<template>
  <dl class="m-sum-card">
    <dt>
      <h1>{{ meta.name }}</h1>
      <el-rate
        v-model="rate"
        disabled
      />
      <span>{{ Number(meta.biz_ext.rating) || rate }}分</span>
      <span>人均￥{{ Number(meta.biz_ext.cost) }}</span>
      <ul>
        <li @click="openMap(meta.location)">地址：{{ meta.address }}</li>
        <li>电话：{{ meta.tel }}</li>
      </ul>
    </dt>
    <dd>
      <el-carousel
        height="214px"
        indicator-position="none"
      >
        <el-carousel-item
          v-for="(item,idx) in meta.photos"
          :key="idx"
        >
          <h3>
            <img
              :src="item.url"
              alt="item.title"
              width="100%"
              height="100%"
            >
          </h3>
        </el-carousel-item>
      </el-carousel>
    </dd>
  </dl>
</template>

<script>
export default {
  props: {
    meta: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      sale: 70 + Math.floor(Math.random() * 300)
    }
  },
  computed: {
    rate() {
      return Number(this.meta.biz_ext.rating) || Math.floor(Math.random() * 5)
    }
  },
  methods: {
    openMap(location) {

    }
  }
}
</script>

<style lang="scss" scoped>
.m-sum-card {
  display: flex;
  background: #FFF;
  box-shadow: 0 5px 14px 0 rgba(0, 0, 0, .1);
  border-radius: 10px;
  padding: 20px;
  dt {
    flex: 1;
    padding-bottom: 5px;
    h1 {
      font-size: 26px;
      font-weight: 500;
      color: #222;
    }
    .el-rate {
      display: inline-block;
      .el-rate__icon {
        font-size: 12px;
      }
    }
    >span {
      font-size: 12px;
      margin-right: 10px;
    }
    >ul {
      border-top: 1px solid #E5E5E5;
      list-style: none;
      padding-top: 5px;
      margin-top: 10px;
      li {
        font-size: 14px;
        color: #666;
        padding: 7px 0;
      }
    }
  }
  dd {
    width: 383px;
  }
}
</style>
