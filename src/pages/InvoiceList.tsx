import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import FullPageLoader from "../components/fullpageloader/fullpageloader";
import dayjs from "dayjs";


const Invoice: React.FC = () => {
  const [cartItems, setCartItems] = useState<Array<{}>>([]);

  const isNullOrEmpty = (value: String) => {
    if (typeof value === "string" || Array.isArray(value)) {
      return value.length <= 0;
    }

    return true;
  };
  const getFormattedDate = (date: string, withTimestamp = false) => {
    if (isNullOrEmpty(date)) {
      return null;
    }

    const formattedDate = dayjs(`${date}`).format(
      (withTimestamp && "DD MMMM YYYY, HH:mm") || "DD MMMM YYYY"
    );

    return (formattedDate !== "Invalid Date" && formattedDate) || null;
  };

  const localStorageUserId = localStorage.getItem("userId");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://project34api.azurewebsites.net/api/order/${localStorageUserId}`
        );
        const jsonData = await response.json();

        setCartItems(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      {cartItems.length > 0 ? (
        <div className="w-screen">
          <div className="mx-auto mt-8 max-w-screen-lg px-2">
            <div className="sm:flex sm:items-center sm:justify-between flex-col sm:flex-row">
              <p className="flex-1 text-base font-bold text-gray-900">
                Latest Invoice
              </p>

              <div className="mt-4 sm:mt-0">
                <div className="flex items-center justify-start sm:justify-end">
                  <div className="flex items-center">
                    <label
                      htmlFor=""
                      className="mr-2 flex-shrink-0 text-sm font-medium text-gray-900"
                    >
                      {" "}
                      Sort by:{" "}
                    </label>
                    <select className="sm: mr-4 block w-full whitespace-pre rounded-lg border p-1 pr-10 text-base outline-none focus:shadow sm:text-sm">
                      <option className="whitespace-no-wrap text-sm">
                        Recent
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 overflow-hidden rounded-xl border shadow">
              <table className="min-w-full border-separate border-spacing-y-2 border-spacing-x-2">
                <thead className="hidden border-b lg:table-header-group">
                  <tr className="">
                    <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                      Invoice No
                    </td>

                    <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                      Date 
                    </td>

                    <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                      Invoice Details
                    </td>
                  </tr>
                </thead>

                <tbody className="lg:border-gray-300">
                  {cartItems.map((item: any, index: number) => (
                    <tr className="">
                      <td className="whitespace-no-wrap py-4 text-sm font-bold text-gray-900 sm:px-6 lg:table-cell">
                        {item.orderID}
                        <div className="mt-1 lg:hidden">
                          <p className="font-normal text-gray-500">{}</p>
                        </div>
                      </td>

                      <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                        {getFormattedDate(item.orderDate)}
                      </td>
                      <td className="whitespace-no-wrap py-4 px-6 text-right text-sm text-gray-600 lg:text-left">
                        <Link
                          className="px-4 py-2 text-white rounded ml-auto bg-blue-600"
                          to={`/invoice-details/${item.orderID}`}
                        >
                          View Invoice
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <FullPageLoader />
      )}
    </>
  );
};

export default Invoice;
