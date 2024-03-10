import "extensionsjs/lib"

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import 'react-toastify/dist/ReactToastify.css'
import 'react-loading-skeleton/dist/skeleton.css'

import './index.css'

import { StrictMode } from 'react'
import ReactDOM, { hydrateRoot, createRoot, } from 'react-dom/client'

import App from './App'
import reportWebVitals from './reportWebVitals';





// const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
// root.render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
const container = document.getElementById('root');
const root = createRoot(container);

if (container.hasChildNodes()) {
  hydrateRoot(container, <StrictMode> <App /></StrictMode>);
} else {
  root.render(<StrictMode> <App /></StrictMode>);
}


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
