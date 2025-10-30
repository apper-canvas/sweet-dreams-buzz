import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AnimatePresence } from "framer-motion";
import React from "react";
import Footer from "@/components/organisms/Footer";
import Header from "@/components/organisms/Header";
import { CartProvider } from "@/hooks/CartProvider";

function Layout() {
  return (
    <>
      <CartProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <AnimatePresence mode="wait">
              <Outlet />
            </AnimatePresence>
          </main>
          <Footer />
        </div>
      </CartProvider>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default Layout;