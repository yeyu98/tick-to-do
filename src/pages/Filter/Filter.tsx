/*
 * @Author: yeyu98
 * @Date: 2024-09-12 17:06:38
 * @LastEditors: yeyu98
 * @LastEditTime: 2024-09-27 15:46:28
 * @FilePath: \tick-to-do\src\pages\Filter\Filter.tsx
 * @Description:
 */
import { useEffect, useState } from 'react'
import { Dropdown, Card, Button, Space, DatePicker } from 'antd'
import type { MenuProps } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { getTaskLocal } from '@/utils/localData'
import type { Task } from '@/utils/localData'
import dayjs, { isCurrentWeek } from '@/utils/dayjs'
import styles from './Filter.module.less'

interface MenuInfo {
  label: string
  key: string
}

const { RangePicker } = DatePicker

const dropdownItems = [
  {
    label: '按周过滤',
    key: 'week',
  },
  {
    label: '按月过滤',
    key: 'month',
  },
  {
    label: '按季过滤',
    key: 'quarter',
  },
  {
    label: '按年过滤',
    key: 'year',
  },
  {
    label: '按日期过滤',
    key: 'date',
  },
]

const Filter = () => {
  const [taskList, setTaskList] = useState<Task[]>([])
  const [menuInfo, setMenuInfo] = useState<MenuInfo>({ ...dropdownItems[0] })

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    const currentMenuInfo = dropdownItems.find((item) => item.key == e.key)
    setMenuInfo(currentMenuInfo!)
  }

  const menuProps = {
    items: dropdownItems,
    onClick: handleMenuClick,
  }

  const handleChange = async (dates) => {
    const start = dates[0].$d
    const end = dates[1].$d
    getFilteredTask(
      (item: Task) => dayjs().isBetween(start, end) && item.isFinished,
    )
  }

  const getFilteredTask = async (filterCallback: any) => {
    const localTaskList = await getTaskLocal()
    if (localTaskList && localTaskList?.length > 0) {
      const filterTaskList = localTaskList?.filter(filterCallback)
      setTaskList(filterTaskList)
    }
  }

  useEffect(() => {
    getFilteredTask(
      (item: Task) => isCurrentWeek(item.timestamp) && item.isFinished,
    )
  }, [])

  return (
    <>
      <div className={styles['filter-container']}>
        <div className="filter-wrapper">
          <Dropdown menu={menuProps}>
            <Button>
              <Space>
                {menuInfo.label}
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
          <RangePicker picker={menuInfo.key} onChange={handleChange} />
        </div>
        <Card title="本周" bordered={false} style={{ width: 300 }}>
          {taskList.map((task) => (
            <div className={styles['task-item']} key={task.id}>
              {task.taskContent}
            </div>
          ))}
        </Card>
      </div>
    </>
  )
}

export default Filter
