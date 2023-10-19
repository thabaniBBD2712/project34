import React from "react";
import "../fullpageloader/fullpageloader.css";

const FullPageLoader: React.FC = ({}) => {


   
  
  return( 
  <>
   <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
    <div className="relative w-auto ">
    <div className="circle-loader m-auto"></div>
    </div>
  </div>
  <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
  </>
 )
};

export default FullPageLoader;
