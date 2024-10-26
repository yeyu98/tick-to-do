/*
 * @Author: yeyu98
 * @Date: 2024-09-12 17:06:38
 * @LastEditors: yeyu98
 * @LastEditTime: 2024-10-26 14:53:50
 * @FilePath: \tick-to-do\src\pages\Filter\Filter.tsx
 * @Description:
 */
import { useEffect, useState } from 'react'
import { Dropdown, Card, Button, Space, DatePicker, message } from 'antd'
import type { MenuProps } from 'antd'
import { DownOutlined, CopyOutlined } from '@ant-design/icons'
import { getTaskLocal } from '@/utils/localData'
import type { Task } from '@/utils/localData'
import dayjs from '@/utils/dayjs'
import { copy } from '@/utils/index'
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
  const [messageApi, contextHolder] = message.useMessage()

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
    setRangeValue(dates)
    const start = dates[0]
    const end = dates[1]
    console.log(
      '🥳🥳🥳 ~~ handleRangePickerChange ~~ dates--->>>',
      dayjs(start).format('DD/MM/YYYY'),
      dayjs(end).format('DD/MM/YYYY'),
    )
    getFilteredTask([start, end])
  }
  const handleCopy = async () => {
    const text = taskList.reduce((prev, next) => {
      return prev + next.taskContent + '\n'
    }, '')
    const success = await copy(text)
    if (success) {
      messageApi.success('复制成功')
    }
  }

  const getFilteredTask = async ([start, end]: RangeDate) => {
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
    console.log(
      '🥳🥳🥳 ~~ handleRangePickerChange ~~ dates--->>>',
      dayjs(start).format('DD/MM/YYYY'),
      dayjs(end).format('DD/MM/YYYY'),
    )
    getFilteredTask([start, end])
  }

  useEffect(() => {
    getTaskByUnitType()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {contextHolder}
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
        <Card
          title="本周"
          bordered={false}
          style={{ width: 300 }}
          extra={
            <CopyOutlined
              onClick={handleCopy}
              className={styles['copy-icon']}
            />
          }
        >
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
