/*
 * @Author: yeyu98
 * @Date: 2024-09-13 23:08:38
 * @LastEditors: yeyu98
 * @LastEditTime: 2024-09-13 23:10:08
 * @Description:
 */
import { Empty, Typography } from 'antd'

function EmptyData() {
  return (
    <Empty
      image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
      imageStyle={{ height: 60 }}
      description={
        <Typography.Text>
          嘿，朋友，今天想做些什么来完成伟大的梦想呢？
        </Typography.Text>
      }
    />
  )
}

export default EmptyData
