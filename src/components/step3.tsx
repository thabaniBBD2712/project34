import { useAtom } from "jotai";
import React, { useEffect } from "react";
import { order, burgerType, cartState } from "../helpers/globalState";

import beef from "../images/beef.png";
import chicken from "../images/chicken.png";
import vagan from "../images/vegan2.png";

interface OrderItem {
  ItemID: number;
  Category: string;
  ItemName: string | null;
  Price: number;
  ItemDescription: string | null;
  ImageBase64: string;
  StockQuantity: number;
}

interface MenuItem {
  id: number;
  name: string;
  price: number;
  img: string;
}

const Step3: React.FC = () => {
  const [orderObject, setOrderObject] = useAtom(order);
  const [burger, setBurger] = useAtom(burgerType);
  const typedOrderObject = orderObject as OrderItem[];
  const globalBurger = burger as MenuItem;
  const [manageCartState, setManageCartState] = useAtom(cartState);
  const localStorageUserId = localStorage.getItem("userId");

  function removeItemByItemId(itemIdToRemove: number) {
    const updatedItems = typedOrderObject.filter(
      (item) => item.ItemID !== itemIdToRemove
    );
    setOrderObject(updatedItems);
  }
  const wrappedObject = {
    userId: localStorageUserId,
    name: globalBurger.name,
    burgerDefaultPrice: globalBurger.price,
    orderObject,
  };
  useEffect(() => {
    setManageCartState(wrappedObject);
  }, []);

  return (
    <div className="mx-auto max-w-screen-xl px-4 md:px-8">
      <div className="relative mb-10 pt-8 md:mb-16">
        <h2 className="mb-4 text-center  text-2xl  md:mb-6 md:text-4xl">
          Selected Items for your burger
        </h2>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 sm:gap-12 lg:grid-cols-3">
        {orderObject.map((item: any, index: number) => (
          <article
            key={index}
            className="relative select-none bg-gray-50 px-8 pt-10  shadow-md"
          >
            <h1 className="text-sm uppercase">{item.ItemName}</h1>
            <div className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
              <div className="relative flex flex-1 flex-col justify-between">
                <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                  <div className="pr-8 sm:pr-5">
                    <p className="text-base font-semibold text-gray-900">
                      {item.Category}
                    </p>
                    <p className="mx-0 mt-1 mb-0 text-sm text-gray-400">
                      TOTAL PPICE : R{item.Price * item.StockQuantity}
                    </p>
                  </div>

                  <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                    <div className="shrink-0 relative">
                      <span className="absolute top-1 left-1 flex h-6 w-6 items-center justify-center rounded-full border bg-white text-sm font-medium text-gray-500 shadow sm:-top-2 sm:-right-2">
                        {item.StockQuantity}
                      </span>
                      <img
                        className="h-24 w-24 max-w-full rounded-lg object-cover"
                        src={item.ImageBase64}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={() => removeItemByItemId(item.ItemID)}
              className="absolute bottom-0 right-0 flex h-12 w-12 items-center justify-center bg-red-600 text-white transition-all hover:w-16"
            >
              <svg
                className="block h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                  className=""
                ></path>
              </svg>
            </button>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Step3;
