import Router from 'koa-router'
import axios from './utils/axios'
// import Category from '../dbs/models/category'
const sign = 'abcd'
const router = new Router({
  prefix: '/category'
})

router.get('/crumbs', async (ctx) => {
  const { status, data: { areas, types } } = await axios.get('http://cp-tools.cn/categroy/crumbs', {
    params: {
      city: ctx.query.city.replace('市', '') || '北京',
      sign
    }
  })
  ctx.body = {
    areas: status === 200 ? areas : [],
    types: status === 200 ? types : []
  }
})

export default router
