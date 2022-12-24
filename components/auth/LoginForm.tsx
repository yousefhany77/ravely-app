"use client";
import { useContext } from "react";
import { useFormik } from "formik";
import { motion, AnimatePresence } from "framer-motion";
import { SyncLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from "../../context/authContext";
import * as Yup from "yup";
import GoogleLogin from "./LoginButton";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useMonted from "../../hooks/useMonted";

function LoginForm() {
  const router = useRouter();
  const { login, signInWithGoogle, user: userData } = useContext(AuthContext);
  const { mounted } = useMonted();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      const { email, password } = values;
      try {
        const user = await login(email, password);

        if (user) {
          toast.success("Loged In successfully" ,{
            autoClose: 1000,
          });
          resetForm();
          router.push("/my-space");
        }
      } catch (error: any) {
        if (error === "You must be subscribed to access Ravely") {
          toast.error(error, {
            hideProgressBar: true,
            closeOnClick: true,
            autoClose: 5000,
            onClose: () => {
              router.push("/plans");
            },
            bodyStyle: {
              textTransform: "capitalize",
            },
          });
          router.push("/plans");
        } else {
          toast.error(error.code || `${error}`, {
            hideProgressBar: true,
            bodyStyle: {
              textTransform: "capitalize",
            },
          });
        }
      } finally {
        mounted && setSubmitting(false);
      }
    },
  });
  const signInWithGoogleHandler = async () => {
    setSubmitting(true);
    try {
      setErrors({});
      const user = await signInWithGoogle();
      if (user) {
        toast.success("Loged In successfully",{
          autoClose: 1000,
          onClose: () => {
            // router.replace("/my-space")
            router.push("/my-space");
          }
        });
       
      }
    } catch (error) {
      if (error === "You must be subscribed to access Ravely") {
        toast.error(error, {
          hideProgressBar: true,
          autoClose: 5000,
          onClose: () => {
            toast.loading("Redirecting to plans page");
            router.push("/plans");
          },
          bodyStyle: {
            textTransform: "capitalize",
          },
        });
      }
    } finally {
      mounted && setSubmitting(false);
    }
  };
  const { errors, touched, isSubmitting, setSubmitting, resetForm, setErrors } =
    formik;

  return (
    <div className=" rounded-l-2xl form-shadow bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-rose-700 to-orange-300 via-red flex flex-col items-center justify-center p-6">
      <ToastContainer limit={3} />

      <h1 className="mx-auto font-bold text-2xl lg:text-4xl my-6 text-white w-fit">
        Login
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

        <div className="flex flex-col gap-3 lg:flex-row items-center  justify-between min-w-full">
          <Link
            className="text-black font-semibold hover:underline"
            href={"/forgot-password"}
          >
            Forgot Password
          </Link>
          <p className="text-white ">
            Don&apos;t have an Account?{" "}
            <Link
              className="text-black font-semibold hover:underline"
              href={"/signup"}
            >
              Sign Up
            </Link>{" "}
          </p>
        </div>
      </form>
      <GoogleLogin onClick={signInWithGoogleHandler} className="mt-8 mb-2" />
    </div>
  );
}

export default LoginForm;

export const ErrorMessage = ({
  children,
  key,
}: {
  children: React.ReactNode;
  key?: any;
}) => {
  return (
    <AnimatePresence>
      <motion.p
        key={key}
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

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email must be a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .max(50, "Password must be less than 50 characters")
    .required("Password is required"),
});
