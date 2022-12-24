"use client";
import Image from "next/image";
import { redirect } from "next/navigation";
import React, { memo, useContext, useState } from "react";
import { SyncLoader } from "react-spinners";
import { AuthContext, AuthProvider } from "../../../context/authContext";
import useSWR from "swr";
import { createPortalLink, db } from "../../../firebase/firebase-init";
import { collection, getDocs } from "firebase/firestore";
import { Subscription } from "./types";
import { useFormik } from "formik";
import { ErrorMessage } from "../../../components/auth/LoginForm";
import * as Yup from "yup";
import { updateEmail, updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Modal from "../../../components/Modal";
import Loader from "../../../components/layout/Loader/Loader";

const viewMyPlan = async () => {
  const { data }: { data: any } = await createPortalLink({
    returnUrl: window.location.href,
    locale: "auto", // Optional, defaults to "auto"
  });
  window.location.assign(data.url);
};
function Page() {
  return (
    <main className="h-full p-4  w-full max-w-7xl mx-auto py-5 flex flex-col items-center justify-evenly">
      {/* Account Details */}
      <AuthProvider>
        <div className="w-full">
          <h2 className="self-start text-white text-2xl font-extrabold">
            Account Details
          </h2>
          <AccountDetails />
        </div>
        <div className="w-full">
          <h2 className="self-start text-white text-2xl font-extrabold">
            Invoices
          </h2>
          <Invoice />
        </div>
      </AuthProvider>
    </main>
  );
}

export default Page;

const AccountDetails = memo(function AccountDetails() {
  const router = useRouter();
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const { user, loading } = useContext(AuthContext);
  const [editMode, setEditMode] = useState(false);

  const { data, error } = useSWR(
    user !== null ? user.uid : null,
    async () => {
      const customerRef = collection(
        db,
        "customers",
        user!.uid,
        "subscriptions"
      );
      const subscription = await getDocs(customerRef);
      return subscription.docs[0].data() as Subscription;
    },
    {}
  );
  const {
    errors,
    values,
    isSubmitting,
    setSubmitting,
    handleBlur,
    handleChange,
    touched,
    handleSubmit,
  } = useFormik({
    initialValues: {
      email: user?.email || "",
      username: user?.displayName || "",
    },
    validationSchema: Yup.object().shape({
      username: Yup.string()
        .min(3, "Username must be at least 3 characters")
        .max(50, "Username must be less than 50 characters")
        .required("Username is required"),
      email: Yup.string()
        .email("Email must be a valid email")
        .required("Email is required"),
    }),
    onSubmit: async (values) => {
      try {
        // change user email and user name passed on auth provider
        if (user) {
          await updateProfile(user, {
            displayName: values.username,
          });
          values.email && (await updateEmail(user, values.email));
          toast.success("Profile updated successfully");
          setEditMode(false);
          setSubmitting(false);
        }
      } catch (error) {
        setSubmitting(false);
        toast.error("some thing went wrong!");
        setEditMode(false);
        return router.push("/reauth");
      }
    },
  });
  const promptDeleteModal = () => {
    setDeleteModalShow(true);
  };
  const deleteAccHandler = () => {
    user
      ?.delete()
      .then(() => {
        toast.success("Account deleted successfully");
      })
      .catch((error) => {
        if (error.code === "auth/requires-recent-login") {
          toast.error("To delete the account requires recent login");
          return router.push("/reauth");
        }
        toast.error("something went wrong!");
      });
  };
  if (loading || (!data && !error)) {
    return <Loader />;
  }
  if (!user) {
    redirect("/login");
  }

  if (data) {
    return (
      <section className="my-6 w-full  text-white grid lg:grid-cols-[minmax(100px,190px)_1fr] gap-6 lg:items-center">
        {deleteModalShow && (
          <Modal handler={deleteAccHandler}>
            <p className="my-4 text-center">
              {" "}
              Are you sure you want to delete your account? All of your data
              will be permanently removed. This action cannot be undone.
            </p>
          </Modal>
        )}
        <div className="relative overflow-hidden rounded-full w-2/3 mx-auto lg:mx-0 lg:w-full aspect-square border-red border-4">
          <Image
            src={
              user.photoURL?.replace("s96", "s256") ||
              "https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
            }
            alt="profile picture"
            fill
            className=" object-cover "
            priority
          />
        </div>
        <div className="flex flex-wrap  gap-16 justify-between w-full  items-end">
          <div className="flex flex-col gap-2  ">
            {editMode ? (
              <>
                <div className="form-control">
                  <label
                    htmlFor="username"
                    className="mx-1 text-white font-bold  "
                  >
                    Username:
                  </label>
                  <input
                    onChange={handleChange}
                    name="username"
                    className="bg-white/30 font-semibold  w-full rounded-lg border border-white overflow-hidden text-darkest placeholder:text-black/50 px-3 py-2 active:outline-none focus:outline-none focus:bg-white/60"
                    placeholder="username"
                    type="text"
                    value={values.username}
                    onBlur={handleBlur}
                  />
                  {errors.username && touched.username ? (
                    <ErrorMessage key={errors.username}>
                      {errors.username}
                    </ErrorMessage>
                  ) : null}
                </div>
                <div className="form-control">
                  <label
                    htmlFor="email"
                    className="mx-1 text-white font-bold  "
                  >
                    Email:
                  </label>
                  <input
                    onChange={handleChange}
                    name="email"
                    className="bg-white/30 font-semibold  w-full rounded-lg border border-white overflow-hidden text-darkest placeholder:text-black/50 px-3 py-2 active:outline-none focus:outline-none focus:bg-white/60"
                    placeholder="email"
                    type="email"
                    value={values.email}
                    onBlur={handleBlur}
                  />
                  {errors.email && touched.email ? (
                    <ErrorMessage key={errors.email}>
                      {errors.email}
                    </ErrorMessage>
                  ) : null}
                </div>
              </>
            ) : (
              <>
                <Info label="Username" info={user.displayName || "No Name"} />
                <Info label="Email" info={user.email || "No Email"} />
              </>
            )}
          </div>
          <Info
            label="Subscription"
            info={data?.items[0].price.product.name || "Free"}
          />
          <Info
            label="Renewal  Date"
            info={new Date(
              data.current_period_end.seconds * 1000
            ).toLocaleString("en-UK", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          />
          <div className="flex flex-grow gap-3 justify-end p-2 self-start justify-self-end flex-wrap lg:flex-nowrap">
            {!editMode ? (
              <button
                disabled={isSubmitting}
                onClick={() => setEditMode(true)}
                className="px-4 py-2 rounded-lg bg-white text-red transition-colors duration-200 ease-in-out hover:bg-slate-400 w-full lg:w-fit"
              >
                {isSubmitting ? (
                  <SyncLoader color="rgb(190, 18, 60)" size={6} />
                ) : (
                  "Edit"
                )}
              </button>
            ) : (
              <>
                <button
                  disabled={isSubmitting}
                  className="px-4 py-2 rounded-lg bg-white text-red transition-colors duration-200 ease-in-out hover:bg-slate-400 w-full lg:w-fit"
                  onClick={() => handleSubmit()}
                >
                  {isSubmitting ? (
                    <SyncLoader color="rgb(190, 18, 60)" size={6} />
                  ) : (
                    "Save"
                  )}
                </button>
                <button
                  disabled={isSubmitting}
                  onClick={() => {
                    setSubmitting(true);
                    viewMyPlan();
                  }}
                  className="px-4 py-2 rounded-lg bg-white text-red transition-colors duration-200 ease-in-out hover:bg-slate-400 w-full lg:w-fit"
                >
                  {isSubmitting ? (
                    <SyncLoader color="rgb(190, 18, 60)" size={6} />
                  ) : (
                    "Edit my plan"
                  )}
                </button>
              </>
            )}
            <button
              onClick={promptDeleteModal}
              className="px-4 py-2 rounded-lg bg-red text-white w-full lg:w-fit"
            >
              Delete Account
            </button>
          </div>
        </div>
      </section>
    );
  } else {
    return <div>error</div>;
  }
});

const Info = ({ label, info }: { label: string; info: string }) => {
  return (
    <div className="flex flex-col">
      <span className="text-xl font-bold text-slate-500">{label}</span>
      <span className="text-lg text-white">{info}</span>
    </div>
  );
};

const Invoice = () => {
  const { user } = useContext(AuthContext);

  const [isSubmitting, setSubmitting] = useState(false);
  const invoiceHandler = () => {
    setSubmitting(true);
    viewMyPlan();
  };
  if (user) {
    return (
      <button
        disabled={isSubmitting}
        onClick={invoiceHandler}
        className="px-4 py-2 rounded-lg bg-white text-red transition-colors duration-200 ease-in-out hover:bg-slate-400 my-6  w-full lg:w-fit"
      >
        {isSubmitting ? (
          <SyncLoader color="rgb(190, 18, 60)" size={6} />
        ) : (
          "View "
        )}
      </button>
    );
  }

  return null;
};
