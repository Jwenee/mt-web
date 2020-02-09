<template>
  <div class="m-iselect">
    <span class="name">按省份选择:</span>
    <el-select
      v-model="pvalue"
      placeholder="省份"
    >
      <el-option
        v-for="item in province"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-select
      v-model="cvalue"
      placeholder="城市"
      :disabled="!city.length"
    >
      <el-option
        v-for="item in city"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <span class="name">直接搜索:</span>
    <el-autocomplete
      v-model="input"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入城市中文或拼音"
      @select="handleSelect"
    >
    </el-autocomplete>
  </div>
</template>

<script>
export default {
  data() {
    return {
      province: [],
      pvalue: '',
      city: [],
      cvalue: '',
      input: '',
      cities: []
    }
  },
  watch: {
    async pvalue(newPvalue) {
      const { status, data: { city } } = await this.$axios.get(`/geo/province/${newPvalue}`)
      if (status === 200) {
        this.city = city.map((item) => {
          return {
            value: item.id,
            label: item.name
          }
        })
        this.cvalue = ''
      }
    }
  },
  async mounted() {
    const { status, data: { province } } = await this.$axios.get('/geo/province')
    if (status === 200) {
      this.province = province.map((item) => {
        return {
          value: item.id,
          label: item.name
        }
      })
    }
  },
  methods: {
    async querySearchAsync(query, cb) {
      if (this.cities.length) {
        cb(this.cities.filter((item) => item.value.includes(query)))
      } else {
        const { status, data: { city } } = await this.$axios.get('/geo/city')
        if (status === 200) {
          this.cities = city.map((item) => {
            return { value: item.name }
          })
          cb(this.cities.filter((item) => item.value.includes(query)))
        } else {
          // cb([])
        }
      }
    },
    handleSelect(item) {
      alert(item.value)
    }
  }
}
</script>

<style lang="scss" scoped>
  .m-iselect {
    .province {
      cursor: pointer;
      border-radius: 4px;
      margin: 0 10px 0 20px;
    }
    .city {
      cursor: not-allowed;
      border-radius: 4px;
      margin: 0 20px 0 10px;
    }
    .label {
      margin-left: 40px;
    }
    .input {
      width: 220px;
      height: 40px;
      border-radius: 4px;
      margin-left: 10px;
      font-size: 14px;
      color: #666;
      box-sizing: border-box;
    }
  }
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
</style>
