/*
 * @Author: yeyu98
 * @Date: 2024-09-24 14:59:15
 * @LastEditors: yeyu98
 * @LastEditTime: 2024-09-25 16:41:32
 * @FilePath: \tick-to-do\src\utils\localData.ts
 * @Description:
 */
import localforage from 'localforage'

export interface Task {
  id: string
  timestamp: number
  taskContent: string
  isFinished: boolean
}

const KEY = 'tick-to-do'

export const getTaskLocal = <T = Task[]>(
  key: string = KEY,
): Promise<T | null> => localforage.getItem(key)

export const deleteTaskLocal = async (id: string) => {
  const _taskList = await getTaskLocal()
  if (_taskList && _taskList?.length > 0) {
    const currentIndex = _taskList.findIndex((item) => item.id == id)
    if (currentIndex !== -1) {
      _taskList.splice(currentIndex, 1)
      localforage.setItem(KEY, _taskList)
    }
  }
}

export const setTaskLocal = async (value: Task, key: string = KEY) => {
  const taskList = await getTaskLocal(key)
  let isChange = false
  if (taskList && taskList?.length > 0) {
    if (Array.isArray(value)) {
      taskList.forEach((item) => {
        value.forEach((subItem) => {
          if (subItem.id == item.id) {
            isChange = true
            item.taskContent = subItem.taskContent
            item.timestamp = subItem.timestamp
            item.isFinished = subItem.isFinished
          }
        })
      })
    } else {
      taskList.forEach((item) => {
        if (item.id == value.id) {
          isChange = true
          item.taskContent = value.taskContent
          item.timestamp = value.timestamp
          item.isFinished = value.isFinished
        }
      })
    }
    if (isChange) {
      localforage.setItem(key, taskList)
    } else {
      taskList.push(value)
      localforage.setItem(key, taskList)
    }
  } else {
    localforage.setItem(key, [value])
  }
}
