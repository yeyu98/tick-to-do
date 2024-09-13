/*
 * @Author: yeyu98
 * @Date: 2024-09-12 16:56:19
 * @LastEditors: yeyu98
 * @LastEditTime: 2024-09-13 23:28:59
 * @FilePath: \tick-to-do\src\pages\Today\Today.tsx
 * @Description:
 */
import { useState } from 'react'
import EmptyData from './components/EmptyData'
import { PlusOutlined } from '@ant-design/icons'
import dayjs, { getWeek } from '@/utils/dayjs'
import ToDoItem from '@/components/ToDoItem/ToDoItem'
import { nanoid } from 'nanoid'
import styles from './Today.module.less'

interface Props {}

interface Task {
  id: string
  timestamp: number
  taskContent: string
}

function Today(props: Props) {
  const [taskList, setTaskList] = useState<Task[]>([])
  const formatDate = () => {
    const timestamp = Date.now()
    const week = getWeek(timestamp)
    const date = dayjs().format('MM月DD日')
    return `${date}·今天·${week}`
  }

  const title = formatDate()

  const addItem = () => {
    const id = nanoid(8)
    const currentTask = {
      id,
      timestamp: Date.now(),
      taskContent: '',
    }
    setTaskList([...taskList, currentTask])
  }

  const handleChange = (id: string, value: string) => {
    console.log('✨✨🥰  ~ newTask ~ taskList--->>>', taskList, id)

    const newTask = taskList.find((item) => item.id === id)
    console.log('✨✨🥰  ~ handleChange ~ newTask--->>>', newTask)
    if (newTask) {
      setTaskList([
        ...taskList,
        {
          ...newTask,
          taskContent: value,
        },
      ])
    }
  }

  const renderTaskList = () => {
    return taskList.map((item) => {
      return (
        <ToDoItem
          className={styles['todo-item']}
          onChange={(value: string) => handleChange(item.id, value)}
          key={item.id}
        />
      )
    })
  }

  return (
    <>
      <h4>{title}</h4>
      <div className={styles['today-container']}>
        {taskList?.length > 0 && renderTaskList()}
        <div className={styles['add-item']} onClick={addItem}>
          <PlusOutlined className={styles['add-item-icon']} />
          <span className={styles['add-item-text']}>添加任务</span>
        </div>
        {taskList?.length > 0 ? null : <EmptyData />}
      </div>
    </>
  )
}

export default Today
