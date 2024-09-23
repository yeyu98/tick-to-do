/*
 * @Author: yeyu98
 * @Date: 2024-09-12 16:56:19
 * @LastEditors: yeyu98
 * @LastEditTime: 2024-09-23 09:25:46
 * @FilePath: \tick-to-do\src\pages\Today\Today.tsx
 * @Description:
 */
import { useState, useEffect } from 'react'
import EmptyData from './components/EmptyData'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import dayjs, { getWeek, isToday } from '@/utils/dayjs'
import ToDoItem from '@/components/ToDoItem/ToDoItem'
import { nanoid } from 'nanoid'
import localforage from 'localforage'
import styles from './Today.module.less'

interface Props {}

interface Task {
  id: string
  timestamp: number
  taskContent: string
  isFinished: boolean
}

const KEY = 'tick-to-do'

function Today(props: Props) {
  const defaultList = [
    {
      id: 1,
      timestamp: Date.now(),
      taskContent: '123',
      isFinished: false,
    },
    {
      id: 2,
      timestamp: Date.now(),
      taskContent: '456',
      isFinished: false,
    },
    {
      id: 3,
      timestamp: Date.now(),
      taskContent: '789',
      isFinished: false,
    },
  ]
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
      isFinished: false,
    }
    setTaskList([...taskList, currentTask])
  }

  const deleteItem = (id: string) => {
    const _taskList = [...taskList]
    const currentIndex = taskList.findIndex((item) => item.id == id)
    _taskList.splice(currentIndex, 1)
    setTaskList(_taskList)
  }

  const handleFinish = (id: string, finish: boolean) => {
    const _taskList = [...taskList]
    const current = _taskList.find((item) => item.id == id)
    if (current) {
      current.isFinished = finish
    }
    const newTaskList = _taskList.sort(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (a, b) => (b.isFinished as any) - (a.isFinished as any),
    )
    setTaskList(newTaskList)
  }

  const handleBlur = (id: string, value: string) => {
    const _taskList = [...taskList]
    const current = _taskList.find((item) => item.id == id)
    if (current) {
      current.taskContent = value
      setTaskList(_taskList)
      localforage.setItem(KEY, _taskList)
    }
  }

  const handleChange = (id: string, value: string) => {
    let isExits = false
    const _taskList = [...taskList]
    _taskList.forEach((task) => {
      if (task.id === id) {
        task.taskContent = value
        task.timestamp = Date.now()
        isExits = true
      }
    })
    if (isExits) {
      setTaskList(_taskList)
    }
  }

  useEffect(() => {
    localforage.getItem<Task[]>(KEY).then((list) => {
      const todayList = list?.filter((item) => isToday(item.timestamp)) || []
      setTaskList(todayList)
    })
  }, [])

  const renderTaskList = () => {
    return taskList.map((item) => {
      return (
        <ToDoItem
          className={styles['todo-item']}
          todoValue={item.taskContent}
          onFinishChange={(finish: boolean) => handleFinish(item.id, finish)}
          onChange={(value: string) => handleChange(item.id, value)}
          onBlur={(value: string) => handleBlur(item.id, value)}
          key={item.id}
          suffix={
            <DeleteOutlined
              className={styles['delete-icon']}
              onClick={() => deleteItem(item.id)}
            />
          }
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
