import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { productService } from "@/services/api/productService";
import { useCart } from "@/hooks/CartProvider";

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedFlavor, setSelectedFlavor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addToCart } = useCart();

const loadProduct = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productService.getById(productId);
      
      // Parse JSON fields that are stored as strings
      const parsedProduct = {
        ...data,
        images_c: data.images_c ? JSON.parse(data.images_c) : [],
        sizes_c: data.sizes_c ? JSON.parse(data.sizes_c) : [],
        flavors_c: data.flavors_c ? JSON.parse(data.flavors_c) : [],
        dietary_c: data.dietary_c ? JSON.parse(data.dietary_c) : []
      };
      
      setProduct(parsedProduct);
      setSelectedSize(parsedProduct.sizes_c[0]);
      setSelectedFlavor(parsedProduct.flavors_c[0]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (!product) return;

const customization = {
      size: selectedSize?.name,
      flavor: selectedFlavor,
      totalPrice: selectedSize?.price || product.base_price_c
    };

    addToCart(product, customization, quantity);
  };

  const getCurrentPrice = () => {
    return selectedSize?.price || product.base_price_c;
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadProduct} />;
  if (!product) return <Error message="Product not found" />;

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-surface py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<nav className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-gray-500 hover:text-primary">Home</Link>
            <ApperIcon name="ChevronRight" size={16} className="text-gray-400" />
            <Link to={`/category/${product.category_c}`} className="text-gray-500 hover:text-primary">
              {product.category_c}
            </Link>
            <ApperIcon name="ChevronRight" size={16} className="text-gray-400" />
            <span className="text-gray-900">{product.name_c}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
<Card className="overflow-hidden">
              <div className="aspect-square">
                <img
                  src={product.images_c[currentImageIndex]}
                  alt={product.name_c}
                  className="w-full h-full object-cover"
                />
              </div>
            </Card>
            
{product.images_c.length > 1 && (
              <div className="flex space-x-2">
                {product.images_c.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      currentImageIndex === index ? 'border-primary' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name_c} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
<div>
              <div className="flex items-center gap-2 mb-2">
                {product.featured_c && <Badge variant="primary">Featured</Badge>}
                {product.popular_c && <Badge variant="accent">Popular</Badge>}
                {product.customizable_c && <Badge variant="secondary">Customizable</Badge>}
              </div>
              
              <h1 className="font-display text-3xl font-bold text-gray-900 mb-2">
                {product.name_c}
              </h1>
              
              <p className="text-gray-600 text-lg">
                {product.description_c}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-primary">
                ${getCurrentPrice()}
              </div>
              <div className="text-sm text-gray-600">
                Lead time: {product.lead_time_c} days
              </div>
            </div>

{/* Size Selection */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Size & Servings</h3>
              <div className="grid grid-cols-1 gap-2">
                {product.sizes_c.map((size) => (
                  <button
                    key={size.name}
                    onClick={() => setSelectedSize(size)}
                    className={`p-3 rounded-lg border-2 text-left transition-colors ${
                      selectedSize?.name === size.name
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">{size.name}</div>
                        <div className="text-sm text-gray-600">Serves {size.serves}</div>
                      </div>
                      <div className="font-semibold text-primary">
                        ${size.price}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

{/* Flavor Selection */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Flavor</h3>
              <div className="grid grid-cols-2 gap-2">
                {product.flavors_c.map((flavor) => (
                  <button
                    key={flavor}
                    onClick={() => setSelectedFlavor(flavor)}
                    className={`p-3 rounded-lg border-2 text-center transition-colors ${
                      selectedFlavor === flavor
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {flavor}
                  </button>
                ))}
              </div>
            </div>

{/* Dietary Info */}
            {product.dietary_c.length > 0 && (
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Dietary Options</h3>
                <div className="flex flex-wrap gap-2">
                  {product.dietary_c.map((diet) => (
                    <Badge key={diet} variant="success">
                      {diet}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & Add to Cart */}
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Quantity</h3>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 p-0"
                  >
                    <ApperIcon name="Minus" size={16} />
                  </Button>
                  <span className="w-12 text-center font-medium text-lg">
                    {quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 p-0"
                  >
                    <ApperIcon name="Plus" size={16} />
                  </Button>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button
                  onClick={handleAddToCart}
                  className="flex-1"
                  size="lg"
                >
                  <ApperIcon name="ShoppingCart" size={20} className="mr-2" />
                  Add to Cart - ${(getCurrentPrice() * quantity).toFixed(2)}
</Button>
                
                {product.customizable_c && (
                  <Button
                    variant="outline"
                    size="lg"
                    asChild
                  >
                    <Link to="/cake-designer">
                      <ApperIcon name="Palette" size={20} className="mr-2" />
                      Customize
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;