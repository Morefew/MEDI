import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { StyleSheetManager } from 'styled-components'
import { StylesProps } from './constants/styles-props.const.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StyleSheetManager shouldForwardProp={(prop) => !StylesProps.includes(prop)}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StyleSheetManager>
  </StrictMode>,
)
