/*
 * @Author: yeyu98
 * @Date: 2024-09-13 10:26:23
 * @LastEditors: yeyu98
 * @LastEditTime: 2024-10-09 16:37:23
 * @FilePath: \tick-to-do\src\components\ToDoItem\ToDoItem.tsx
 * @Description:
 */
import {
  useEffect,
  useState,
  useRef,
  ReactNode,
  forwardRef,
  useImperativeHandle,
} from 'react'
import { Checkbox } from 'antd'
import ContentEditable from './components/ContentEditable'
import classnames from 'classnames'
import styles from './ToDoItem.module.less'
import type { KeyboardEvent } from 'react'

interface Props {
  innerRef?: any
  isFinished?: boolean
  todoValue?: string
  className?: string
  onBlur?: (value: string) => void
  onFocus?: (e: any) => void
  onChange?: (value: string) => void
  onKeyDown?: (e: KeyboardEvent<HTMLDivElement>) => void
  onFinishChange?: (finish: boolean) => void
  prefix?: ReactNode
  suffix?: ReactNode
}

const TodoItem = forwardRef(function TodoItem(props: Props, ref) {
  const {
    className = '',
    todoValue = '',
    prefix = '',
    isFinished = false,
    innerRef = '',
    onBlur = null,
    onFocus = null,
    onChange = null,
    onFinishChange = null,
    onKeyDown = null,
    ...restProps
  } = props
  const [disabled, setDisabled] = useState(false)
  const [value, setValue] = useState('')
  const preTodoValue = useRef('')
  const contentEditableRef = useRef<any>(null)
  const classNames = classnames([styles['todo-item'], className])
  const handleBlur = (value: string) => {
    onBlur?.(value)
  }
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(e)
  }
  const handleFocus = (e: any) => {
    onFocus?.(e)
  }
  const handleChange = (value: string) => {
    console.log('🥳🥳🥳 ~~ handleChange ~~ value--->>>', value)
    setValue(value)
    onChange?.(value)
  }
  const handleTick = () => {
    setDisabled((disabled) => {
      const newDisabled = !disabled
      onFinishChange?.(newDisabled)
      return newDisabled
    })
  }

  useImperativeHandle(ref, () => ({
    focus: () => contentEditableRef.current?.setFocus(true),
  }))

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
      <div className={classNames} ref={innerRef} {...restProps}>
        {prefix ? <>{prefix}</> : null}
        <Checkbox
          className={styles.checkbox}
          checked={disabled}
          onChange={handleTick}
        />
        <ContentEditable
          {...props}
          ref={contentEditableRef}
          value={value}
          className={styles['todo-item-content']}
          placeholder={'嘿，朋友今天想做些什么呢？'}
          onChange={handleChange}
          disabled={disabled}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          onFocus={handleFocus}
        />
      </div>
    </>
  )
})

export default TodoItem
