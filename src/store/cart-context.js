import { createContext, useContext } from "react";

const CartContext = createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
});

export const useContextValue = () => useContext(CartContext);

export default CartContext;
