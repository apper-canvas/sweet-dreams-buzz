import { createContext, useContext, useReducer, useEffect } from "react";
import { toast } from "react-toastify";

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find(
        item => item.productId === action.payload.productId &&
        JSON.stringify(item.customization) === JSON.stringify(action.payload.customization)
      );

      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.productId === action.payload.productId &&
            JSON.stringify(item.customization) === JSON.stringify(action.payload.customization)
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          )
        };
      }

      return {
        ...state,
        items: [...state.items, action.payload]
      };
    }
    case "REMOVE_ITEM": {
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
    }
    case "UPDATE_QUANTITY": {
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };
    }
    case "CLEAR_CART": {
      return {
        ...state,
        items: []
      };
    }
    default:
      return state;
  }
};

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: []
  });

  const addToCart = (product, customization = {}, quantity = 1) => {
    const cartItem = {
      id: Date.now() + Math.random(),
      productId: product.Id,
      productName: product.name,
      productImage: product.images[0],
      quantity,
      customization,
      price: customization.totalPrice || product.basePrice
    };

    dispatch({ type: "ADD_ITEM", payload: cartItem });
    toast.success("Added to cart!");
  };

  const removeFromCart = (itemId) => {
    dispatch({ type: "REMOVE_ITEM", payload: itemId });
    toast.info("Removed from cart");
  };

  const updateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    dispatch({ type: "UPDATE_QUANTITY", payload: { id: itemId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
    toast.info("Cart cleared");
  };

  const getCartTotal = () => {
    return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemCount = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  const value = {
    items: state.items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemCount
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export default CartProvider;