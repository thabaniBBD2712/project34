import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import {
  isNextButttonEnabled,
  addCatalog,
  burgerType,
  selectedBurger,
} from "../helpers/globalState";
import FullPageLoader from "./fullpageloader/fullpageloader";

interface Step2Props {
  values: any;
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

const Catalog: React.FC<Step2Props> = ({ values }) => {
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useAtom(
    isNextButttonEnabled
  );
  const [data, setData] = useState<TableData[]>([]);
  const [catalog, setCatalog] = useAtom(addCatalog);
  const [burger, setBurger] = useAtom(burgerType);
  const [burgerName, setBurgerName] = useAtom(selectedBurger);
  const [itemAdded, setItemAdded] = useState<boolean[]>(
    Array(data.length).fill(false)
  );
  const [selectedItems, setSelectedItems] = useState<TableData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setIsNextButtonDisabled(true);
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://project34api.azurewebsites.net/api/burgers"
        );
        const jsonData = await response.json();

        if (Array.isArray(jsonData)) {
          const newData = jsonData.map((item: any) => ({
            ...item,
            StockQuantity: 1,
          }));
          setData(newData);
        } else {
          console.error("jsonData is not an array.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const toggleItem = (index: number) => {
    const updatedItemAdded = [...itemAdded];
    updatedItemAdded[index] = !updatedItemAdded[index];
    setItemAdded(updatedItemAdded);

    if (updatedItemAdded[index]) {
      setSelectedItems([...selectedItems, data[index]]);
    } else {
      const updatedSelectedItems = selectedItems.filter(
        (item) => item.ItemID !== data[index].ItemID
      );
      setSelectedItems(updatedSelectedItems);
    }
  };

  if (selectedItems.length > 0) {
    setIsNextButtonDisabled(false);
  }
  setCatalog(selectedItems);

  const filteredData = data.filter((item) =>
    item.ItemName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <div className="container mx-auto">
        {data.length > 0 ? (
          <section className="bg-white text-gray-700 ">
            <div className="mx-auto max-w-screen-xl px-4 ">
              <h1 className="text-3xl">{burgerName} Burger Items</h1>
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mt-6">
                <span className="text-sm font-semibold"> available Items </span>

                <div className="relative text-sm focus:outline-none group mt-4 sm:mt-0 rounded-md">
                  <svg
                    className="absolute left-2 block h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8" className=""></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65" className=""></line>
                  </svg>
                  <input
                    type="name"
                    name="search"
                    className="h-12 w-full cursor-text rounded-md border border-gray-100 bg-gray-100 py-4 pr-40 pl-12 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    placeholder="Search burger items"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                  />
                </div>
              </div>
              <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-x-6 gap-y-12 w-full mt-6"></div>
              <div className=" grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-4 mt-8 mb-16">
                {filteredData.map((item: TableData, index: number) => {
                  if (item.Category === burgerName||item.Category==='All') {
                    return (
                      <article
                        className="relative flex flex-col overflow-hidden mb-10 rounded-lg border"
                        key={item.ItemID}
                      >
                        <div className="aspect-square overflow-hidden">
                          <img
                            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-125"
                            src={item.ImageBase64}
                            alt=""
                          />
                        </div>
                        <div className="absolute top-0 m-2 rounded-full bg-white">
                          <p className="rounded-full bg-black p-1 text-[8px] font-bold uppercase tracking-wide text-white sm:py-1 sm:px-3">
                            Sale
                          </p>
                        </div>
                        <div className="my-4 mx-auto flex w-10/12 flex-col items-start justify-between">
                          <div className="mb-2 flex">
                            <p className="mr-3 text-sm font-semibold">
                              R{item.Price}
                            </p>
                            <del className="text-xs text-gray-400">
                              R{item.Price + item.Price * 0.3}
                            </del>
                          </div>
                          <h3 className="mb-2 text-sm text-gray-400">
                            {item.ItemName}
                          </h3>
                        </div>
                        <button
                          className="group mx-auto mb-2 flex h-10 w-10/12 items-stretch overflow-hidden rounded-md text-gray-600"
                          onClick={() => toggleItem(index)}
                        >
                          <div
                            className={
                              itemAdded[index]
                                ? "flex w-full items-center justify-center bg-red-600 text-xs uppercase transition text-white"
                                : "flex w-full items-center justify-center bg-gray-100 text-xs uppercase transition group-hover:bg-red-600 group-hover:text-white"
                            }
                          >
                            {itemAdded[index] ? "Remove" : "Add"}
                          </div>
                          {itemAdded[index] ? (
                            <div className="flex items-center justify-center bg-red-600 px-5 transition group-hover:bg-red-600 text-white">
                              x
                            </div>
                          ) : (
                            ""
                          )}
                        </button>
                      </article>
                    );
                  } else {
                    return null; // If the condition is not met, render nothing
                  }
                })}
              </div>
            </div>
          </section>
        ) : (
          <div className="m-auto">
            <FullPageLoader />
          </div>
        )}
      </div>
    </div>
  );
};

export default Catalog;
