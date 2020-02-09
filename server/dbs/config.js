const config = {
  dbs: 'mongodb://127.0.0.1:27017/student',
  redis: {
    get host() {
      return '127.0.0.1'
    },
    get port() {
      return 6379
    }
  },
  smtp: {
    get host() {
      return 'smtp服务'
    },
    get user() {
      return 'smtp账号'
    },
    get pass() {
      return 'smtp秘钥'
    },
    get code() {
      // 返回函数使每次调用生成不同
      return () => {
        return Math.random().toString(16).slice(2, 6).toUpperCase()
      }
    },
    get expire() {
      return () => {
        return new Date().getTime() + 60 * 60 * 1000
      }
    }
  }
}

export default config
