"use client";
import { useFormik } from "formik";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import useMonted from "../../hooks/useMonted";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import { ErrorMessage } from "./LoginForm";
import { motion } from "framer-motion";
import { SyncLoader } from "react-spinners";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  User,
} from "firebase/auth";
import { useRouter } from "next/navigation";

function PromtUserReAuthwithPassword() {
  const router = useRouter();
  const { user: userData, signOut } = useContext(AuthContext);
  const { mounted } = useMonted();
  const {
    errors,
    touched,
    isSubmitting,
    setSubmitting,
    handleSubmit,
    handleChange,
    handleBlur,
    values,
  } = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: passwordSchema,
    onSubmit: async (values) => {
      const { password } = values;
      try {
        userData && (await reAuthUser(userData, password));
        toast.success(`Welcome back ${userData?.displayName}`, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
        });
        router.replace("/");
      } catch (error) {
        toast.error("User is not authenticated", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3500,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
        });
        toast.loading("Redirecting to login", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          onClose: () => router.replace("/login"),
        });
        await signOut();
        toast.dismiss();
      } finally {
        mounted && setSubmitting(false);
      }
    },
  });
  return (
    <div className="  rounded-l-2xl form-shadow bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-rose-700 to-orange-300 via-red flex flex-col items-center justify-center p-6">
      <ToastContainer limit={3} />
      <p className="mx-auto font-bold text-2xl mt-6 text-white/70 w-fit">
        {userData?.displayName || userData?.email},
      </p>
      <p className="mx-auto font-bold text-lg mb-6 text-white w-fit capitalize text-center">
        please Re-Authenticate with your password to get access back to your
        account
      </p>
      <form
        onSubmit={handleSubmit}
        className=" w-full h-full  flex flex-col gap-3  items-center justify-evenly font-sans"
        autoComplete="off"
      >
        <div className="form-control">
          <label htmlFor="password" className="mx-1 text-white font-bold  ">
            password:
          </label>
          <input
            onChange={handleChange}
            name="password"
            type={"password"}
            className="bg-white/30 font-semibold  w-full rounded-lg border border-white overflow-hidden text-darkest placeholder:text-black/50 px-3 py-2 active:outline-none focus:outline-none focus:bg-white/60"
            placeholder="password"
            value={values.password}
            onBlur={handleBlur}
          />
          {errors.password && touched.password ? (
            <ErrorMessage>{errors.password}</ErrorMessage>
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
            "Login"
          )}
        </motion.button>
        <div className="flex gap-3 items-center justify-evenly w-5/6">
          <hr className=" w-fit flex-grow bg-white/30" />
          <p className="text-white ">or</p>
          <hr className=" w-fit flex-grow bg-white/30" />
        </div>

        <p className="text-white ">
          Reset your password?{" "}
          {/* <Link className="text-black font-semibold" href={"/"}>
            Sign Up
          </Link>{" "} */}
        </p>
      </form>
    </div>
  );
}

export default PromtUserReAuthwithPassword;

const passwordSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .max(50, "Password must be less than 50 characters")
    .required("Password is required"),
});

const reAuthUser = async (user: User, password: string) => {
  if (user.email) {
    const credential = EmailAuthProvider.credential(user.email, password);
    try {
      const { user: authedUser } = await reauthenticateWithCredential(
        user,
        credential
      );
      const token = await authedUser.getIdToken(true);
      await fetch(`${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (e) {
      throw new Error("User is not authenticated");
    }
  }
};
