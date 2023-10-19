import { useEffect, useState } from "react";
import AddItem from "../components/addItemModal";
import DeleteItem from "../components/deleteItemModal";
import EditItem from "../components/editItemModal";
import FullPageLoader from "../components/fullpageloader/fullpageloader";
import logo from "../images/burger.png";

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
export default function ManageItems() {
  const [data, setData] = useState<TableData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

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

  const filteredData = data.filter((item) =>
  item.ItemName.toLowerCase().includes(searchQuery.toLowerCase())
);


const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setSearchQuery(e.target.value);
};
  return (
    <>
         <header className="fixed top-0 left-0 w-full z-10 bg-white shadow ">
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
        placeholder="Search burger Item"
        value={searchQuery}
        onChange={handleSearchInputChange}
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
      {
        data.length>0?  <div className="flex flex-col w-10/12 m-auto mt-28">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden sm:my-10 sm:rounded-md sm:border sm:shadow">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Description
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Catagory
                    </th>
                    <th>
                      <AddItem />
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredData.map((item) => (
                    <tr key={item.ItemID}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img
                              className="h-10 w-10 rounded-full"
                              src={item.ImageBase64}
                              alt=""
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {item.ItemName}
                            </div>
                            <div className="text-sm text-gray-500">
                              R{item.Price}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {item.IsDeleted}
                        </div>
                        <div className="text-sm text-gray-500">
                          {item.ItemDescription}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {item.Category}
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <EditItem value={item.ItemID} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <DeleteItem value={item.ItemName} id={item.ItemID} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>:<FullPageLoader/>
      }
    
    </>
  );
}
