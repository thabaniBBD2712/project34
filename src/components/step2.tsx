import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { burgerType } from "../helpers/globalState";
import {
  isNextButttonEnabled,
  order,
  addCatalog,
  cartState,
} from "../helpers/globalState";

import PageLoader from "./pageloader/pageloader";
interface Step2Props {
  values: any;
}
interface OrderItem {
  ItemID: number;
  Category: string;
  ItemName: string | null;
  Price: number;
  ItemDescription: string | null;
  ImageBase64: string;
  StockQuantity: number;
}
interface TableData {
  ItemID: number;
  Category: string;
  ItemName: string;
  Price: number;
  ItemDescription: string;
  ImageBase64: string;
  StockQuantity: number;
  IsDeleted: boolean;
}

interface MenuItem {
  id: number;
  name: string;
  price: number;
  img: string;
}
const Step2: React.FC<Step2Props> = ({ values }) => {
  const [isNextButtonDisabled, setIsNextButtonDisabled] =
    useAtom(isNextButttonEnabled);
  const [data, setData] = useState<TableData[]>([]);
  const [object, setObject] = useAtom(order);
  const [mycart, setMyCart] = useAtom(cartState);
  const [catalogdata, setCatalogData] = useAtom(addCatalog);
  const globalCatalog = catalogdata as TableData[];
  const [burger, setBurger] = useAtom(burgerType);
  const typedOrderObject = globalCatalog as OrderItem[];
  const globalBurger = burger as MenuItem;
  const localStorageUserId = localStorage.getItem("userId");
  const [cartsItems, setCartItems] = useState({});
  const currentDate = new Date();
  const formattedDate = currentDate.toDateString();
  useEffect(() => {
    setIsNextButtonDisabled(true);
    const fetchData = async () => {
      try {
        const response = await fetch("https://project34api.azurewebsites.net/api/burgers");
        const jsonData = await response.json();
        const newData = jsonData.map((item: any) => ({
          ...item,
          StockQuantity: 0,
        }));
        setData(newData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleDecrement = (index: number) => {
    const newData = [...globalCatalog];
    if (newData[index].StockQuantity > 0) {
      newData[index].StockQuantity--;
    }
    setData(newData);
  };

  const handleIncrement = (index: number) => {
    const newData = [...globalCatalog];
    newData[index].StockQuantity++;
    updateOrderItem(newData[index]);
    setData(newData);
    setIsNextButtonDisabled(false);

    const filteredNewData = newData.filter((item) => item.StockQuantity > 0);
    setObject(filteredNewData);
  };

  const updateOrderItem = (updatedItem: TableData) => {
    const itemExistsIndex = object.findIndex(
      (item: any) => item.ItemID === updatedItem.ItemID
    );

    if (itemExistsIndex !== -1) {
      const updatedOrder = [...object];
      updatedOrder[itemExistsIndex] = {
        ...updatedOrder[itemExistsIndex],
        StockQuantity: updatedItem.StockQuantity,
      };
      setObject(updatedOrder);
    }
  };

  function removeItemByItemId(itemIdToRemove: number) {
    const updatedItems = globalCatalog.filter(
      (item) => item.ItemID !== itemIdToRemove
    );
    setCatalogData(updatedItems);
  }

  const wrappedObject = {
    userId: localStorageUserId,
    name: globalBurger.name,
    burgerDefaultPrice: globalBurger.price,
    date: formattedDate,
    clobalQuantity: 1,
    orderStatus: 0,
    globalCatalog,
  };

  const wrappedObjectPOST = {
    userId: localStorageUserId,
    name: globalBurger.name,
    burgerDefaultPrice: globalBurger.price,
  };
  const wrappedObject1 = globalCatalog.map((item) => ({
    ...wrappedObjectPOST,
    ItemID: item.ItemID,
    ItemQauntity: item.StockQuantity,
  }));

  useEffect(() => {
    setCartItems(wrappedObject);
    setMyCart(cartsItems);
    console.log(wrappedObject1);
  }, [mycart]);

  return (
    <div>
      <div className="container mx-auto mt-10">
        {globalCatalog.length > 0 ? (
          <div className="flex shadow-md my-10 justify-center">
            <div className="w-3/4 bg-white px-10 py-10">
              <div className="flex justify-between border-b pb-8">
                <h1 className="font-semibold text-2xl">
                  Top items for beef burger
                </h1>
              </div>

              <div className="flex mt-10 mb-5">
                <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
                  Product Details
                </h3>
                <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                  Quantity
                </h3>
                <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                  Total Price
                </h3>
              </div>
              {globalCatalog.map((item, index) => (
                <div className="flex items-center bg-gray-100 -mx-8 px-6 py-5 rounded-3xl mb-4">
                  <div className="flex w-2/5">
                    <div className="w-20">
                      <img className="h-24" src={item.ImageBase64} alt="" />
                    </div>
                    <div className="flex flex-col justify-between ml-4 flex-grow">
                      <span className="font-bold text-sm">{item.ItemName}</span>
                      <span className="text-red-500 text-xs">
                        {item.Category}
                      </span>
                      <p className="font-semibold hover:text-red-500 text-gray-500 text-xs">
                        PRICE :<b> R{item.Price.toFixed(2)}</b>
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-center w-1/5">
                    <button onClick={() => handleDecrement(index)}>
                      <svg
                        className="fill-current text-gray-600 w-3"
                        viewBox="0 0 448 512"
                      >
                        <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                      </svg>
                    </button>
                    <input
                      className="mx-2 border text-center w-8"
                      type="text"
                      value={item.StockQuantity}
                    />
                    <button onClick={() => handleIncrement(index)}>
                      <svg
                        className="fill-current text-gray-600 w-3"
                        viewBox="0 0 448 512"
                      >
                        <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                      </svg>
                    </button>
                  </div>
                  <span className="text-center w-1/5 font-semibold text-sm">
                    R{(item.Price * item.StockQuantity).toFixed(2)}
                  </span>
                  <button onClick={() => removeItemByItemId(item.ItemID)}>
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
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="m-auto">
            <PageLoader />
          </div>
        )}
      </div>
    </div>
  );
};

export default Step2;
