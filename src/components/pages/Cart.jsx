import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import CartItem from "@/components/molecules/CartItem";
import Empty from "@/components/ui/Empty";
import { useCart } from "@/hooks/CartProvider";

const Cart = () => {
  const { items, clearCart, getCartTotal } = useCart();

  if (items.length === 0) {
    return (
      <Empty
        title="Your cart is empty"
        description="Add some delicious treats to your cart to get started!"
        action="Browse Products"
        href="/"
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="font-display text-4xl font-bold text-gray-900 mb-4">
              Shopping Cart
            </h1>
            <p className="text-xl text-gray-600">
              Review your items and proceed to checkout
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Cart Items ({items.length})
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={clearCart}
                className="text-gray-600 hover:text-error"
              >
                <ApperIcon name="Trash2" size={16} className="mr-2" />
                Clear Cart
              </Button>
            </div>

            <div className="space-y-4">
              <AnimatePresence>
                {items.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Order Summary
              </h3>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery</span>
                  <span className="font-medium">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${(getCartTotal() * 0.08).toFixed(2)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-lg font-bold text-primary">
                      ${(getCartTotal() * 1.08).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Button className="w-full" size="lg">
                  <ApperIcon name="CreditCard" size={20} className="mr-2" />
                  Proceed to Checkout
                </Button>
                
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/">
                    <ApperIcon name="ArrowLeft" size={16} className="mr-2" />
                    Continue Shopping
                  </Link>
                </Button>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center text-sm text-gray-600">
                  <ApperIcon name="Truck" size={16} className="mr-2" />
                  <span>Free delivery on orders over $50</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;