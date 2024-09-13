/*
 * @Author: yeyu98
 * @Date: 2024-09-13 10:26:23
 * @LastEditors: yeyu98
 * @LastEditTime: 2024-09-13 11:33:01
 * @FilePath: \tick-to-do\src\components\ToDoItem\components\ContentEditable.tsx
 * @Description:
 */
import { useRef, useEffect, ReactNode } from 'react'
import classnames from 'classnames'
import styles from './ContentEditable.module.less'

interface Props {
  value: string
  onBlur?: (value: string) => void
  onFocus?: (e: any) => void
  children?: ReactNode
  disabled?: boolean
}

function ContentEditable(props: Props) {
  const { value, disabled = false } = props
  const textRef = useRef<HTMLDivElement | null>(null)

  const classNames = classnames([styles.contentEditable, styles.disabled])

  const handleBlur = (e: any) => {
    props?.onBlur?.(e.target.innerHTML)
  }

  const handleFocus = (e) => {
    props?.onFocus?.(e)
  }

  useEffect(() => {
    if (textRef.current) {
      textRef.current.innerHTML = value
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div
        ref={textRef}
        className={classNames}
        onBlur={handleBlur}
        onFocus={handleFocus}
        contentEditable={!disabled}
      >
        {props.children}
      </div>
    </>
  )
}

export default ContentEditable
