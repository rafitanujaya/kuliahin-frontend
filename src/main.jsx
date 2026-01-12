import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import "@fontsource/geist";
import "@fontsource/geist/400.css";
import "@fontsource/geist/500.css";
import "@fontsource/geist/600.css";
import './index.css'
import { registerSW } from "virtual:pwa-register"
import LandingPage from './pages/LandingPage'

registerSW({
  onNeedRefresh() {
    console.log("New content available, refresh please.")
  },
  onOfflineReady() {
    console.log("App ready to work offline.")
  },
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LandingPage></LandingPage>
  </StrictMode>,
)
