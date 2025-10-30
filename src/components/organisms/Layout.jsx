import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AnimatePresence } from "framer-motion";
import CartProvider from "@/hooks/CartProvider";
import { useCart } from "@/hooks/CartProvider";
import Header from "@/components/organisms/Header";
import Footer from "@/components/organisms/Footer";

const LayoutContent = () => {
  const cart = useCart();

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Outlet context={cart} />
          </main>
          <Footer />
        </div>
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
  );
};

const Layout = () => {
  return (
    <CartProvider>
      <LayoutContent />
    </CartProvider>
  );
};

export default Layout;