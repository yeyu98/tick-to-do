/*
 * @Author: yeyu98
 * @Date: 2024-09-13 10:26:23
 * @LastEditors: yeyu98
 * @LastEditTime: 2024-09-13 14:55:27
 * @FilePath: \tick-to-do\src\components\ToDoItem\components\ContentEditable.tsx
 * @Description:
 */
import { useRef, useEffect, ReactNode, FC } from 'react'
import classnames from 'classnames'
import styles from './ContentEditable.module.less'

interface Props {
  value: string
  onBlur?: (value: string) => void
  onFocus?: (e: any) => void
  suffix?: ReactNode
  disabled?: boolean
  placeholder?: string
  className?: string
}

// placeholder如何监听
// 换行
// disabled样式问题
const ContentEditable: FC<Props> = (props) => {
  const { value, disabled = false, className = '' } = props
  const textRef = useRef<HTMLDivElement | null>(null)

  const classNames = classnames([
    styles.container,
    disabled ? styles.disabled : '',
    className,
  ])

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

  // TODO
  // 换行问题

  return (
    <>
      <div className={classNames}>
        <div className={styles.wrapper}>
          <div
            ref={textRef}
            className={styles.contentEditable}
            onBlur={handleBlur}
            onFocus={handleFocus}
            contentEditable={!disabled}
          ></div>
          {/* {placeholder && !value && (
            <span className={styles.placeholder}>{placeholder}</span>
          )} */}
        </div>
        <div className={styles.suffix}>{props.suffix}</div>
      </div>
    </>
  )
}

export default ContentEditable
