/*
 * @Author: yeyu98
 * @Date: 2024-09-13 10:26:23
 * @LastEditors: yeyu98
 * @LastEditTime: 2024-09-13 23:22:07
 * @FilePath: \tick-to-do\src\components\ToDoItem\TodoItem.tsx
 * @Description:
 */
import { useState } from 'react'
import { Checkbox } from 'antd'
import ContentEditable from './components/ContentEditable'
import classnames from 'classnames'
import styles from './ToDoItem.module.less'

interface Props {
  className?: string
  onChange?: (value: string) => void
}

function TodoItem(props: Props) {
  const { className = '' } = props
  const [disabled, setDisabled] = useState(false)
  const [value, setValue] = useState('a\n')
  const classNames = classnames([styles['todo-item'], className])
  const handleBlur = (value: string) => {
    console.log('🥳🥳🥳 ~~ handleBlur ~~ value--->>>', value)
  }

  const handleChange = (value: string) => {
    setValue(value)
    props.onChange?.(value)
  }

  return (
    <>
      <div className={classNames}>
        <Checkbox
          className={styles.checkbox}
          checked={disabled}
          onChange={() => setDisabled(!disabled)}
        />
        <ContentEditable
          value={value}
          className={styles['todo-item-content']}
          placeholder={'嘿，朋友今天想做些什么呢？'}
          onChange={handleChange}
          disabled={disabled}
          onBlur={handleBlur}
        />
      </div>
    </>
  )
}

export default TodoItem
