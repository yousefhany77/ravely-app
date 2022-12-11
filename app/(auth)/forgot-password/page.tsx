"use client";
import Image from "next/image";
import React, { useContext } from "react";
import logo from "../../../public/logo.png";
import "react-toastify/dist/ReactToastify.min.css";
import { AuthContext, AuthProvider } from "../../../context/authContext";
import { toast, ToastContainer } from "react-toastify";
import { useFormik } from "formik";
import useMonted from "../../../hooks/useMonted";
import * as Yup from "yup";
import { ErrorMessage } from "../../../components/auth/LoginForm";
import { motion } from "framer-motion";
import { SyncLoader } from "react-spinners";
function Signup() {
  return (
    <AuthProvider>
      <section className="h-screen   flex flex-col items-center justify-center p-5 max-w-7xl mx-auto ">
        <div className="w-4/6 max-w-7xl bg-darkest overflow-hidden  grid md:grid-cols-[1fr_2fr] rounded-2xl   border border-light-gray/50">
          <div className="bg-darkest flex items-center justify-center  md:-ml-5 -mb-2">
            <Image
              src={logo}
              alt="Ravly Logo"
              className="object-contain w-16 md:w-32 py-5 md:ml-5"
            />
          </div>
          <ResetPasswordForm />
        </div>
      </section>
    </AuthProvider>
  );
}
export default Signup;

const ResetPasswordForm = () => {
  const { resetPassword } = useContext(AuthContext);
  const { mounted } = useMonted();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Email must be a valid email")
        .required("Email is required"),
    }),
    onSubmit: async (values) => {
      const { email } = values;
      try {
        const link = await resetPassword(email);
        console.log(link, "link");
        toast.success("Password reset email sent!");
        formik.resetForm();
      } catch (error: any) {
        toast.error(error.code || `${error}`, {
          hideProgressBar: true,
          bodyStyle: {
            textTransform: "capitalize",
          },
        });
      } finally {
        mounted && formik.setSubmitting(false);
      }
    },
  });
  const { errors, touched, isSubmitting } = formik;
  return (
    <div className=" rounded-l-2xl form-shadow bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-rose-700 to-orange-300 via-red flex flex-col items-center justify-center p-6">
      <ToastContainer limit={3} />

      <h1 className="mx-auto font-bold text-4xl my-6 text-white w-fit">
        Forgot Password
      </h1>
      <form
        onSubmit={formik.handleSubmit}
        className=" w-full h-full  flex flex-col gap-3  items-center justify-evenly font-sans"
        autoComplete="off"
      >
        <div className="form-control">
          <label htmlFor="email" className="mx-1 text-white font-bold  ">
            Email:
          </label>
          <input
            onChange={formik.handleChange}
            name="email"
            className="bg-white/30 font-semibold  w-full rounded-lg border border-white overflow-hidden text-darkest placeholder:text-black/50 px-3 py-2 active:outline-none focus:outline-none focus:bg-white/60"
            placeholder="email"
            type="email"
            value={formik.values.email}
            onBlur={formik.handleBlur}
          />
          {errors.email && touched.email ? (
            <ErrorMessage key={errors.email}>{errors.email}</ErrorMessage>
          ) : null}
        </div>
        <motion.button
          layout
          type="submit"
          disabled={isSubmitting}
          className="w-full my-2  py-2 bg-white/30 rounded-lg text-white font-bold transition-colors ease-in-out duration-200 hover:bg-white hover:text-dark disabled:bg-white/30
        "
        >
          {isSubmitting ? (
            <SyncLoader color="rgb(190, 18, 60)" size={6} />
          ) : (
            "Resest Password"
          )}
        </motion.button>
      </form>
    </div>
  );
};
