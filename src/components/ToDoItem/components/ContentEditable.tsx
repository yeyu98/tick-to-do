/*
 * @Author: yeyu98
 * @Date: 2024-09-13 10:26:23
 * @LastEditors: yeyu98
 * @LastEditTime: 2024-09-20 17:40:40
 * @FilePath: \tick-to-do\src\components\ToDoItem\components\ContentEditable.tsx
 * @Description:
 */
import { useRef, useEffect, ReactNode, FC, useState } from 'react'
import type { KeyboardEvent, FocusEvent, FormEvent } from 'react'
import classnames from 'classnames'
import styles from './ContentEditable.module.less'

interface Props {
  value: string
  onBlur?: (value: string) => void
  onFocus?: (e: FocusEvent<HTMLDivElement>) => void
  onKeyDown?: (e: KeyboardEvent<HTMLDivElement>) => void
  onChange?: (value: string) => void
  suffix?: ReactNode
  disabled?: boolean
  placeholder?: string
  className?: string
}

const ContentEditable: FC<Props> = (props) => {
  const {
    value,
    disabled = false,
    className = '',
    placeholder = '',
    suffix = '',
  } = props
  // console.log('🥳🥳🥳 ~~ props--->>>', props)
  const textRef = useRef<HTMLDivElement | null>(null)
  const isCompositionEnd = useRef(true)
  const [isFocused, setIsFocused] = useState(false)

  const classNames = classnames([
    styles.container,
    disabled ? styles.disabled : '',
    className,
  ])

  const handleCompositionStart = () => {
    isCompositionEnd.current = false
  }

  const handleCompositionEnd = () => {
    isCompositionEnd.current = true
  }

  const handleBlur = (e: FocusEvent<HTMLDivElement>) => {
    setIsFocused(false)
    props?.onBlur?.(e.target.innerHTML)
  }

  const handleFocus = (e: FocusEvent<HTMLDivElement>) => {
    setIsFocused(true)
    props?.onFocus?.(e)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    props?.onKeyDown?.(e)
  }

  const handleChange = (e: FormEvent<HTMLDivElement>) => {
    if (isCompositionEnd.current) {
      props?.onChange?.(e.target.innerHTML)
    }
  }

  function replaceCaret(el: HTMLElement) {
    // Place the caret at the end of the element
    const target = document.createTextNode('')
    el.appendChild(target)
    // do not move caret if element was not focused
    const isTargetFocused = document.activeElement === el
    if (target !== null && target.nodeValue !== null && isTargetFocused) {
      const sel = window.getSelection()
      if (sel !== null) {
        const range = document.createRange()
        range.setStart(target, target.nodeValue.length)
        range.collapse(true)
        sel.removeAllRanges()
        sel.addRange(range)
      }
      if (el instanceof HTMLElement) el.focus()
    }
  }
  useEffect(() => {
    if (value && textRef.current) {
      textRef.current.innerHTML = value
      replaceCaret(textRef.current)
    }
  }, [value])

  return (
    <>
      <div className={classNames}>
        <div className={styles.wrapper}>
          <div
            ref={textRef}
            className={styles.contentEditable}
            onCompositionStart={handleCompositionStart}
            onCompositionEnd={handleCompositionEnd}
            onBlur={handleBlur}
            onFocus={handleFocus}
            onInput={handleChange}
            onKeyDown={handleKeyDown}
            contentEditable={!disabled}
          ></div>
          {placeholder && !value && !isFocused && (
            <span className={styles.placeholder}>{placeholder}</span>
          )}
        </div>
        {suffix ? <div className={styles.suffix}>{suffix}</div> : null}
      </div>
    </>
  )
}

export default ContentEditable
