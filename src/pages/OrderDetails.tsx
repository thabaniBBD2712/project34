import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/navbar";
import beef from "../images/beef.png";
import chicken from "../images/chicken.png";
import vagan from "../images/vegan2.png";
import FullPageLoader from "../components/fullpageloader/fullpageloader";

const OrdersDetails: React.FC = () => {
  const [orderDetails, setOrderDetails] = useState<Array<{}>>([]);
  const [total, setTotal] = useState<any>();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://project34api.azurewebsites.net/api/orders/${id}`);
        const jsonData = await response.json();

        setOrderDetails(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
  function backOrder() {
    window.location.href = "/order";
  }

  return (
    <>
      <Navbar />

      {orderDetails.length>0?<>
        <div className="m-auto pl-24">
        <button
          className="px-4 py-2 pl-4 text-white rounded  bg-red-600"
          onClick={backOrder}
        >
          Back
        </button>
      </div>

      <div className="mt-10 flex flex-col xl:flex-row jusitfy-center  w-2/3 xl:space-x-8 m-auto  pb-10 ">
        <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8 rounded-xl  ">
          <div className="flex flex-col justify-start items-start px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full rounded-xl border shadow">
            <p className="text-lg md:text-xl dark:text-gray-700 font-semibold leading-6 xl:leading-5 text-gray-800">
              Order Details - {id}
            </p>
            {orderDetails.map((item: any, index: number) => (
              <div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                <div className="pb-4 md:pb-8 w-full md:w-40">
                  <img
                    className="w-full hidden md:block"
                    src={burgerImage(item.BurgerName)}
                    alt="dress"
                  />
                </div>
                <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                  <div className="w-full flex flex-col justify-start items-start space-y-8">
                    <h3 className="text-xl dark:text-gray-700 xl:text-2xl font-semibold leading-6 text-gray-800">
                      {item.BurgerName} -R{item.burgerDefaultPrice}
                    </h3>
                    <div className="flex justify-start items-start flex-col space-y-2">
                      {item.items.map((x: any, index: number) => (
                        <p
                          className="text-sm dark:text-gray-700 leading-none text-gray-800"
                          key={index}
                        >
                          {x.ItemName}{" "}
                          <span className="dark:text-gray-400 text-gray-300">
                            Price: R{x.Price} {x.ItemQuantity}x
                          </span>
                        </p>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between space-x-8 items-start w-full">
                    <p className="text-base dark:text-gray-700 xl:text-lg leading-6">
                      R
                      {(
                        item.items.reduce((totalPrice: any, x: any) => {
                          const itemTotalPrice =
                            x.Price * x.ItemQuantity * item.burgerQuantity;
                          return totalPrice + itemTotalPrice;
                        }, 0) +
                        item.burgerDefaultPrice * item.burgerQuantity
                      ).toFixed(2)}
                    </p>
                    <p className="text-base dark:text-gray-700 xl:text-lg leading-6 text-gray-800">
                      {item.burgerQuantity}{" "}
                      {item.burgerQuantity > 1 ? "burgers" : "burger"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      </>:<FullPageLoader/>
      
      }
   
    </>
  );
};

export default OrdersDetails;
