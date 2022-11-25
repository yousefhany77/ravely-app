"use client";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
interface Props {
  pagesCount: number;
  location: string;
}
function Paginition({ pagesCount, location }: Props) {
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page") || "1")
  );

  let pages: any[] = [];

  for (let i = currentPage - 1; i >= currentPage - 4 && i > 0; i--) {
    pages.unshift(
      <li
        onClick={() => setCurrentPage(i)}
        className="rounded-lg bg-dark flex items-center justify-center w-10 h-10 flex-grow  cursor-pointer transition-colors duration-150 ease-in-out  hover:bg-light-gray"
        key={i}
      >
        <a href={`/${location}?page=${i}`}>{i}</a>
      </li>
    );
  }
  for (let i = currentPage; i < currentPage + 4 && i < pagesCount; i++) {
    pages.push(
      <li
        onClick={() => setCurrentPage(i)}
        className={`${
          i === currentPage ? "!bg-red shadow-md " : ""
        }  flex items-center justify-center w-10 h-10 flex-grow bg-dark rounded-lg   cursor-pointer transition-colors duration-150 ease-in-out  hover:bg-light-gray`}
        key={i}
      >
        <a href={`${i > 1 ? `/${location}?page=${i}` : "/${location}"}`}>{i}</a>
      </li>
    );
  }
  pages.push(
    <li
      className="font-bold rounded-lg  bg-dark flex items-center justify-center w-10 h-10 flex-grow "
      key={"currentPage + 1"}
    >
      ...
    </li>
  );

  pages.push(
    <li
      onClick={() => setCurrentPage(pagesCount)}
      className={`${
        pagesCount === currentPage ? "!bg-red shadow" : "bg-dark"
      } rounded-lg  w-10 h-10 flex-grow flex items-center justify-center   cursor-pointer transition-colors duration-150 ease-in-out  hover:bg-light-gray`}
      key={pagesCount}
    >
      <a href={`/${location}?page=${pagesCount}`}> {pagesCount}</a>
    </li>
  );

  return (
    <ul className="flex gap-1 my-6 overflow-hidden bg-darkest  text-white w-fit mx-auto rounded-lg  border-red border-2 ">
      {pages}
    </ul>
  );
}

export default Paginition;
