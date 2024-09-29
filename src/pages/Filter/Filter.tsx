/*
 * @Author: yeyu98
 * @Date: 2024-09-12 17:06:38
 * @LastEditors: yeyu98
 * @LastEditTime: 2024-09-29 17:59:35
 * @FilePath: \tick-to-do\src\pages\Filter\Filter.tsx
 * @Description:
 */
import { useEffect, useState } from 'react'
import { Dropdown, Card, Button, Space, DatePicker } from 'antd'
import type { MenuProps } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { getTaskLocal } from '@/utils/localData'
import type { Task } from '@/utils/localData'
import dayjs from '@/utils/dayjs'
import type { Dayjs } from 'dayjs'
import styles from './Filter.module.less'

interface MenuInfo {
  label: string
  key: string
}

type RangeDate = [start: Dayjs, end: Dayjs]

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

const defaultRange: RangeDate = [dayjs(), dayjs()]

const Filter = () => {
  const [taskList, setTaskList] = useState<Task[]>([])
  const [menuInfo, setMenuInfo] = useState<MenuInfo>({ ...dropdownItems[0] })
  const [rangeValue, setRangeValue] = useState<RangeDate>([...defaultRange])

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    const currentMenuInfo = dropdownItems.find((item) => item.key == e.key)
    getTaskByUnitType(currentMenuInfo!.key)
    setMenuInfo(currentMenuInfo!)
  }

  const menuProps = {
    items: dropdownItems,
    onClick: handleMenuClick,
  }

  const handleRangePickerChange = async (dates: any) => {
    console.log('🥳🥳🥳 ~~ handleRangePickerChange ~~ dates--->>>', dates)
    setRangeValue(dates)
    const start = dates[0]
    const end = dates[1]
    // getFilteredTask(
    //   (item: Task) => dayjs().isBetween(start, end) && item.isFinished,
    // )
  }

  const getFilteredTask = async ([start, end]: RangeDate) => {
    console.log('🥳🥳🥳 ~~ getFilteredTask ~~ start--->>>', start, end)
    const localTaskList = await getTaskLocal()
    if (localTaskList && localTaskList?.length > 0) {
      const filterTaskList = localTaskList?.filter(
        (item: Task) => dayjs().isBetween(start, end) && item.isFinished,
      )
      console.log('filterTaskList', filterTaskList)
      setTaskList(filterTaskList)
    }
  }

  const getTaskByUnitType = (unitType: any = 'week') => {
    console.log('🥳🥳🥳 ~~ getTaskByUnitType ~~ unitType--->>>', unitType)
    const start = dayjs().startOf(unitType)
    const end = dayjs().endOf(unitType)
    getFilteredTask([start, end])
  }

  useEffect(() => {
    getTaskByUnitType()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className={styles['filter-container']}>
        <div className={styles['filter-wrapper']}>
          <Dropdown menu={menuProps}>
            <Button>
              <Space>
                {menuInfo.label}
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
          <RangePicker
            picker={menuInfo.key}
            value={rangeValue}
            onChange={handleRangePickerChange}
          />
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
