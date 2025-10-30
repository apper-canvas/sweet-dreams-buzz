import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import ProductGrid from "@/components/organisms/ProductGrid";
import FilterSidebar from "@/components/molecules/FilterSidebar";
import { productService } from "@/services/api/productService";
import { useCart } from "@/hooks/CartProvider";

const Category = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productService.getByCategory(categoryName);
      setProducts(data);
      setFilteredProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [categoryName]);

  const handleFilterChange = (filters) => {
    let filtered = [...products];

    if (filters.priceRange) {
      filtered = filtered.filter(product => 
        product.basePrice >= filters.priceRange[0] && 
        product.basePrice <= filters.priceRange[1]
      );
    }

    if (filters.dietary.length > 0) {
      filtered = filtered.filter(product =>
        filters.dietary.some(diet => product.dietary.includes(diet))
      );
    }

    if (filters.customizable) {
      filtered = filtered.filter(product => product.customizable);
    }

    setFilteredProducts(filtered);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="font-display text-4xl font-bold text-gray-900 mb-4">
              {categoryName}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our collection of {categoryName.toLowerCase()} made with love and finest ingredients.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <FilterSidebar
              onFilterChange={handleFilterChange}
              filters={{ category: categoryName }}
            />
          </div>

          {/* Products */}
          <div className="flex-1">
            <div className="mb-6">
              <p className="text-gray-600">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
              </p>
            </div>
            
            <ProductGrid
              products={filteredProducts}
              loading={loading}
              error={error}
              onRetry={loadProducts}
              onAddToCart={handleAddToCart}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;