import axios from "axios";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { burgerType } from "../helpers/globalState";
import { generateRandomId } from "../helpers/randomOrderId";
import beef from "../images/beef.png";
import chicken from "../images/chicken.png";
import vagan from "../images/vegan2.png";

interface MenuItem {
  id: number;
  name: string;
  price: number;
  img: string;
}

export default function Cart() {
  const [showModal, setShowModal] = React.useState(false);
  const [cartItems, setCartItems] = useState<Array<{}>>([]);
  const localStorageUserId = localStorage.getItem("userId");
  const retrievedArrayString = localStorage.getItem("cart");
  const [burger, setBurger] = useAtom(burgerType);
  const [itemQuantities, setItemQuantities] = useState<number[]>([]);

  useEffect(() => {
    if (retrievedArrayString !== null) {
      var parsedData = JSON.parse(retrievedArrayString);
      setCartItems(parsedData);
    }
  }, [retrievedArrayString]);

  function burgerImage(burgerType: any) {
    if (burgerType?.includes("Beef")) {
      return beef;
    }
    if (burgerType?.includes("Vegan")) {
      return vagan;
    }
    if (burgerType?.includes("Chicken")) {
      return chicken;
    }
  }

  function successPage() {}
  const generateOrderId = generateRandomId();
  const transformedData = cartItems.flatMap((item: any) =>
    item.globalCatalog.map((component: any) => ({
      orderID: generateOrderId,
      userId: item.userId,
      name: item.name,
      burgerQuantity: item.clobalQuantity,
      burgerDefaultPrice: item.burgerDefaultPrice,
      date: item.date,
      orderStatus: item.orderStatus,
      ItemID: component.ItemID,
      ItemQuantity: component.StockQuantity,
    }))
  );

  const removeItemAtIndex = (indexToRemove: any) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = [...prevCartItems];

      updatedCartItems.splice(indexToRemove, 1);

      if (retrievedArrayString !== null) {
        const parsedData = JSON.parse(retrievedArrayString);

        parsedData.push(updatedCartItems);
        localStorage.setItem("cart", JSON.stringify(updatedCartItems));
      }

      return updatedCartItems;
    });
  };

  const [data, setData] = useState(() => {
    const storedData = localStorage.getItem("cart");
    return storedData ? JSON.parse(storedData) : "";
  });
  const updateClobalQuantity = (index: number) => {
    setData((prevData: any) => {
      const updatedData = [...prevData];
  
      updatedData[index] = {
        ...updatedData[index],
        clobalQuantity: (updatedData[index].clobalQuantity || 0) + 1,
      };
      if (retrievedArrayString !== null) {
        const parsedData = JSON.parse(retrievedArrayString);
  
        parsedData.push(updatedData);
        localStorage.setItem("cart", JSON.stringify(updatedData));
      }
      return updatedData;
    });
  };
  
  const decrementQuantity = (index: number) => {
    setData((prevData: any) => {
      const updatedData = [...prevData];
      const newQuantity = (updatedData[index].clobalQuantity || 0) - 1;
      updatedData[index] = {
        ...updatedData[index],
        clobalQuantity: newQuantity > 0 ? newQuantity : 1,
      };
      if (retrievedArrayString !== null) {
        const parsedData = JSON.parse(retrievedArrayString);
  
        parsedData.push(updatedData);
        localStorage.setItem("cart", JSON.stringify(updatedData));
      }
      return updatedData;
    });
  };
  

  let total = 0;
