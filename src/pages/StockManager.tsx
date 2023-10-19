import React, { useEffect, useState } from "react";
import { TECollapse, TERipple } from "tw-elements-react";

import UpdateStock from "../components/updateStockForm";

interface AccordionData {
  ItemID: number;
  Category: string;
  ItemName: string;
  Price: number;
  ItemDescription: string;
  ImageBase64: string;
  StockQuantity: number;
  IsDeleted: boolean;
}

export default function ManageStockAccordion(): JSX.Element {
  const [activeElement, setActiveElement] = useState("");
  const [data, setData] = useState<AccordionData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://project34api.azurewebsites.net/api/burgers");
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleClick = (value: string) => {
    if (value === activeElement) {
      setActiveElement("");
    } else {
      setActiveElement(value);
    }
  };
  return (
    <div id="accordionExample">
      {data.map((item, index) => (
        <div className="rounded-2xl border-2 border-slate-950 w-2/4 mb-2  m-auto">
          <h2 className="mb-0" id="headingOne">
            <button
              className={`${
                activeElement === `element${index + 1}` &&
                `text-primary  dark:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]`
              } group relative flex w-full items-center rounded-2xl border-2 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none  dark:text-dark`}
              type="button"
              onClick={() => handleClick(`element${index + 1}`)}
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              {item.ItemName}
              <span
                className={`${
                  activeElement === `element${index + 1}`
                    ? `rotate-[-180deg] -mr-1`
                    : `rotate-0 fill-[#212529]  dark:fill-white`
                } ml-auto h-5 w-5 shrink-0 fill-[#336dec] transition-transform duration-200 ease-in-out motion-reduce:transition-none dark:fill-blue-300`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </span>
            </button>
          </h2>
          <TECollapse
            show={activeElement === `element${index + 1}`}
            className="!mt-0 !rounded-b-none !shadow-none"
          >
            <div className="px-5 py-4">
              <div className="block rounded-lg  shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] ">
                <TERipple>
                  <div className="relative overflow-hidden bg-cover bg-no-repeat">
                    <img
                      className="rounded-t-lg h-20 pl-6"
                      src={item.ImageBase64}
                      alt=""
                    />
                  </div>
                </TERipple>
                <div className="p-6">
                  <h5 className="mb-2 text-xl font-medium leading-tight ">
                    Description
                  </h5>
                  <p className="mb-4 text-base">{item.ItemDescription}</p>
                  <p className="mb-4 text-base ">
                    Current Stock : {item.StockQuantity}
                  </p>
                  <UpdateStock stockQuantiy={item.ItemID} />
                </div>
              </div>
            </div>
          </TECollapse>
        </div>
      ))}
    </div>
  );
}
