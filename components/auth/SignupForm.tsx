"use client";
import { useContext } from "react";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import { SyncLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import { signupSchema } from "./signupSchema";
import { AuthContext } from "../../context/authContext";
import { ErrorMessage } from "./LoginForm";
import Link from "next/link";
import GoogleLogin from "./LoginButton";
import { useRouter } from "next/navigation";
import useMonted from "../../hooks/useMonted";
import { sendEmailVerification, updateProfile } from "firebase/auth";
import { addDoc, collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase-init";
import { loadStripe } from "@stripe/stripe-js";

function SignupForm() {
  const {
    signUp,
    signInWithGoogle,
    user: userData,
    signOut,
  } = useContext(AuthContext);
  const router = useRouter();

  const { mounted } = useMonted();
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
    validationSchema: signupSchema,
    onSubmit: async (values) => {
      const { email, password, username } = values;
      try {
        const user = await signUp(email, password);
        if (user) {
          toast.success("Account created successfully");
          await updateProfile(user, {
            displayName: username,
          });
          resetForm();
          await sendEmailVerification(user, {
            url: "http://localhost:3000/login",
          });
          toast.info(
            "please complete the checkout process to complete your account reigstration"
          );
          toast.success("Email verification sent, check your inbox and spam", {
            autoClose: 5000,
          });
          await signOut();
          const docRef = doc(db, "customers", user.uid);
          const colRef = collection(docRef, "checkout_sessions");
          toast.loading("Free plan checkout... ");
          const rec = await addDoc(colRef, {
            price: process.env.NEXT_PUBLIC_STRIPE_FREE_PLAN!,
            success_url: `${window.location.origin}/my-space`,
            cancel_url: "http://localhost:3000/",
          });

          onSnapshot(rec, async (snap) => {
            const data = snap.data();
            if (data!.error) {
              alert(data!.error.message);
            }
            if (data!.sessionId) {
              const stripe = await loadStripe(
                process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
              );

              stripe?.redirectToCheckout({ sessionId: data!.sessionId });
            }
          });
        }
      } catch (error: any) {
        toast.error(error.message, {
          hideProgressBar: true,
          bodyStyle: {
            textTransform: "capitalize",
          },
        });
      } finally {
        mounted && setSubmitting(false);
      }
    },
  });
  const signInWithGoogleHandler = async () => {
    setSubmitting(true);
    setErrors({});
    const user = await signInWithGoogle();
    if (user) {
      toast.success("Loged In successfully");
      setSubmitting(false);
      router.replace("/");
    }
    mounted && resetForm();
  };
  const { errors, touched, isSubmitting, setSubmitting, resetForm, setErrors } =
    formik;

  return (
    <div className=" rounded-l-2xl form-shadow bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-rose-700 to-orange-300 via-red flex flex-col items-center justify-center p-6">
      <ToastContainer limit={3} />

      <h1 className="mx-auto font-bold text-4xl my-6 text-white w-fit">
        Sign up
      </h1>
      <form
        onSubmit={formik.handleSubmit}
        className=" w-full h-full  flex flex-col gap-3  items-center justify-evenly"
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
        <div className="flex gap-3 items-center justify-evenly w-full opacity-90 my-2">
          <hr className=" w-fit flex-grow bg-white" />
          <p className="text-white ">
            Aleary have an Account?{" "}
            <Link className="text-black font-semibold" href={"/login"}>
              Sign In
            </Link>{" "}
          </p>
          <hr className=" w-fit flex-grow bg-white" />
        </div>
        <motion.button
          layout
          type="submit"
          disabled={isSubmitting}
          className="w-full my-2 py-2 bg-white/30 rounded-lg text-white font-bold transition-colors ease duration-200 hover:bg-white hover:text-dark disabled:bg-white/30
        "
        >
          {isSubmitting ? (
            <SyncLoader color="rgb(190, 18, 60)" size={6} />
          ) : (
            "Sign Up"
          )}
        </motion.button>
      </form>
      <GoogleLogin onClick={signInWithGoogleHandler} className="mt-2 mb-1" />
    </div>
  );
}

export default SignupForm;
