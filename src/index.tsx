import React, { useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import Router from 'routes/Router'
import { Provider } from 'react-redux'
import { store } from 'redux/store'
import { auth } from 'services/auth'

const root = createRoot(document.getElementById('root') as HTMLElement)

const reIssue = () => {
  auth.reissueToken()
  const timer = setInterval(() => {
    auth.reissueToken()
  }, 70000)

  return () => {
    clearInterval(timer)
  }
}

reIssue()

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={Router} />
    </Provider>
  </React.StrictMode>,
)
