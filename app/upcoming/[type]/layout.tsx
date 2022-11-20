import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
interface Props {
  children: React.ReactNode;
  params: {
    type: string;
  };
}
function Layout({ children, params: { type } }: Props) {
  if (type !== "movies" && type !== "serieses") {
    return notFound();
  }
  return (
    <section className="my-5">
      <div className="w-fit mx-auto  text-white flex  items-center justify-center bg-light-gray  rounded-full overflow-hidden">
        <Link
          href={"/upcoming/movies"}
          className={` ${
            type === "movies"
              ? "bg-red border-red font-bold shadow rounded-full"
              : null
          } px-5 py-1 `}
        >
          Movies
        </Link>
        <Link
          href={"/upcoming/serieses"}
          className={` ${
            type === "serieses"
              ? "bg-red border-red font-bold shadow rounded-full"
              : null
          } px-5 py-1`}
        >
          Serieses
        </Link>
      </div>
      {children}
    </section>
  );
}

export default Layout;
