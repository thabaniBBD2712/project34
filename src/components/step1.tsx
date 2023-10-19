import React, { useState, createContext } from "react";
import beef from "../images/beef.png";
import chicken from "../images/chicken.png";
import vagan from "../images/vegan2.png";
import { useAtom } from "jotai";
import { burger, burgerType, selectedBurger } from "../helpers/globalState";
import { isNextButttonEnabled } from "../helpers/globalState";

export const MyContext = createContext<any>(null);
interface Step1Props {
  values: any;
}

const initialProducts = [
  { id: 1, name: "Beef", price: 10, img: beef },
  { id: 2, name: "Vegan", price: 20, img: vagan },
  { id: 3, name: "Chicken", price: 30, img: chicken },
];

const Step1: React.FC<Step1Props> = ({ values }) => {
  const [selectedProduct, setSelectedProduct] = useState(initialProducts[0]);
  const [burgerItemObject, setBurgerItemObject] = useAtom(burgerType);
  const [burgerName, setBurgerName] = useAtom(selectedBurger);
  
  const [isNextButtonDisabled, setIsNextButtonDisabled] =
    useAtom(isNextButttonEnabled);
  const handleProductChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProductName = event.target.value;
    const selected = initialProducts.find(
      (product) => product.name === selectedProductName
    );
    if (selected) {
      setSelectedProduct(selected);
      setIsNextButtonDisabled(false);
      setBurgerItemObject(selected);
      setBurgerName(selected.name)
   
    }
  };

  return (
    <div className="flex justify-center items-center ">
      <div className="max-w-[21rem] bg-white px-6 pt-6 pb-2 rounded-xl shadow-lg ">
        <h3 className="mb-3 text-xl font-bold text-indigo-600">
          <select
            className="w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-gray-600"
            onChange={handleProductChange}
          >
            <option value="">Select a burger </option>
            {initialProducts.map((product) => (
              <option key={product.id} value={product.name}>
                {product.name}
              </option>
            ))}
          </select>
        </h3>
        <div className="relative">
          <img
            className="w-full rounded-xl"
            src={selectedProduct.img}
            alt="Burger"
          />
        </div>
        <div className="flex flex-column gap-[0.5rem]">
          <h2 className="mt-4 text-gray-800 text-2xl font-bold cursor-pointer">
            {selectedProduct.name} - R{selectedProduct.price}
          </h2>  
        </div>
        <div className="my-4"></div>
      </div>
    </div>
  );
};

export default Step1;
