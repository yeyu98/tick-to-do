import { useMatches } from 'react-router'
import type { UIMatch } from 'react-router'

interface Match<T, U> {
  current: UIMatch<T, U>
  getCurrentData: () => T
  getCurrentHandle: () => U
}
export default <T = unknown, U = unknown>(): Match<T, U> => {
  const matches = useMatches()
  const current = matches[matches.length - 1] as UIMatch<T, U>
  console.log('✨✨🥰  ~ current--->>>', current)

  const getCurrentHandle = () => current.handle
  return {
    current,
    getCurrentHandle,
    getCurrentData: () => current.data,
  }
}
