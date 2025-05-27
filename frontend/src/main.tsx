import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ProductList from './ProductList.tsx'
import ProductDetails from "./ProductDetails.tsx";
import { BrowserRouter, Routes, Route} from "react-router";
import { ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';

const client = new ApolloClient({
    uri: 'http://localhost:8082/graphql',
    cache: new InMemoryCache()
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ApolloProvider client={client}>
          <BrowserRouter>
              <Routes>
                  <Route path='/' element={<ProductList />} />
                  <Route path='/:category' element={<ProductList />} />
                  <Route path='/product/:product' element={<ProductDetails />} />
              </Routes>
          </BrowserRouter>
      </ApolloProvider>
  </StrictMode>
)
