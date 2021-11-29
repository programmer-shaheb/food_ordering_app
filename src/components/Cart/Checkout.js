import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isNotFiveChar = (value) => value.trim().length !== 5;

const Checkout = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });

  const nameRef = useRef();
  const streetRef = useRef();
  const pcRef = useRef();
  const cityRef = useRef();

  const handleForm = (e) => {
    e.preventDefault();

    const enteredName = nameRef.current.value;
    const enteredStreet = streetRef.current.value;
    const enteredPC = pcRef.current.value;
    const enteredCity = cityRef.current.value;

    const enteredNameValid = !isEmpty(enteredName);
    const enteredCityValid = !isEmpty(enteredCity);
    const enteredStreetValid = !isEmpty(enteredStreet);
    const enteredPCValid = !isNotFiveChar(enteredPC);

    setFormInputsValidity({
      name: enteredNameValid,
      street: enteredStreetValid,
      city: enteredCityValid,
      postalCode: enteredPCValid,
    });

    const formIsValid =
      enteredNameValid &&
      enteredCityValid &&
      enteredStreetValid &&
      enteredPCValid;

    const userInfo = {
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postalCode: enteredPC,
    };

    if (!formIsValid) {
      return;
    } else {
      props.onConfirm(userInfo);
    }
  };

  const nameControlClasses = `${classes.control} ${
    formInputsValidity.name ? "" : classes.invalid
  }`;
  const streetControlClasses = `${classes.control} ${
    formInputsValidity.street ? "" : classes.invalid
  }`;
  const postalCodeControlClasses = `${classes.control} ${
    formInputsValidity.postalCode ? "" : classes.invalid
  }`;
  const cityControlClasses = `${classes.control} ${
    formInputsValidity.city ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={handleForm}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input ref={nameRef} type="text" id="name" />
        {!formInputsValidity.name && <p>Please enter a valid name</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" ref={streetRef} id="street" />
        {!formInputsValidity.street && <p>Please enter a valid street</p>}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={pcRef} />
        {!formInputsValidity.postalCode && (
          <p>Please enter a valid Postal Code with 5 characters</p>
        )}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityRef} />
        {!formInputsValidity.city && <p>Please enter a valid city</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onClose}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