cartItems.forEach((item:any) => {
    const itemPrice = item.burgerDefaultPrice * item.clobalQuantity + 
        item.globalCatalog.reduce((acc:any, x:any) => acc + x.Price * x.StockQuantity * item.clobalQuantity, 0);
    total += itemPrice;
});

  const postItem = async (item: any) => {
    try {
      const response = await axios.post(
        "https://project34api.azurewebsites.net/api/order",
        item
      );
      console.log("Response from server:", response.data);
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  const handlePostData = () => {
    transformedData.forEach((item: any) => {
      postItem(item);
    });
    setTimeout(function () {
      window.location.href = "/success";
    }, 1000);
  };
  return (
    <>
      <div className="flex justify-end pr-12 ">
        <button className="relative py-2" onClick={() => setShowModal(true)}>
          <div className="t-0 absolute left-3">
            <p className="flex h-2 w-2 items-center justify-center rounded-full bg-red-600 p-3 text-xs text-white">
              {cartItems.length}
            </p>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="file: mt-4 h-6 w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
        </button>
      </div>
      {showModal ? (
        <>
          <div className="justify-end items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none mr-20 mt-2 ">
            <div className="relative w-auto ">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div>
                  <div className="">
                    <div className="flex flex-column">
                      <h1 className="text-2xl font-semibold text-gray-900 pt-[2rem] pl-[2rem]">
                        Your Basket
                      </h1>
                      <button onClick={() => setShowModal(false)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="absolute right-0 top-0 m-3 h-6 w-6 cursor-pointer text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="mx-auto mt-8 max-w-2xl md:mt-12">
                      <div className="bg-white shadow">
                        <div className="px-4 py-6 sm:px-8 sm:py-10">
                          <div className="flow-root">
                            <ul className="-my-8">
                              {cartItems.map((item: any, index: number) => (
                                <li className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
                                  <div className="shrink-0">
                                    <img
                                      className="h-24 w-24 max-w-full rounded-lg object-cover"
                                      src={burgerImage(item.name)}
                                      alt="burger"
                                    />
                                  </div>

                                  <div className="relative flex flex-1 flex-col justify-between">
                                    <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                                      <div className="pr-8 sm:pr-5">
                                        <p className="text-base font-semibold text-gray-900">
                                          {item.name} -R
                                          {item.burgerDefaultPrice}
                                        </p>
                                        {item.globalCatalog.map(
                                          (x: any, index: number) => (
                                            <p className="mx-0 mt-1 mb-0 text-sm text-gray-400">
                                              {x.ItemName}-R{x.Price} x
                                              {x.StockQuantity}
                                            </p>
                                          )
                                        )}
                                      </div>

                                      <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                                        <p className="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">
                                          R
                                          {(
                                            item.globalCatalog.reduce(
                                              (totalPrice: any, x: any) => {
                                                const itemTotalPrice =
                                                  x.Price *
                                                  x.StockQuantity *
                                                  item.clobalQuantity;
                                                return (
                                                  totalPrice + itemTotalPrice
                                                );
                                              },
                                              0
                                            ) +
                                            item.burgerDefaultPrice *
                                              item.clobalQuantity
                                          ).toFixed(2)}
                                        </p>

                                        <div className="sm:order-1">
                                          <div className="mx-auto flex h-8 items-stretch text-gray-600">
                                            <button
                                              onClick={() =>
                                                decrementQuantity(index)
                                              }
                                              className="flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-red-600 hover:text-white"
                                            >
                                              -
                                            </button>

                                            <div className="flex w-full items-center justify-center bg-gray-100 px-4 text-xs uppercase transition">
                                              {item.clobalQuantity}
                                            </div>
                                            <button
                                              onClick={() =>
                                                updateClobalQuantity(index)
                                              }
                                              className="flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-red-600 hover:text-white"
                                            >
                                              +
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">
                                      <button
                                        onClick={() => removeItemAtIndex(index)}
                                        type="button"
                                        className="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900"
                                      >
                                        <svg
                                          className="h-5 w-5"
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
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="mt-6 flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900">
                              Total
                            </p>
                            <p className="text-2xl font-semibold text-gray-900">
                              R{total.toFixed(2)}
                            </p>
                          </div>

                          <div className="mt-6 text-center">
                            <button
                              onClick={handlePostData}
                              type="button"
                              className="group inline-flex w-full items-center justify-center rounded-md bg-red-600 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow"
                            >
                              Checkout
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="group-hover:ml-8 ml-4 h-6 w-6 transition-all"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                stroke-width="2"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
