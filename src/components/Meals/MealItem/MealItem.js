import React from "react";
import { useContextValue } from "../../../store/cart-context";
import classes from "./MealItem.module.css";
import MealsItemForm from "./MealsItemForm";

const MealItem = ({ id, name, description, price }) => {
  const { addItem } = useContextValue();

  const addToCartHandler = (amount) => {
    const newItem = {
      id: id,
      name: name,
      price: price,
      amount: amount,
    };
    addItem(newItem);
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{name}</h3>
        <div className={classes.description}>{description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealsItemForm id={id} onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
