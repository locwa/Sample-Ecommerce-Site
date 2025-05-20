import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Products from './Products.tsx'
import { BrowserRouter, Routes, Route} from "react-router";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path='/' element={<Products />} />
              <Route path='/:category' element={<Products />} />
          </Routes>
      </BrowserRouter>
  </StrictMode>
)
