/*
 * @Author: yeyu98
 * @Date: 2024-09-13 10:26:23
 * @LastEditors: yeyu98
 * @LastEditTime: 2024-09-13 15:00:16
 * @FilePath: \tick-to-do\src\components\ToDoItem\TodoItem.tsx
 * @Description:
 */
import { useState } from 'react'
import { Checkbox } from 'antd'
import ContentEditable from './components/ContentEditable'
import styles from './ToDoItem.module.less'

interface Props {}

function TodoItem() {
  const [disabled, setDisabled] = useState(false)
  const handleBlur = (value: string) => {
    console.log('🥳🥳🥳 ~~ handleBlur ~~ value--->>>', value)
  }
  return (
    <>
      <div className={styles['todo-item']}>
        <Checkbox
          className={styles.checkbox}
          checked={disabled}
          onChange={() => setDisabled(!disabled)}
        />
        <ContentEditable
          value={''}
          className={styles['todo-item-content']}
          placeholder={'请输入'}
          disabled={disabled} // true
          onBlur={handleBlur}
        />
      </div>
    </>
  )
}

export default TodoItem
