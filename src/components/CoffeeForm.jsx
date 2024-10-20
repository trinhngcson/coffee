import { useState } from "react";
import { coffeeOptions } from "../utils";
import { Modal } from "./Modal";
import Authentication from "./Authentication";
import { useAuth } from "../context/AuthContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const CoffeeForm = (props) => {
  const { isAuth } = props;
  const [showModal, setShowModal] = useState(false);
  const [coffeeType, setCoffeeType] = useState(false);
  const [coffeeSelect, setCoffeeSelect] = useState(null);
  const hours = [...Array(24).keys()];
  const mins = [...Array(60).keys()];
  const [coffeeCost, setCoffeeCost] = useState(0);
  const [hour, setHour] = useState(0);
  const [min, setMin] = useState(0);

  const { globalData, setGlobalData, globalUser } = useAuth();

  async function handleSubmitForm() {
    if (!isAuth) {
      setShowModal(true);
      return;
    }
    if (!coffeeSelect) {
      return;
    }

    try {
      const newGlobalData = {
        ...(globalData || {}),
      };
      const nowTime = Date.now();
      const timeToSubtract = hour * 60 * 60 * 1000 + min * 60 * 100;
      const timestamp = nowTime - timeToSubtract;
      const newData = { name: coffeeSelect, cost: coffeeCost };

      newGlobalData[timestamp] = newData;
      setGlobalData(newGlobalData);

      const userRef = doc(db, "users", globalUser.uid);
      const res = await setDoc(
        userRef,
        { [timestamp]: newData },
        { merge: true }
      );
      setCoffeeSelect(null);
      setHour(0);
      setMin(0);
      setCoffeeCost(0);
    } catch (error) {
      console.log(error);
    }
  }
  function handleCloseModal() {
    setShowModal(false);
  }
  return (
    <>
      {showModal && (
        <Modal handleCloseModal={handleCloseModal}>
          <Authentication handleCloseModal={handleCloseModal} />
        </Modal>
      )}
      <div className="section-header">
        <i className="fa-solid fa-pencil" />
        <h2>Start Tracking Today</h2>
      </div>
      <h4>Select coffee type</h4>
      <div className="coffee-grid">
        {coffeeOptions.slice(0, 5).map((coffee, coffeeIndex) => {
          return (
            <button
              onClick={() => {
                setCoffeeSelect(coffee.name);
                setCoffeeType(false);
              }}
              className={
                "button-card " +
                (coffee.name === coffeeSelect ? "coffee-button-selected" : "")
              }
              key={coffeeIndex}
            >
              <h4>{coffee.name}</h4>
              <h4>{coffee.caffeine} mg</h4>
            </button>
          );
        })}
        <button
          onClick={() => {
            setCoffeeType(true);
            setCoffeeSelect(false);
          }}
          className={
            "button-card " + (coffeeType ? "coffee-button-selected" : "")
          }
        >
          <h4>Other</h4>n/a
        </button>
      </div>
      {coffeeType && (
        <select
          onChange={(e) => {
            setCoffeeSelect(e.target.value);
          }}
          id="coffee-list"
          name="coffee-list"
        >
          <option value={null}>Select type</option>
          {coffeeOptions.map((option, optionIndex) => {
            return (
              <option value={option.name} key={optionIndex}>
                {option.name} ({option.caffeine}mg)
              </option>
            );
          })}
        </select>
      )}
      <h4>Add the cost ($)</h4>
      <input
        className="w-full"
        type="number"
        placeholder="4.5"
        min="0"
        value={coffeeCost}
        onChange={(e) => {
          setCoffeeCost(e.target.value);
        }}
      />
      <h4>Time since consumption</h4>
      <div className="time-entry">
        <div>
          <h6>Hours</h6>
          <select
            id="hours-select"
            onChange={(e) => {
              setHour(e.target.value);
            }}
            value={hour}
          >
            {hours.map((hour, hourIndex) => {
              return (
                <option key={hourIndex} value={hour}>
                  {hour}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <h6>Mins</h6>
          <select
            id="mins-select"
            value={min}
            onChange={(e) => setMin(e.target.value)}
          >
            {mins.map((min, minIndex) => {
              return (
                <option key={minIndex} value={min}>
                  {min}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <button onClick={handleSubmitForm}>
        <p>Add Entry</p>
      </button>
    </>
  );
};

export default CoffeeForm;
