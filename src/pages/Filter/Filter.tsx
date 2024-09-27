/*
 * @Author: yeyu98
 * @Date: 2024-09-12 17:06:38
 * @LastEditors: yeyu98
 * @LastEditTime: 2024-09-27 14:33:18
 * @FilePath: \tick-to-do\src\pages\Filter\Filter.tsx
 * @Description:
 */
import { useEffect, useState } from 'react'
import { Card } from 'antd'
import { getTaskLocal } from '@/utils/localData'
import type { Task } from '@/utils/localData'
import { isCurrentWeek } from '@/utils/dayjs'
import styles from './Filter.module.less'
// 2024年
// 九月
// 按最近的月分类，不同的月份可以切换
// 比如一个月里有四周
// 每周都使用不同的卡片汇总，卡片之上需要标记
interface Props {}

const Filter = (props: Props) => {
  const {} = props
  const [taskList, setTaskList] = useState<Task[]>([])
  const initWeekTask = async () => {
    const localTaskList = await getTaskLocal()
    if (localTaskList && localTaskList?.length > 0) {
      const filterTaskList = localTaskList?.filter(
        (item) => isCurrentWeek(item.timestamp) && item.isFinished,
      )
      setTaskList(filterTaskList)
    }
  }

  useEffect(() => {
    initWeekTask()
  }, [])

  return (
    <>
      <Card title="最近一周" bordered={false} style={{ width: 300 }}>
        {taskList.map((task) => (
          <p className={styles['task-item']} key={task.id}>
            {task.taskContent}
          </p>
        ))}
      </Card>
    </>
  )
}

export default Filter
