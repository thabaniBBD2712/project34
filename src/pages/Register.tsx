import React, { useState } from "react";
import loginImg from "../images/login.svg";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

function Login() {
  const initialValues = {
    email: "",
    password: "",
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggedInFailed, setIsLoggedInFailed] = useState(false);
  const validationSchema = Yup.object({
    email: Yup.string().required("Required"),
    password: Yup.string()
      .min(2, "Password must be at least 6 characters")
      .required("Required"),
  });

  const onSubmit = async (values: any) => {
    try {
      const response = await axios.post("https://project34api.azurewebsites.net/api/login", {
        email: values.email,
        password: values.password,
      });
      setIsLoggedIn(true);
      setTimeout(function () {
        if (response.data?.user?.UserType === "Regular") {
          window.location.href = "/menu";
          localStorage.setItem(
            "userId",
            JSON.stringify(response.data?.user?.UserID)
          );
        } else if (response.data?.user?.UserType === "Admin") {
          window.location.href = "/dashboard";
        }
      }, 1000);
    } catch (error) {
      setIsLoggedInFailed(true);
      console.error("Login error:", error);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <div className="max-h-screen">
      <section className="border-red-500 bg-gray-200 min-h-screen flex items-center justify-center">
        <div className="bg-gray-100 p-5 flex rounded-2xl shadow-lg max-w-3xl">
          <div className="md:w-1/2 px-5">
            <h2 className="text-2xl font-bold text-[#002D74]">Login</h2>
            {isLoggedIn ? (
              <p className="text-sm mt-4 text-green-600">Login successful</p>
            ) : (
              ""
            )}
            {isLoggedInFailed ? (
              <p className="text-sm mt-4 text-red-600">
                Login error,please enter correct credentials
              </p>
            ) : (
              ""
            )}

            <form className="mt-6" onSubmit={formik.handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  {...formik.getFieldProps("username")}
                  placeholder="Enter username"
                  className={`w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border ${
                    formik.errors.email && formik.touched.email
                      ? "border-red-500"
                      : ""
                  } focus:border-blue-500 focus:bg-white focus:outline-none`}
                  autoFocus
                  autoComplete="username"
                />
                {formik.errors.email && formik.touched.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  {...formik.getFieldProps("email")}
                  placeholder="Enter Email Address"
                  className={`w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border ${
                    formik.errors.email && formik.touched.email
                      ? "border-red-500"
                      : ""
                  } focus:border-blue-500 focus:bg-white focus:outline-none`}
                  autoFocus
                  autoComplete="email"
                />
                {formik.errors.email && formik.touched.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.email}
                  </p>
                )}
              </div>

              <div className="mt-4">
                <label htmlFor="password" className="block text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  {...formik.getFieldProps("password")}
                  placeholder="Enter Password"
                  className={`w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border ${
                    formik.errors.password && formik.touched.password
                      ? "border-red-500"
                      : ""
                  } focus:border-blue-500 focus:bg-white focus:outline-none`}
                />
                {formik.errors.password && formik.touched.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.password}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full block bg-slate-900 hover:bg-slate-400  text-white font-semibold rounded-lg px-4 py-3 mt-6"
              >
                Sign Update
              </button>
            </form>

            <div className="text-sm flex justify-between items-center mt-3">
              <p>If you don't have an account...</p>
            </div>
          </div>

          <div className="w-1/2 md:block hidden">
            <img src={loginImg} className="rounded-2xl" alt="page img" />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
