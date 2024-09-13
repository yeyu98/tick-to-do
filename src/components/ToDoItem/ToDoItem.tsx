/*
 * @Author: yeyu98
 * @Date: 2024-09-13 10:26:23
 * @LastEditors: yeyu98
 * @LastEditTime: 2024-09-13 11:44:47
 * @FilePath: \tick-to-do\src\components\ToDoItem\TodoItem.tsx
 * @Description:
 */
import { useRef, useImperativeHandle, useEffect, useState } from 'react'
import ContentEditable from './components/ContentEditable'
import styles from './ToDoItem.module.less'

interface Props {
  value: string
  onBlur: (event: any) => void
}

function TodoItem(props: Props) {
  const handleBlur = (value: string) => {
    console.log('🥳🥳🥳 ~~ handleBlur ~~ value--->>>', value)
  }
  return (
    <>
      <ContentEditable
        value={''}
        placeholder={'请输入'}
        disabled={false} // true
        onBlur={handleBlur}
      />
    </>
  )
}

export default TodoItem
