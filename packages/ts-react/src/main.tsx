import React from 'react'
import { render } from 'react-dom'
import App from './App'
// import { AppContainer } from 'react-hot-loader'
render(
  // <AppContainer>
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  // </AppContainer>,
  document.getElementById('root')
)