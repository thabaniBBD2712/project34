import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

interface Product {
  Category: string;
  Name: string;
  Price: number;
  Description: string;
  ImageBase64: string;
  StockQuantity: number;
  IsDeleted: boolean;
}

const initialValues: Product = {
  Category: "",
  Name: "",
  Price: 0,
  Description: "",
  ImageBase64: "",
  StockQuantity: 0,
  IsDeleted: false,
};

const validationSchema = Yup.object({
  Category: Yup.string().required("Required"),
  Name: Yup.string().required("Required"),
  Price: Yup.number().required("Required"),
  Description: Yup.string().required("Required"),
});

const AddItemForm: React.FC = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const onSubmit = async (values: Product) => {
    if (imageBase64) {
      values.ImageBase64 = imageBase64;
    }
    setIsSubmitting(true);
    console.log(values);
    try {
      await axios.post("https://project34api.azurewebsites.net/api/burger", values);
      setTimeout(function () {
        setIsItemIadded(true);
        window.location.href = "/dashboard";
      }, 2000);
    } catch (error) {
      setIsItemNotAdded(true);
      console.error("Error sending data:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex bg-gray-100 text-left">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <h3>Add New Item</h3>
              <div>
                <label htmlFor="Category" className="block font-medium">
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
                  id="Name"
                  name="Name"
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
                  id="Description"
                  name="Description"
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
                    src={imagePreview}
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
                    Burger Item successfully Added
                  </p>
                )}
                {isItemNotAdded && (
                  <p className="text-sm mt-4 text-red-600">
                    Error occured please try again.
                  </p>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddItemForm;
