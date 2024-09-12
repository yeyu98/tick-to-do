/*
 * @Author: yeyu98
 * @Date: 2024-09-12 16:25:12
 * @LastEditors: yeyu98
 * @LastEditTime: 2024-09-12 16:41:44
 * @FilePath: \tick-to-do\src\components\FullScreenLoading.tsx
 * @Description:
 */
import React, { useEffect, useImperativeHandle, forwardRef } from 'react'
import { Spin } from 'antd'

interface Props {
  immediatelyTrigger: boolean
}

interface FullScreenLoadingRef {
  showLoader: () => void
}

const FullScreenLoading = forwardRef<FullScreenLoadingRef, Props>(
  (props, ref) => {
    const { immediatelyTrigger = false } = props
    const [spinning, setSpinning] = React.useState(false)
    const [percent, setPercent] = React.useState(0)

    useImperativeHandle(ref, () => ({
      showLoader,
    }))

    const showLoader = () => {
      setSpinning(true)
      let ptg = -10

      const interval = setInterval(() => {
        ptg += 5
        setPercent(ptg)

        if (ptg > 120) {
          clearInterval(interval)
          setSpinning(false)
          setPercent(0)
        }
      }, 100)
    }

    useEffect(() => {
      if (immediatelyTrigger) {
        showLoader()
      }
    }, [immediatelyTrigger])

    return (
      <>
        <Spin spinning={spinning} percent={percent} fullscreen />
      </>
    )
  },
)

FullScreenLoading.displayName = 'FullScreenLoading'

export default FullScreenLoading
