import React, { useState } from "react";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import { useEffect } from "react";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchingMeals = async () => {
      setLoading(true);
      setError(false);
      try {
        const response = await fetch(
          "https://react-challenge-bb9bb-default-rtdb.firebaseio.com/meals.json"
        );
        const data = await response.json();

        const loadedMeals = [];

        for (const key in data) {
          loadedMeals.push({
            id: key,
            name: data[key].name,
            description: data[key].description,
            price: data[key].price,
          });
        }
        setMeals(loadedMeals);
        setLoading(false);
        setError(false);
      } catch (error) {
        console.log(error.message);
        setError(true);
        setLoading(false);
      }
    };

    fetchingMeals();
  }, []);

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        {loading && <h2>Loading...</h2>}
        {error && <h2>Something Went Wrong</h2>}
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
