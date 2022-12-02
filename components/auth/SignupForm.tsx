"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { SyncLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
const signupSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .max(50, "Username must be less than 50 characters")
    .required("Username is required"),
  email: Yup.string()
    .email("Email must be a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .max(50, "Password must be less than 50 characters")
    .required("Password is required"),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Password confirmation is required"),
});
function SignupForm() {
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
    validationSchema: signupSchema,
    onSubmit: (values) => {
      console.log(values);
      setTimeout(() => {
        setSubmitting(false);
        toast.success("Your account has been successfully created", {
          autoClose: 3000,
          draggable: true,
          progress: undefined,
          hideProgressBar: true,
        });
      }, 1500);
    },
  });
  const { errors, touched, isSubmitting, setSubmitting } = formik;
  return (
    <div className=" rounded-l-2xl form-shadow bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-rose-700 via-red to-rose-400 flex flex-col items-center justify-center p-3">
      <ToastContainer limit={3} />

      <h1 className="mx-auto font-bold text-4xl my-6 text-white w-fit">
        Sign up
      </h1>
      <form
        onSubmit={formik.handleSubmit}
        className=" w-full h-full p-2 flex flex-col gap-3  items-center justify-evenly"
        autoComplete="off"
      >
        <div className="form-control">
          <label htmlFor="username" className="mx-1 text-white font-bold  ">
            Username:
          </label>
          <input
            onChange={formik.handleChange}
            name="username"
            className="bg-white/30 font-semibold  w-full rounded-lg border border-white overflow-hidden text-darkest placeholder:text-black/50 px-3 py-2 active:outline-none focus:outline-none focus:bg-white/60"
            placeholder="username"
            type="text"
            value={formik.values.username}
            onBlur={formik.handleBlur}
          />
          {errors.username && touched.username ? (
            <ErrorMessage key={errors.username}>{errors.username}</ErrorMessage>
          ) : null}
        </div>
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
        <div className="form-control">
          <label htmlFor="password" className="mx-1 text-white font-bold  ">
            password:
          </label>
          <input
            onChange={formik.handleChange}
            name="password"
            type={"password"}
            className="bg-white/30 font-semibold  w-full rounded-lg border border-white overflow-hidden text-darkest placeholder:text-black/50 px-3 py-2 active:outline-none focus:outline-none focus:bg-white/60"
            placeholder="password"
            value={formik.values.password}
            onBlur={formik.handleBlur}
          />
          {errors.password && touched.password ? (
            <ErrorMessage key={errors.password}>{errors.password}</ErrorMessage>
          ) : null}
        </div>
        <div className="form-control">
          <label htmlFor="password" className="mx-1 text-white font-bold  ">
            Confirm Password:
          </label>
          <input
            onChange={formik.handleChange}
            name="passwordConfirmation"
            className="bg-white/30 font-semibold  w-full rounded-lg border border-white overflow-hidden text-darkest placeholder:text-black/50 px-3 py-2 active:outline-none focus:outline-none focus:bg-white/60"
            placeholder="passwordConfirmation"
            type={"password"}
            value={formik.values.passwordConfirmation}
            onBlur={formik.handleBlur}
          />
          {errors.passwordConfirmation && touched.passwordConfirmation ? (
            <ErrorMessage key={errors.passwordConfirmation}>
              {errors.passwordConfirmation}
            </ErrorMessage>
          ) : null}
        </div>
        <motion.button
          layout
          type="submit"
          className="w-full my-2 py-2 bg-white/30 rounded-lg text-white font-bold transition-colors ease duration-200 hover:bg-white hover:text-dark
        "
        >
          {isSubmitting ? (
            <SyncLoader color="rgb(190, 18, 60)" size={6} />
          ) : (
            "Sign Up"
          )}
        </motion.button>
      </form>
    </div>
  );
}

export default SignupForm;

const ErrorMessage = ({
  children,
  key,
}: {
  children: React.ReactNode;
  key: any;
}) => {
  return (
    <AnimatePresence>
      <motion.p
        layout
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{
          duration: 0.5,
          type: "spring",
          bounce: 0.5,
        }}
        className="w-full bg-white/80 p-2 border my-1 rounded-lg font-semibold  text-red shadow"
      >
        {children}
      </motion.p>
    </AnimatePresence>
  );
};
