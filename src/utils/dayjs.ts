/*
 * @Author: yeyu98
 * @Date: 2024-09-13 09:47:14
 * @LastEditors: yeyu98
 * @LastEditTime: 2024-09-23 09:23:38
 * @FilePath: \tick-to-do\src\utils\dayjs.ts
 * @Description:
 */
import calendar from 'dayjs/plugin/calendar'
import dayjs from 'dayjs'

dayjs.extend(calendar)

export const getWeek = (timestamp: number) => {
  const week = ['日', '一', '二', '三', '四', '五', '六']
  const weekNumber = dayjs(timestamp).day()
  return `星期${week[weekNumber]}`
}

const getMonthDay = (timestamp: number) => dayjs(timestamp).format('YYYY-MM-DD')

export const isToday = (timestamp: number) => {
  const targetMonthDay = getMonthDay(timestamp)
  return dayjs().isSame(targetMonthDay, 'day')
}

export default dayjs
