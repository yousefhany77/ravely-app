"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import Rating from "../Rating";
import useDebounce from "../../hooks/useDebounce";
import { getImageUrl } from "../../util/getImageUrl";
import { search, SearchResponse } from "../../util/search";
import Link from "next/link";

function Header() {
  const [term, setTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const depouncedTerm = useDebounce({ value: term, delay: 500 });
  const [results, setResults] = useState<SearchResponse | []>([]);
  const searchResRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const getData = async () => {
      const data = await search(depouncedTerm);
      setResults(data);
      setIsOpen(true);
      setLoading(false);
    };

    if (depouncedTerm) {
      getData();
    }
    return setLoading(true);
  }, [depouncedTerm]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        searchResRef.current &&
        !searchResRef.current.contains(e.target as HTMLElement)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handler);

    return () => {
      document.removeEventListener("click", () => handler);
    };
  }, []);
  return (
    <header className="   bg-darkest   flex  justify-between gap-3 px-3 w-full z-50">
      <div className="flex flex-col p-3 md:p-5 justify-center gap-3 w-full  md:max-w-[65%] relative  ">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="search"
          className=" text-white/90 border-2 outline-none   border-light-gray px-4  h-8 md:h-10   rounded-2xl  md:rounded-3xl bg-transparent placeholder:text-light-gray"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
        {loading && term && (
          <span className="text-white animate-pulse ">loading...</span>
        )}

        {results.length > 0 && isOpen && (
          <section
            ref={searchResRef}
            className="space-y-3 bg-dark shadow-lg z-50 shadow-black border text-white/90 border-light-gray/60 rounded-2xl   h-64 overflow-y-scroll absolute top-20"
          >
            {results.map((result) => (
              <Link
                onClick={() => setIsOpen(false)}
                href={`/movies/${result.id}`}
                key={result.id}
                className="grid grid-cols-[auto_1fr] gap-3 p-5 items-center border-b border-light-gray/30 pb-3 transition-all ease-in duration-200 hover:bg-darkest hover:border-light-gray cursor-pointer"
              >
                <Image
                  src={getImageUrl(result.poster_path)}
                  width={150}
                  height={225}
                  alt={result.name || result.title || result.original_title}
                  className=" rounded-lg md:rounded-2xl w-20 md:w-32 lg:full "
                />
                <p className="space-y-2 font-normal text-white/90  ">
                  <h2 className="md:font-bold md:text-lg tracking-wide leading-tight">
                    {result.name || result.title || result.original_title}
                  </h2>
                  <span className="hidden  md:block text-gray-400  ">
                    {result.overview && result.overview.length > 200
                      ? result.overview.substring(0, 120).concat("...")
                      : result.overview}
                  </span>
                  <span className="hidden md:block">
                    <Rating
                      rating={result.vote_average}
                      size={"3"}
                      fontSize={"sm"}
                    />{" "}
                  </span>
                  <span className="block md:hidden">
                    {result.vote_average} /10
                  </span>
                </p>
              </Link>
            ))}
          </section>
        )}
      </div>
      {/* Account */}
      <div className=" items-center justify-center gap-3 px-4 hidden md:flex ">
        <div className="  w-14 h-14 bg-slate-500 rounded-full relative border-2 border-red">
          <Image
            src={
              "https://uploads.dailydot.com/2022/07/the-boys-meme.jpg?auto=compress&fm=pjpg"
            }
            fill
            alt="profile"
            className="object-cover rounded-full"
          />
        </div>
        <span className="leading-5 text-sm">
          <h2 className=" font-medium text-slate-200">Homelander</h2>
          <span className="text-light-gray/60">@crayingbaby</span>
        </span>
      </div>
    </header>
  );
}

export default Header;
