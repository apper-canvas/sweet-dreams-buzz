import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";

const ProductCard = ({ product, onAddToCart }) => {
  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart(product);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="group"
    >
      <Card className="overflow-hidden h-full hover:shadow-2xl transition-all duration-300">
        <Link to={`/product/${product.Id}`}>
          <div className="relative">
            <div className="aspect-square overflow-hidden">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="absolute top-3 left-3 flex flex-col gap-1">
              {product.featured && (
                <Badge variant="primary">Featured</Badge>
              )}
              {product.popular && (
                <Badge variant="accent">Popular</Badge>
              )}
            </div>
            {product.customizable && (
              <div className="absolute top-3 right-3">
                <Badge variant="secondary">
                  <ApperIcon name="Palette" size={12} className="mr-1" />
                  Custom
                </Badge>
              </div>
            )}
          </div>
        </Link>
        
        <div className="p-4">
          <Link to={`/product/${product.Id}`}>
            <h3 className="font-display text-lg font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-primary transition-colors">
              {product.name}
            </h3>
          </Link>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between mb-3">
            <span className="text-2xl font-bold text-primary">
              ${product.basePrice}
            </span>
            <span className="text-sm text-gray-500">
              Lead time: {product.leadTime} days
            </span>
          </div>
          
          <div className="flex gap-2 mb-4">
            {product.dietary.slice(0, 2).map((diet) => (
              <Badge key={diet} variant="success" className="text-xs">
                {diet}
              </Badge>
            ))}
          </div>
          
          <Button
            onClick={handleQuickAdd}
            className="w-full"
            size="sm"
          >
            <ApperIcon name="Plus" size={16} className="mr-2" />
            Quick Add
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

export default ProductCard;