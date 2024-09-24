/*
 * @Author: yeyu98
 * @Date: 2024-09-24 14:59:15
 * @LastEditors: yeyu98
 * @LastEditTime: 2024-09-24 15:34:58
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
    isChange && localforage.setItem(key, taskList)
  } else {
    localforage.setItem(key, taskList)
  }
}
