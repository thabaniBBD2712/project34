import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/navbar";
import FullPageLoader from "../components/fullpageloader/fullpageloader";
import logo from "../images/burger.png";
import dayjs from "dayjs";

const InvoiceDetails: React.FC = () => {
  const [orderDetails, setOrderDetails] = useState<Array<{}>>([]);
  const { id } = useParams<{ id: string }>();

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://project34api.azurewebsites.net/api/orders/${id}`
        );
        const jsonData = await response.json();

        setOrderDetails(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  let total = 0;
  orderDetails.forEach((item: any) => {
    const itemPrice =
      item.burgerDefaultPrice * item.burgerQuantity +
      item.items.reduce(
        (acc: any, x: any) =>
          acc + x.Price * x.ItemQuantity * item.burgerQuantity,
        0
      );
    total += itemPrice;
  });

  function backOrder() {
    window.location.href = "/invoice";
  }

  return (
    <>
      <Navbar />

      {orderDetails.length > 0 ? (
        <>
          <div className="m-auto pl-24">
            <button
              className="px-4 py-2 pl-4 text-white rounded   bg-red-600"
              onClick={backOrder}
            >
              Back
            </button>
          </div>

          <div className="mt-10 flex flex-col xl:flex-row jusitfy-center  w-2/3 xl:space-x-8 m-auto  pb-10">
            <div className="max-w-3xl mx-auto p-6 bg-gray-100 rounded shadow-sm my-6 ">
              <div className="grid grid-cols-2 items-center">
                <div>
                  <img src={logo} alt="company-logo" height="100" width="100" />
                </div>

                <div className="text-right">
                  <p>Burger T Inc.</p>
                  <p className="text-gray-500 text-sm">burgett@gmail.com</p>
                  <p className="text-gray-500 text-sm mt-1">+278265152</p>
                  <p className="text-gray-500 text-sm mt-1">VAT:+278265152 </p>
                </div>
              </div>

              <div className="grid grid-cols-2 items-center mt-8">
                <div>
                  <p className="font-bold text-gray-800">Bill to :</p>
                  <p className="text-gray-500">
                    Laravel LLC.
                    <br />
                    102, San-Fransico, CA, USA
                  </p>
                  <p className="text-gray-500">info@laravel.com</p>
                </div>

                <div className="text-right">
                  <p>
                    Invoice number:
                    <span className="text-gray-500">{id}</span>
                  </p>
                  <p>
                    Invoice date: <span className="text-gray-500">{"a"}</span>
                  </p>
                </div>
              </div>

              <div className="-mx-4 mt-8 flow-root sm:mx-0">
                <table className="min-w-full">
                  <tbody>
                    <tr className="hidden px-3 py-5 text-right text-sm text-gray-500 sm:table-cell">
                      <div className="mt-10 flex flex-col xl:flex-row jusitfy-center  w-full xl:space-x-8 m-auto  pb-10 ">
                        <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8 rounded-xl  ">
                          <div className="flex flex-col justify-start items-start px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full rounded-xl border shadow">
                            {orderDetails.map((item: any, index: number) => (
                              <div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                                <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                                  <div className="w-full flex flex-col justify-start items-start space-y-8">
                                    <h3 className="text-xl dark:text-gray-700 xl:text-2xl font-semibold leading-6 text-gray-800">
                                      {item.BurgerName} -R
                                      {item.burgerDefaultPrice}
                                    </h3>
                                    <div className="flex justify-start items-start flex-col space-y-2">
                                      {item.items.map(
                                        (x: any, index: number) => (
                                          <p
                                            className="text-sm dark:text-gray-700 leading-none text-gray-800"
                                            key={index}
                                          >
                                            {x.ItemName}{" "}
                                            <span className="dark:text-gray-900 text-gray-400">
                                              Price: R{x.Price} {x.ItemQuantity}
                                              x
                                            </span>
                                          </p>
                                        )
                                      )}
                                    </div>
                                  </div>
                                  <div className="flex justify-between space-x-8 items-start w-full">
                                    <p className="text-base dark:text-gray-700 xl:text-lg leading-6">
                                      R
                                      {(
                                        item.items.reduce(
                                          (totalPrice: any, x: any) => {
                                            const itemTotalPrice =
                                              x.Price *
                                              x.ItemQuantity *
                                              item.burgerQuantity;
                                            return totalPrice + itemTotalPrice;
                                          },
                                          0
                                        ) +
                                        item.burgerDefaultPrice *
                                          item.burgerQuantity
                                      ).toFixed(2)}
                                    </p>
                                    <p className="text-base dark:text-gray-700 xl:text-lg leading-6 text-gray-800">
                                      {item.burgerQuantity}{" "}
                                      {item.burgerQuantity > 1
                                        ? "burgers"
                                        : "burger"}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <th
                        scope="row"
                        className="hidden pl-4 pr-3 pt-6 text-right text-sm font-normal text-gray-500 sm:table-cell sm:pl-0"
                      >
                        Tax
                      </th>
                      <th
                        scope="row"
                        className="pl-6 pr-3 pt-6 text-left text-sm font-normal text-gray-500 sm:hidden"
                      >
                        VAT
                      </th>
                      <td className="pl-3 pr-6 pt-6 text-right text-sm text-gray-500 sm:pr-0">
                        R{(total*0.15).toFixed(2)}
                      </td>
                    </tr>
                    <tr>
                  
                      <th
                        scope="row"
                        className="pl-6 pr-3 pt-4 text-left text-sm font-normal text-gray-500 sm:hidden"
                      >
                        Tax
                      </th>
                   
                    </tr>
                    <tr>
                      <th
                        scope="row"
                        className="hidden pl-4 pr-3 pt-4 text-right text-sm font-normal text-gray-500 sm:table-cell sm:pl-0"
                      >
                        VAT
                      </th>
                      <th
                        scope="row"
                        className="pl-6 pr-3 pt-4 text-left text-sm font-normal text-gray-500 sm:hidden"
                      ></th>
                      <td className="pl-3 pr-6 pt-4 text-right text-sm text-gray-500 sm:pr-0">
                        15%
                      </td>
                    </tr>
                    <tr>
                      <th
                        scope="row"
                        className="hidden pl-4 pr-3 pt-4 text-right text-sm font-semibold text-gray-900 sm:table-cell sm:pl-0"
                      >
                        Total
                      </th>
                      <th
                        scope="row"
                        className="pl-6 pr-3 pt-4 text-left text-sm font-semibold text-gray-900 sm:hidden"
                      >
                        Total
                      </th>
                      <td className="pl-3 pr-4 pt-4 text-right text-sm font-semibold text-gray-900 sm:pr-0">
                       R{total}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <div className="border-t-2 pt-4 text-xs text-gray-500 text-center mt-16">
                Please pay the invoice before the due date. You can pay the
                invoice by logging in to your account from our client portal.
              </div>
            </div>
          </div>
        </>
      ) : (
        <FullPageLoader />
      )}
    </>
  );
};

export default InvoiceDetails;
