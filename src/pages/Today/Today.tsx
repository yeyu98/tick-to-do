/*
 * @Author: yeyu98
 * @Date: 2024-09-12 16:56:19
 * @LastEditors: yeyu98
 * @LastEditTime: 2024-09-13 10:27:18
 * @FilePath: \tick-to-do\src\pages\Today\Today.tsx
 * @Description:
 */
import React from 'react'
import dayjs, { getWeek } from '@/utils/dayjs'
import ToDoItem from '@/components/ToDoItem/ToDoItem'

interface Props {}

function Today(props: Props) {
  const formatDate = () => {
    const timestamp = Date.now()
    const week = getWeek(timestamp)
    const date = dayjs().format('MM月DD日')
    return `${date}·今天·${week}`
  }

  const title = formatDate()

  return (
    <>
      <h4>{title}</h4>
      <ToDoItem />
    </>
  )
}

export default Today
