/*
 * @Author: yeyu98
 * @Date: 2024-09-13 10:26:23
 * @LastEditors: yeyu98
 * @LastEditTime: 2024-09-14 10:46:21
 * @FilePath: \tick-to-do\src\components\ToDoItem\ToDoItem.tsx
 * @Description:
 */
import { useEffect, useState, useRef, ReactNode } from 'react'
import { Checkbox } from 'antd'
import ContentEditable from './components/ContentEditable'
import classnames from 'classnames'
import styles from './ToDoItem.module.less'

interface Props {
  todoValue?: string
  className?: string
  onChange?: (value: string) => void
  onFinishChange?: (finish: boolean) => void
  suffix?: ReactNode
}

function TodoItem(props: Props) {
  const { className = '', todoValue = '' } = props
  const [disabled, setDisabled] = useState(false)
  const [value, setValue] = useState('')
  const preTodoValue = useRef(todoValue)
  const classNames = classnames([styles['todo-item'], className])
  const handleBlur = (value: string) => {
    console.log('🥳🥳🥳 ~~ handleBlur ~~ value--->>>', value)
  }

  const handleFocus = (e: any) => {
    console.log('👀👀👀 ~~ handleFocus ~~ e--->>>', e)
  }
  const handleChange = (value: string) => {
    setValue(value)
    props.onChange?.(value)
  }
  const handleTick = () => {
    setDisabled((disabled) => {
      const newDisabled = !disabled
      props.onFinishChange?.(newDisabled)
      return newDisabled
    })
  }

  useEffect(() => {
    if (preTodoValue.current !== todoValue) {
      setValue(todoValue)
      preTodoValue.current = todoValue
    }
  }, [todoValue])

  return (
    <>
      <div className={classNames}>
        <Checkbox
          className={styles.checkbox}
          checked={disabled}
          onChange={handleTick}
        />
        <ContentEditable
          {...props}
          value={value}
          className={styles['todo-item-content']}
          placeholder={'嘿，朋友今天想做些什么呢？'}
          onChange={handleChange}
          disabled={disabled}
          onBlur={handleBlur}
          onFocus={handleFocus}
        />
      </div>
    </>
  )
}

export default TodoItem
