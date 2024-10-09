/*
 * @Author: yeyu98
 * @Date: 2024-09-13 09:46:00
 * @LastEditors: yeyu98
 * @LastEditTime: 2024-10-09 17:07:39
 * @FilePath: \tick-to-do\src\utils\index.ts
 * @Description:
 */
/**
 * @description 复制
 * @param params 字符串
 * @returns
 */
const copyText = (text: string) => {
  return new Promise((resolve) => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          resolve(true)
        })
        .catch((err) => {
          console.log(err)
          resolve(false)
        })
    } else {
      const input = document.createElement('input')
      input.value = text
      input.style.position = 'absolute'
      input.style.top = '-999px'
      input.style.left = '-999px'
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      document.body.removeChild(input)
      resolve(true)
    }
  })
}
export const copy = (data: string | Blob) => {
  // 在WKWebview中document.execCommand('copy')无法与异步操作衔接使用，为了安全考虑，document.execCommand('copy')的执行操作必须是真正的用户触发的
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve) => {
    if (data instanceof Blob) {
      navigator.clipboard
        .write([
          new ClipboardItem({
            [data.type]: data,
          }),
        ])
        .then(() => {
          resolve(true)
        })
        .catch((err) => {
          console.log('🥳🥳🥳 ~~ returnnewPromise ~~ err--->>>', err)
          resolve(false)
        })
    } else {
      const success = await copyText(data)
      resolve(success)
    }
  }).catch((err) => {
    console.log(err)
  })
}
