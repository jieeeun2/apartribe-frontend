import React, { useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import Router from 'routes/Router'
import { Provider } from 'react-redux'
import { store, persistor } from 'redux/store'
import { PersistGate } from 'redux-persist/integration/react'


const root = createRoot(document.getElementById('root') as HTMLElement)

const reIssue = () => {
  auth.reissueToken()
  const timer = setInterval(() => {
    auth.reissueToken()
  }, 360000)

  return () => {
    clearInterval(timer)
  }
}

reIssue()

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={Router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
