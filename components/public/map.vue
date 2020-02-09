<template>
  <div
    :id="mapid"
    :style="{ width: width+'px',height: height+'px',margin: '34px auto' }"
    class="m-map"
  >
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: Number,
      default: 300
    },
    height: {
      type: Number,
      default: 300
    },
    point: {
      type: Array,
      default() {
        return [116.46, 39.92]
      }
    }
  },
  data() {
    return {
      mapid: `map`,
      key: 'a223d7e7e13a9e75a3047dbaf0ad278c'
    }
  },
  watch: {
    point(val, old) {
      this.map.setCenter(val)
      this.marker.setPosition(val)
    }
  },
  mounted() {
    this.mapid = `map${Math.random().toString().slice(4, 6)}`

    window.onmaploaded = () => {
      const map = new window.AMap.Map(this.mapid, {
        resizeEnable: true,
        zoom: 11,
        center: this.point
      })
      this.map = map
      window.AMap.plugin('AMap.ToolBar', () => {
        const toolbar = new window.AMap.ToolBar()
        map.addControl(toolbar)
        const marker = new window.AMap.Marker({
          icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
          position: this.point
        })
        this.marker = marker
        marker.setMap(map)
      })
    }
    const url = `https://webapi.amap.com/maps?v=1.4.15&key=${this.key}&callback=onmaploaded`
    const jsapi = document.createElement('script')
    jsapi.charset = 'utf-8'
    jsapi.src = url
    document.head.appendChild(jsapi)
  }
}
</script>

<style lang="scss" scoped>

</style>
