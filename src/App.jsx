import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AnimatePresence } from "framer-motion";
import Layout from "@/components/organisms/Layout";
import Home from "@/components/pages/Home";
import Category from "@/components/pages/Category";
import ProductDetail from "@/components/pages/ProductDetail";
import CakeDesigner from "@/components/pages/CakeDesigner";
import Cart from "@/components/pages/Cart";
import Gallery from "@/components/pages/Gallery";
import CartProvider from "@/hooks/CartProvider";

function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="category/:categoryName" element={<Category />} />
              <Route path="product/:productId" element={<ProductDetail />} />
              <Route path="cake-designer" element={<CakeDesigner />} />
              <Route path="cart" element={<Cart />} />
              <Route path="gallery" element={<Gallery />} />
            </Route>
          </Routes>
        </AnimatePresence>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </CartProvider>
  );
}

export default App;