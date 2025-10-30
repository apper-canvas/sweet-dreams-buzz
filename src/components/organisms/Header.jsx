import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import SearchBar from "@/components/molecules/SearchBar";
import Button from "@/components/atoms/Button";
import { useCart } from "@/hooks/CartProvider";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const { getCartItemCount } = useCart();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Wedding Cakes", href: "/category/Wedding Cakes" },
    { name: "Birthday Cakes", href: "/category/Birthday Cakes" },
    { name: "Cupcakes", href: "/category/Cupcakes" },
    { name: "Pastries", href: "/category/Pastries" },
    { name: "Custom Orders", href: "/category/Custom Orders" },
    { name: "Gallery", href: "/gallery" }
  ];

  const isActive = (href) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  const handleSearch = (query) => {
    console.log("Search query:", query);
    setIsSearchOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-primary/80 rounded-full flex items-center justify-center">
              <ApperIcon name="Cake" size={24} className="text-white" />
            </div>
            <span className="font-display text-2xl font-bold text-gray-900">
              Sweet Dreams
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors relative ${
                  isActive(item.href)
                    ? "text-primary"
                    : "text-gray-700 hover:text-primary"
                }`}
              >
                {item.name}
                {isActive(item.href) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-6 left-0 right-0 h-0.5 bg-primary"
                  />
                )}
              </Link>
            ))}
          </nav>

{/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2"
            >
              <ApperIcon name="Search" size={20} />
            </Button>
            
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="sm" className="p-2">
                <ApperIcon name="ShoppingCart" size={20} />
                {getCartItemCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getCartItemCount()}
                  </span>
                )}
              </Button>
            </Link>
          </div>

{/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2"
            >
              <ApperIcon name={isMenuOpen ? "X" : "Menu"} size={20} />
            </Button>
          </div>
        </div>

</div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden border-t bg-white"
          >
<div className="px-4 py-2 space-y-1">
              <div className="pb-2">
                <SearchBar onSearch={handleSearch} />
              </div>
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${
                    isActive(item.href)
                      ? "text-primary bg-primary/10"
                      : "text-gray-700 hover:text-primary hover:bg-gray-50"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;