/*
 * @Author: yeyu98
 * @Date: 2024-09-12 16:56:19
 * @LastEditors: yeyu98
 * @LastEditTime: 2024-09-26 10:07:59
 * @FilePath: \tick-to-do\src\pages\Today\Today.tsx
 * @Description:
 */
import { useState, useEffect, useCallback } from 'react'
import EmptyData from './components/EmptyData'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import type { DropResult, ResponderProvided } from 'react-beautiful-dnd'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import DragIcon from '@/assets/images/drag.svg'
import dayjs, { getWeek, isToday } from '@/utils/dayjs'
import ToDoItem from '@/components/ToDoItem/ToDoItem'
import { nanoid } from 'nanoid'
import {
  getTaskLocal,
  setTaskLocal,
  deleteTaskLocal,
  swapTaskLocal,
} from '@/utils/localData'
import type { Task } from '@/utils/localData'
import styles from './Today.module.less'

function Today() {
  const [taskList, setTaskList] = useState<Task[]>([])

  const formatDate = useCallback(() => {
    const timestamp = Date.now()
    const week = getWeek(timestamp)
    const date = dayjs().format('MM月DD日')
    return `${date}·今天·${week}`
  }, [])

  const title = formatDate()

  const handleDragEnd = (result: DropResult, provided: ResponderProvided) => {
    console.log('drag end', result, provided)
    const { source, destination } = result
    const _taskList = [...taskList]
    if (destination) {
      const sourceTask = _taskList[source.index]
      const destinationTask = _taskList[destination.index]
      _taskList.splice(source.index, 1)
      _taskList.splice(destination.index, 0, sourceTask)
      swapTaskLocal(sourceTask, destinationTask)
      setTaskList(_taskList)
    }
  }

  const getTaskById = (id: string) => {
    const _taskList = [...taskList]
    const task = _taskList.find((item) => item.id == id)
    return {
      task,
      _taskList,
    }
  }

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
    deleteTaskLocal(id)
  }

  const handleFinish = (id: string, finish: boolean) => {
    const { _taskList, task: current } = getTaskById(id)
    if (current) {
      current.isFinished = finish
      const newTaskList = _taskList.sort(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (a, b) => (b.isFinished as any) - (a.isFinished as any),
      )
      console.log('🥳🥳🥳 ~~ handleFinish ~~ newTaskList--->>>', newTaskList)
      setTaskList(newTaskList)
      setTaskLocal(current)
    }
  }

  const handleBlur = (id: string, value: string) => {
    const { task: current, _taskList } = getTaskById(id)
    if (current) {
      current.taskContent = value
      setTaskList(_taskList)
      setTaskLocal(current)
    }
  }

  const handleChange = (id: string, value: string) => {
    const { task: current, _taskList } = getTaskById(id)
    if (current) {
      current.taskContent = value
      current.timestamp = Date.now()
      setTaskList(_taskList)
    }
  }

  useEffect(() => {
    getTaskLocal().then((list) => {
      const todayList = list?.filter((item) => isToday(item.timestamp)) || []
      setTaskList(todayList)
    })
  }, [])

  const renderTaskList = () => {
    return taskList.map((item, index) => {
      return (
        <Draggable draggableId={`drag-${item.id}`} index={index} key={item.id}>
          {(provided) => {
            return (
              <ToDoItem
                innerRef={provided.innerRef}
                className={styles['todo-item']}
                todoValue={item.taskContent}
                onFinishChange={(finish: boolean) =>
                  handleFinish(item.id, finish)
                }
                isFinished={item.isFinished}
                onChange={(value: string) => handleChange(item.id, value)}
                onBlur={(value: string) => handleBlur(item.id, value)}
                key={item.id}
                prefix={<img className={styles['drag-icon']} src={DragIcon} />}
                suffix={
                  <DeleteOutlined
                    className={styles['delete-icon']}
                    onClick={() => deleteItem(item.id)}
                  />
                }
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              />
            )
          }}
        </Draggable>
      )
    })
  }

  return (
    <>
      <h4>{title}</h4>
      <div className={styles['today-container']}>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => {
              console.log(provided, ':provided', snapshot)
              return (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <div>{taskList?.length > 0 && renderTaskList()}</div>
                  {/* TODO 暂时放置空占位，后续可以考虑copy一份占位 */}
                  {snapshot.isUsingPlaceholder ? (
                    <div>{provided.placeholder}</div>
                  ) : null}
                </div>
              )
            }}
          </Droppable>
        </DragDropContext>
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
