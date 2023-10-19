import React, { useContext, useState } from "react";
import { FormikValues } from "formik";
import * as Yup from "yup";
import Step1, { MyContext } from "../components/step1";

import Step2 from "../components/step2";
import Step3 from "../components/step3";
import { Step, Stepper } from "react-form-stepper";
import { isNextButttonEnabled } from "../helpers/globalState";
import { useAtom } from "jotai";
import Navbar from "../components/navbar";
import Cart from "../components/cart";
import { order, cartState, manageOrder } from "../helpers/globalState";
import Catalog from "../components/catalog";

const BurgerOnboarding: React.FC = () => {
  const [isButtonDisabled] = useAtom(isNextButttonEnabled);
  const [cartItems, setCartItems] = useAtom(cartState);
  const [orderObject, setOrderObject] = useAtom(order);

  const [step, setStep] = useState(0);
  const nextStep = () => setStep((prevStep) => Math.min(prevStep + 1, 3 - 1));
  const prevStep = () => setStep((prevStep) => Math.max(prevStep - 1, 0));
  const isLastStep = step === 2;

  const retrievedArrayString = localStorage.getItem("cart");

  function addToCart() {
    if (retrievedArrayString !== null) {
      const parsedData = JSON.parse(retrievedArrayString);

      parsedData.push(cartItems);
      localStorage.setItem("cart", JSON.stringify(parsedData));
    } else {
      const cartQ = [];
      cartQ.push(cartItems);
      localStorage.setItem("cart", JSON.stringify(cartQ));
    }

    //  localStorage.setItem("orders", JSON.stringify(cartQ));
    window.location.href = "/menu";
  }
  return (
    <>
      <Navbar />
      {retrievedArrayString !== null && <Cart />}
      <Stepper activeStep={step}>
        <Step label="Choose Burger" />
        <Step label="Build Burger" />
        <Step label="Verify Your Burger" />
      </Stepper>
      {step === 0 && <Step1 values={""} />}
      {step === 1 && <Catalog values={""} />}
      {step === 2 && <Step2 values={""} />}

      <div className="flex justify-between bg-slate-300 py-4 px-8 fixed bottom-0 left-0 w-full">
        {step > 0 ? (
          <button
            onClick={prevStep}
            type="button"
            className="px-4 py-2 text-white bg-gray-500 hover:bg-gray-600 rounded mr-auto"
          >
            Back
          </button>
        ) : (
          ""
        )}
        {!isLastStep ? (
          <button
            onClick={nextStep}
            type="button"
            className={`px-4 py-2 text-white ${
              isButtonDisabled ? "bg-slate-600" : "bg-red-600 hover:bg-red-800"
            }  rounded ml-auto`}
            disabled={isButtonDisabled}
          >
            Next
          </button>
        ) : (
          <button
            className="group flex w-44 cursor-pointer select-none items-center justify-center rounded-md bg-black px-4 py-2 text-white"
            onClick={addToCart}
          >
            Add to Order
            <svg
              className="flex-0  ml-4 h-6 w-4 transition-all"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        )}
      </div>
    </>
  );
};

export default BurgerOnboarding;
