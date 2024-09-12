import { lazy, Suspense } from 'react'
import FullScreenLoading from '@/components/FullScreenLoading'
import { createBrowserRouter } from 'react-router-dom'

const SuspenseComponent = (
  Component: React.LazyExoticComponent<() => JSX.Element>,
) => {
  return (
    <Suspense fallback={<FullScreenLoading immediatelyTrigger={true} />}>
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
