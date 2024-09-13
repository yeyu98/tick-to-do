/*
 * @Author: yeyu98
 * @Date: 2024-09-13 10:26:23
 * @LastEditors: yeyu98
 * @LastEditTime: 2024-09-13 11:23:13
 * @FilePath: \tick-to-do\src\components\ToDoItem\components\ContentEditable.tsx
 * @Description:
 */
import { useRef, useEffect, ReactNode } from 'react'
import styles from './ContentEditable.module.less'

interface Props {
  value: string
  onBlur?: (value: string) => void
  children?: ReactNode
}

function ContentEditable(props: Props) {
  const { value } = props
  const textRef = useRef<HTMLDivElement | null>(null)
  const handleBlur = (e: any) => {
    props?.onBlur?.(e.target.innerHTML)
  }

  useEffect(() => {
    if (textRef.current) {
      textRef.current.innerHTML = value
    }
  }, [value])

  return (
    <>
      <div
        ref={textRef}
        className={styles.contentEditable}
        onBlur={handleBlur}
        contentEditable={true}
      >
        {props.children}
      </div>
    </>
  )
}

export default ContentEditable
