import React from "react";
import Card from "../../components/card/Card";
import { ListResponse } from "../../util/getDataListing";

async function page() {
  const data: ListResponse = await fetch(
    "https://api.themoviedb.org/3/movie/upcoming?api_key=54095c148fb928ecb6191c64df56e75f&language=en-US&page=1"
  ).then((response) => response.json());
  return (
    <div className=" h-full  text-white px-10">
      <section>
        <h2 className="font-bold text-4xl my-6  capitalize">upcoming movies</h2>
        <div className="grid  md:grid-cols-3 lg:grid-cols-4  3xl:grid-cols-5 gap-4 ">
          {data.results.map((item: any) => (
            <Card data={item} key={item.id} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default page;
