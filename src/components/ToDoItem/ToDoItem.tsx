/*
 * @Author: yeyu98
 * @Date: 2024-09-13 10:26:23
 * @LastEditors: yeyu98
 * @LastEditTime: 2024-09-25 17:20:54
 * @FilePath: \tick-to-do\src\components\ToDoItem\ToDoItem.tsx
 * @Description:
 */
import { useEffect, useState, useRef, ReactNode } from 'react'
import { Checkbox } from 'antd'
import ContentEditable from './components/ContentEditable'
import classnames from 'classnames'
import styles from './ToDoItem.module.less'

interface Props {
  innerRef?: any
  isFinished?: boolean
  todoValue?: string
  className?: string
  onBlur?: (value: string) => void
  onFocus?: (e: any) => void
  onChange?: (value: string) => void
  onFinishChange?: (finish: boolean) => void
  prefix?: ReactNode
  suffix?: ReactNode
}

// function TodoItem(props: Props) {

// }
const TodoItem: React.FC<Props> = (props: Props) => {
  const {
    className = '',
    todoValue = '',
    prefix = '',
    isFinished = false,
    innerRef = '',
  } = props
  const [disabled, setDisabled] = useState(false)
  const [value, setValue] = useState('')
  const preTodoValue = useRef('')
  const classNames = classnames([styles['todo-item'], className])
  const handleBlur = (value: string) => {
    props.onBlur?.(value)
  }

  const handleFocus = (e: any) => {
    props.onFocus?.(e)
  }
  const handleChange = (value: string) => {
    console.log('🥳🥳🥳 ~~ handleChange ~~ value--->>>', value)
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
    setDisabled(isFinished)
  }, [isFinished])

  useEffect(() => {
    if (preTodoValue.current !== todoValue) {
      setValue(todoValue)
      preTodoValue.current = todoValue
    }
  }, [todoValue])

  return (
    <>
      <div className={classNames} ref={innerRef}>
        {prefix ? <>{prefix}</> : null}
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
