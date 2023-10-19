import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

interface Product {
  Name: string;
}

const initialValues: Product = {
  Name: "",
};

const validationSchema = Yup.object({
  Name: Yup.string().required("Required"),
});
interface StockQuantity {
  stockQuantiy: any;
}

const UpdateStock: React.FC<StockQuantity> = ({ stockQuantiy }) => {
  const onSubmit = async (values: Product) => {
   
    
    try {
      await axios.put(`http://localhost:3001/api/stock/${stockQuantiy}`, values.Name);
      console.log("Data updated successfully:", values);
      setTimeout(function () {
       console.log('updated')
        window.location.href = "/manager";
      }, 2000);
    } catch (error) {
      console.error("Error sending data:", error);
    } finally {
    }
  };
  
  




  return (
    <div className="flex  text-left">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form className="space-y-4">
            <div>
              <label htmlFor="Name" className="block font-medium">
                Stock Quantity
              </label>
              <Field
                type="Number"
                min={1}
                max={1000}
                id="Name"
                name="Name"
                placeholder="quantity"
                className="shadow appearance-none border rounded w-28 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage
                name="Name"
                component="div"
                className="text-red-600 decoration-0 font-thin"
              />
            </div>

            <button
              type="submit"
              className="inline-block rounded bg-red-600 px-6 pb-2 pt-2.5 text-xs font-medium uppercase text-white "
            >
              {stockQuantiy === 0 ? "ADD NEW STOCK" : "UPDATE STOCK"}
            </button>
            <div></div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default UpdateStock;
