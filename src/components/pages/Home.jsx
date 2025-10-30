import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import HeroSection from "@/components/organisms/HeroSection";
import CategorySection from "@/components/organisms/CategorySection";
import ProductGrid from "@/components/organisms/ProductGrid";
import TestimonialSection from "@/components/organisms/TestimonialSection";
import { productService } from "@/services/api/productService";
import { useCart } from "@/hooks/CartProvider";

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const [featured, popular] = await Promise.all([
        productService.getFeatured(),
        productService.getPopular()
      ]);
      setFeaturedProducts(featured);
      setPopularProducts(popular);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <div className="min-h-screen">
      <HeroSection />
      <CategorySection />
      
      {/* Featured Products */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-4xl font-bold text-gray-900 mb-4">
              Featured Creations
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our most popular and beautifully crafted cakes and pastries.
            </p>
          </motion.div>
          
          <ProductGrid
            products={featuredProducts}
            loading={loading}
            error={error}
            onRetry={loadProducts}
            onAddToCart={handleAddToCart}
          />
        </div>
      </section>

      {/* Popular Products */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-4xl font-bold text-gray-900 mb-4">
              Customer Favorites
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              These are the treats our customers can't get enough of.
            </p>
          </motion.div>
          
          <ProductGrid
            products={popularProducts}
            loading={loading}
            error={error}
            onRetry={loadProducts}
            onAddToCart={handleAddToCart}
          />
        </div>
      </section>

      <TestimonialSection />
    </div>
  );
};

export default Home;