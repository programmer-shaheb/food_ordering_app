import React, { useState } from "react";
import { useContextValue } from "../../store/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const cartContext = useContextValue();
  const [showCheckout, setShowCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const showCheckoutForm = () => {
    setShowCheckout(true);
  };

  const closeCheckoutForm = () => {
    setShowCheckout(false);
  };

  const cartItemRemoveHandler = (id) => {
    cartContext.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    console.log(item);
    cartContext.addItem(item);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://react-challenge-bb9bb-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          ordersItems: cartContext.items,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    cartContext.resetCart();
  };

  const cartItems = (
    <ul>
      {cartContext?.items.map((item) => (
        <CartItem
          key={item.id}
          id={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`;

  const itemAvailable = cartContext?.items.length > 0;

  const modalActions = (
    <>
      <div className={classes.actions}>
        <button onClick={props.onClose}>Close</button>
        {itemAvailable && <button onClick={showCheckoutForm}>Checkout</button>}
      </div>
    </>
  );

  const cartModalContent = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {showCheckout ? (
        <Checkout onClose={closeCheckoutForm} onConfirm={submitOrderHandler} />
      ) : (
        modalActions
      )}
    </>
  );

  const didSubmitModalContent = (
    <>
      <p>Successfully sent the order!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </>
  );

  const isSubmittingModalContent = <p>Submitting Data......</p>;

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
