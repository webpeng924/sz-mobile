import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn' // 导入本地化语言
dayjs.locale('zh-cn') // 使用本地化语言
export default {
  timeFilter
}

function timeFilter (time) {
  return dayjs(time).format('YYYY-MM-DD')
}
