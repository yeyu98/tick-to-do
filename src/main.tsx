/*
 * @Author: yeyu98
 * @Date: 2024-09-12 10:35:05
 * @LastEditors: yeyu98
 * @LastEditTime: 2024-09-12 11:43:22
 * @FilePath: \template-vite-react-ts-tailwind\src\main.tsx
 * @Description:
 */
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

const rootElement = document.getElementById('root') as HTMLElement
const root = ReactDOM.createRoot(rootElement)

root.render(<App />)
