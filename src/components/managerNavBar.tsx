import React, { useState } from "react";
import logo from "../images/burger.png";

export default function ManagerNavbar({ fixed }: any) {
  const [bold, setBold] = useState<Boolean>(true);
  const [bold2, setBold2] = useState<Boolean>(false);
  function createBurger() {
    setBold(true);
    setBold2(false);
    window.location.href = "/menu";
  }

  function orders() {
    setBold2(true);
    setBold(false);
    window.location.href = "/order";
  }

  return (
    <>
      <header className="mb-2 shadow">
        <div className="relative flex max-w-screen-xl flex-col overflow-hidden px-4 py-4 sm:mx-auto sm:flex-row">
          <img className="h-8 w-8" src={logo} alt="" />
          <input type="checkbox" className="peer hidden" id="navbar-open" />
          <label
            className="absolute right-4 top-5 cursor-pointer sm:hidden"
            htmlFor="navbar-open"
          >
            <span className="sr-only">Toggle menu</span>
          </label>
          <nav
            aria-labelledby="header-navigation"
            className="peer-checked:mt-8 peer-checked:max-h-32 flex max-h-0 w-full flex-col items-center justify-between overflow-hidden transition-all sm:ml-24 sm:max-h-full sm:flex-row sm:items-start"
          >
            <h2 className="sr-only" id="header-navigation">
              Header navigation
            </h2>
            <ul className="flex flex-col items-center sm:flex-row">
              <li
                className={
                  bold ? "font-bold sm:mr-12" : "text-gray-800 sm:mr-12"
                }
              >
                <button onClick={createBurger}>Create Burger</button>
              </li>
              <li
                className={
                  bold2 ? "font-bold sm:mr-12" : "text-gray-800 sm:mr-12"
                }
              >
                <button onClick={orders}>Order</button>
              </li>
            </ul>
            <ul className="mt-4 flex sm:mt-0">
              <li>
              <div className="relative ml-10 flex items-center justify-between rounded-md sm:ml-auto">
      <svg
        className="absolute left-2 block h-5 w-5 text-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="11" cy="11" r="8" className=""></circle>
        <line
          x1="21"
          y1="21"
          x2="16.65"
          y2="16.65"
          className=""
        ></line>
      </svg>
      <input
        type="name"
        name="search"
        className="h-12 w-full rounded-md border border-gray-100 bg-gray-100 py-4 pr-4 pl-12 shadow-sm outline-none focus:border-blue-500"
        placeholder="Search for anything"
      />
    </div>
              </li>
              <li className="ml-6 flex h-8 w-8 cursor-pointer items-center justify-center rounded-xl border text-gray-600 hover:text-black hover:shadow">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </li>
          
            
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
