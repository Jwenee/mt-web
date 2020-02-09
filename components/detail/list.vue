<template>
  <div class="m-detail-list">
    <ul>
      <li>{{ list.filter(item => item.photos.length).length }}款套餐</li>
      <item
        v-for="(item, idx) in list"
        :key="idx"
        :meta="item"
      />
    </ul>
  </div>
</template>

<script>
import Item from './item.vue'
export default {
  components: {
    Item
  },
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.m-detail-list {
  margin-top: 34px;
  h3{
    margin: 8px 0;
  }
  ul {
    list-style: none;
    background-color: #fff;
    padding: 20px 20px 0;
    margin-bottom: 10px;
    border-radius: 4px;
    border: 1px solid #E5E5E5;
  }
}
</style>
