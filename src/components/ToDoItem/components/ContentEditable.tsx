/*
 * @Author: yeyu98
 * @Date: 2024-09-13 10:26:23
 * @LastEditors: yeyu98
 * @LastEditTime: 2024-09-13 15:34:11
 * @FilePath: \tick-to-do\src\components\ToDoItem\components\ContentEditable.tsx
 * @Description:
 */
import { useRef, useEffect, ReactNode, FC, useState } from 'react'
import type { KeyboardEvent, FocusEvent } from 'react'
import classnames from 'classnames'
import styles from './ContentEditable.module.less'

interface Props {
  value: string
  onBlur?: (value: string) => void
  onFocus?: (e: FocusEvent<HTMLDivElement>) => void
  onKeyDown?: (e: KeyboardEvent<HTMLDivElement>) => void
  suffix?: ReactNode
  disabled?: boolean
  placeholder?: string
  className?: string
}

const ContentEditable: FC<Props> = (props) => {
  const { value, disabled = false, className = '', placeholder = '' } = props
  const textRef = useRef<HTMLDivElement | null>(null)

  const classNames = classnames([
    styles.container,
    disabled ? styles.disabled : '',
    className,
  ])

  const handleBlur = (e: FocusEvent<HTMLDivElement>) => {
    props?.onBlur?.(e.target.innerHTML)
  }

  const handleFocus = (e: FocusEvent<HTMLDivElement>) => {
    props?.onFocus?.(e)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    props?.onKeyDown?.(event)
  }

  useEffect(() => {
    if (textRef.current) {
      textRef.current.innerHTML = value
    }
  }, [value])

  return (
    <>
      <div className={classNames}>
        <div className={styles.wrapper}>
          <div
            ref={textRef}
            className={styles.contentEditable}
            onBlur={handleBlur}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
            contentEditable={!disabled}
          ></div>
          {placeholder && !value && (
            <span className={styles.placeholder}>{placeholder}</span>
          )}
        </div>
        <div className={styles.suffix}>{props.suffix}</div>
      </div>
    </>
  )
}

export default ContentEditable
