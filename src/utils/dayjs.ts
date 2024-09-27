/*
 * @Author: yeyu98
 * @Date: 2024-09-13 09:47:14
 * @LastEditors: yeyu98
 * @LastEditTime: 2024-09-25 16:06:55
 * @FilePath: \tick-to-do\src\utils\dayjs.ts
 * @Description:
 */
import calendar from 'dayjs/plugin/calendar'
import duration from 'dayjs/plugin/duration'
import isBetween from 'dayjs/plugin/isBetween'
import dayjs from 'dayjs'

const plugins = [calendar, duration, isBetween]

plugins.forEach((plugin) => dayjs.extend(plugin))

// https://www.cnblogs.com/Airon-wei/p/14362160.html

// 获取今天是星期几
export const getWeek = (timestamp: number) => {
  const week = ['日', '一', '二', '三', '四', '五', '六']
  const weekNumber = dayjs(timestamp).day()
  return `星期${week[weekNumber]}`
}

// 时间戳转年月日
const getMonthDay = (timestamp: number) => dayjs(timestamp).format('YYYY-MM-DD')

// 获取当前周时间范围
export const getCurrentWeekScope = (
  date?: number | string,
  formatStr = 'YYYY-MM-DD',
) => {
  const start = dayjs(date).startOf('week').add(1, 'day').format(formatStr)
  const end = dayjs(date).endOf('week').add(1, 'day').format(formatStr)
  return {
    start,
    end,
  }
}

export const isCurrentWeek = (
  date?: number | string,
  targetDate?: number | string,
) => {
  const weekScope = getCurrentWeekScope(targetDate)
  return dayjs(date).isBetween(weekScope.start, weekScope.end)
}

export const isToday = (timestamp: number) => {
  const targetMonthDay = getMonthDay(timestamp)
  return dayjs().isSame(targetMonthDay, 'day')
}

export default dayjs
