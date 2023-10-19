import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

interface Product {
  Category: string;
  ItemName: string;
  Price: number;
  ItemDescription: string;
  ImageBase64: string;
  StockQuantity: number;
  IsDeleted: boolean;
}

interface EditItemFormProps {
  ItemID: any;
}

const EditItemForm: React.FC<EditItemFormProps> = ({ ItemID }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [isItemAdded, setIsItemIadded] = useState(false);
  const [isItemNotAdded, setIsItemNotAdded] = useState(false);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImageBase64(base64String);
      };
    }
  };
  const [data, setData] = useState<Product | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://project34api.azurewebsites.net/api/burgers/${ItemID}`
        );
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  if (data === null) {
    return <div>Loading...</div>;
  }

  const initialValues: Product = {
    Category: data?.Category || "",
    ItemName: data?.ItemName || "",
    Price: data?.Price || 0,
    ItemDescription: data?.ItemDescription || "",
    ImageBase64: data?.ImageBase64 || "",
    StockQuantity: data?.StockQuantity || 0,
    IsDeleted: data?.IsDeleted || false,
  };

  const onSubmit = async (values: Product) => {
    if (imageBase64) {
      values.ImageBase64 = imageBase64;
    }
    console.log(values);
    try {
      await axios.put(`https://project34api.azurewebsites.net/api/burgers/${ItemID}`, values);
      console.log("Data updated successfully:", values);
      setTimeout(function () {
        setIsItemIadded(true);
        window.location.href = "/dashboard";
      }, 2000);
    } catch (error) {
      console.error("Error sending data:", error);
      setIsItemNotAdded(true);
    } finally {
    }
  };

  return (
    <div className="flex bg-gray-100 text-left">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          <Form className="space-y-4">
            <h3>Update Item</h3>
            <div>
              <label htmlFor="Category" className="block font-medium ">
                Category
              </label>
              <Field
                as="select"
                id="Category"
                name="Category"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="all">All</option>
                <option value="beef">Beef</option>
                <option value="vegan">Vegan</option>
                <option value="chicken">Chicken</option>
              </Field>
              <ErrorMessage
                name="Category"
                component="div"
                className="text-red-600 decoration-0 font-thin"
              />
            </div>

            <div>
              <label htmlFor="Name" className="block font-medium">
                Name
              </label>
              <Field
                type="text"
                id="ItemName"
                name="ItemName"
                placeholder="Name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage
                name="Name"
                component="div"
                className="text-red-600 decoration-0 font-thin"
              />
            </div>

            <div>
              <label htmlFor="Price" className="block font-medium">
                Price
              </label>
              <Field
                type="number"
                id="Price"
                name="Price"
                placeholder="Price"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage
                name="Price"
                component="div"
                className="text-red-600 decoration-0 font-thin"
              />
            </div>

            <div>
              <label htmlFor="Description" className="block font-medium">
                Description
              </label>
              <Field
                as="textarea"
                id="ItemDescription"
                name="ItemDescription"
                placeholder="Description"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage
                name="Description"
                component="div"
                className="text-red-600 decoration-0 font-thin"
              />
            </div>

            <div>
              <label htmlFor="Image" className="block font-medium">
                Image
              </label>
              <input
                type="file"
                id="Image"
                name="Image"
                accept="image/*"
                onChange={handleImageChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {imagePreview && (
                <img
                  src={data?.ImageBase64}
                  alt="Product"
                  className="w-2 h-2 mt-2"
                />
              )}
              <ErrorMessage
                name="ImageBase64"
                component="div"
                className="text-red-600 decoration-0 font-thin"
              />
            </div>

            <button
              type="submit"
              className="bg-gray-700 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
            <div>
              {isItemAdded && (
                <p className="text-sm mt-4 text-green-600">
                  Burger Item successfully Updated
                </p>
              )}
              {isItemNotAdded && (
                <p className="text-sm mt-4 text-red-600">
                  Error occured please try again.
                </p>
              )}
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default EditItemForm;
