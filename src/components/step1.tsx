import React, { useState, createContext } from "react";
import beef from "../images/beef.png";
import chicken from "../images/chicken.png";
import vegan from "../images/vegan2.png";
import { useAtom } from "jotai";
import { burgerType, isNextButttonEnabled, selectedBurger } from "../helpers/globalState";




const initialProducts = [
  { id: 1, name: 'Beef', price: 10, img: beef, inCart: false },
  { id: 2, name: 'Vegan', price: 20, img: vegan, inCart: false },
  { id: 3, name: 'Chicken', price: 30, img: chicken, inCart: false },
];

const Step1 = () => {
  const [products, setProducts] = useState(initialProducts);
  const [selectedProduct, setSelectedProduct] = useState(initialProducts[0]);
  const [burgerItemObject, setBurgerItemObject] = useAtom(burgerType);
  const [burgerName, setBurgerName] = useAtom(selectedBurger);
  
  const [isNextButtonDisabled, setIsNextButtonDisabled] =
    useAtom(isNextButttonEnabled);



  const handleAddToCart = (id:any) => {
    const updatedProducts = products.map((product) =>
      product.id === id ? { ...product, inCart: true } : { ...product, inCart: false }
      
    );
    const inCartItems = updatedProducts.filter(item => item.inCart).map(item => item.name);
    const object = updatedProducts.filter(item => item.inCart);
   
    setBurgerItemObject(object[0])
    
    setBurgerName(inCartItems[0])
    setProducts(updatedProducts);
  //  setBurgerItemObject();
    if(updatedProducts.length>0){
      
      setIsNextButtonDisabled(false)
    
    }
  };

  return (
    <div className="flex flex-row ml-[16rem] gap-[5rem]">
      {products.map((product) => (
        <div
          key={product.id}
          className="group my-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md"
        >
          <a
            className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
            href="#"
          >
            <img
              className="peer absolute top-0 right-0 h-full w-full object-cover"
              src={product.img}
              alt="product image"
            />
          </a>
          <div className="mt-4 px-5 pb-5">
            <a href="#">
              <h5 className="text-xl tracking-tight text-slate-900">{product.name}</h5>
            </a>
            <div className="mt-2 mb-5 flex items-center justify-between">
              <p>
                <span className="text-3xl font-bold text-slate-900">R{product.price}</span>
              </p>
            </div>
            <button
              disabled={product.inCart}
              onClick={() => handleAddToCart(product.id)}
              className={`flex items-center justify-center rounded-md ${product.inCart ?'bg-gray-600':'bg-red-600'} bg-red-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300`}
            >
              {product.inCart ? 'Selected' : 'Add to Cart'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Step1;
