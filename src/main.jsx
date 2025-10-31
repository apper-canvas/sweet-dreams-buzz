import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { router } from '@/router'
import { store } from '@/store'
import { CartProvider } from '@/hooks/CartProvider'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </Provider>
)