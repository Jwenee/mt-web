<template>
  <li
    v-if="meta.photos.length"
    class="m-detail-item"
  >
    <dl class="section">
      <dd>
        <img
          :src="meta.photos[0].url"
          :alt="meta.photos[0].title"
        >
      </dd>
      <dd>
        <h4>{{ meta.name }}</h4>
        <p>
          <span v-if="meta.biz_ext && meta.biz_ext.ticket_ordering">剩余：{{ Number(meta.biz_ext.ticket_ordering) }}</span>
          <span v-if="meta.deadline">截止日期：{{ meta.deadline }}</span>
        </p>
        <p>
          <span class="price">{{ Number(meta.biz_ext.cost) }}</span>
          <sub>门店价{{ Number(meta.biz_ext.cost) }}</sub>
        </p>
      </dd>
      <dd>
        <el-button
          type="warning"
          round
          @click="createCart"
        >
        立即抢购
        </el-button>
      </dd>
    </dl>
  </li>
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
  methods: {
    async createCart() {
      const { status, data: { code, id } } = await this.$axios.post('/cart/create', {
        params: {
          id: Math.random().toString().slice(3, 9),
          detail: {
            name: this.meta.name,
            price: this.meta.biz_ext.cost,
            imgs: this.meta.photos
          }
        }
      })
      if (status === 200 && code === 0) {
        window.location.href = `/cart/?id=${id}`
      } else {
        const errmsg = 'createcart err'
        console.log(errmsg)
      }
    }
  }
}
</script>

<style lang="scss">
.m-detail-item{
  .section {
    display: flex;
    padding: 20px 0;
    border-bottom: 1px solid #ddd;
    align-items: center;
    dd {
      &:nth-child(1) {
        img {
          width: 100px;
          height: 100px;
          border-radius: 4px;
        }
        padding-right: 20px;
      }

      &:nth-child(2) {
        flex: 1;
      }
      >h4 {
        vertical-align: middle;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 480px;
        font-size: 16px;
        color: #222;
        font-weight: 500;
        height: 22px;
        line-height: 22px;
        margin-bottom: 4px;
        cursor: pointer;
      }
      >p {
        font-size: 12px;
        color: #666;
        height: 17px;
        line-height: 17px;
        margin-bottom: 22px;
        .price {
          font-size: 30px;
          color: #F60;
          margin-right: 10px;
          &:before {
            content: "￥";
            font-size: 14px;
          }
        }
      }
    }
  }
  li:last-child {
    .section {
      border-bottom: none;
    }
  }
}
</style>
