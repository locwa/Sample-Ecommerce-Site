import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ProductList from './Pages/ProductList.tsx'
import ProductDetails from "./Pages/ProductDetails.tsx";
import { BrowserRouter, Routes, Route} from "react-router";
import { ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import {CartProvider} from "./CartContext.tsx";

const client = new ApolloClient({
    uri: import.meta.env.VITE_GRAPHQL_URI,
    cache: new InMemoryCache()
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ApolloProvider client={client}>
          <CartProvider>
              <BrowserRouter>
                  <Routes>
                      <Route path='/' element={<ProductList />} />
                      <Route path='/:category' element={<ProductList />} />
                      <Route path='/product/:product' element={<ProductDetails />} />
                  </Routes>
              </BrowserRouter>
          </CartProvider>
      </ApolloProvider>
  </StrictMode>
)
