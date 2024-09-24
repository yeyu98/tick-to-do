import localforage from 'localforage'

const KEY = 'tick-to-do'

export const setLocal = async (key: string = KEY, value: any) => {
  const data = await getLocal(key)
  if (data) {
  }
}

export const getLocal = <T>(key: string = KEY) => localforage.getItem<T>(key)
