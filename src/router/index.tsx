import { lazy, Suspense } from 'react'
import { Spin } from 'antd'
import { createBrowserRouter } from 'react-router-dom'

const SuspenseComponent = (
  Component: React.LazyExoticComponent<() => JSX.Element>,
) => {
  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex justify-center items-center">
          <Spin />
        </div>
      }
    >
      <Component />
    </Suspense>
  )
}

const App = lazy(() => import('@/App'))

const baseRoute = [
  {
    path: '/',
    element: SuspenseComponent(App),
  },
]

export default createBrowserRouter(baseRoute)
