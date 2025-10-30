import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import { useCart } from "@/hooks/CartProvider";

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (newQuantity) => {
    updateQuantity(item.id, newQuantity);
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      layout
    >
      <Card className="p-4 mb-4">
        <div className="flex gap-4">
          <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
            <img
              src={item.productImage}
              alt={item.productName}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex-1">
            <h4 className="font-medium text-gray-900 mb-1">
              {item.productName}
            </h4>
            
            {item.customization && Object.keys(item.customization).length > 0 && (
              <div className="text-sm text-gray-600 mb-2">
                {item.customization.size && (
                  <span className="block">Size: {item.customization.size}</span>
                )}
                {item.customization.flavor && (
                  <span className="block">Flavor: {item.customization.flavor}</span>
                )}
                {item.customization.frosting && (
                  <span className="block">Frosting: {item.customization.frosting}</span>
                )}
              </div>
            )}
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuantityChange(item.quantity - 1)}
                  className="w-8 h-8 p-0"
                >
                  <ApperIcon name="Minus" size={16} />
                </Button>
                <span className="w-8 text-center font-medium">
                  {item.quantity}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuantityChange(item.quantity + 1)}
                  className="w-8 h-8 p-0"
                >
                  <ApperIcon name="Plus" size={16} />
                </Button>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="font-semibold text-primary">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRemove}
                  className="w-8 h-8 p-0 text-error hover:text-error hover:bg-error/10"
                >
                  <ApperIcon name="Trash2" size={16} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default CartItem;