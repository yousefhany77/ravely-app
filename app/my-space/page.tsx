import MovieCard from "../../components/cards/MovieCard";
import ConintueWatching from "../../components/ConintueWatching";
import Carousel from "../../components/layout/carousel";
import { ListItem } from "../../util/getDataListing";
export default async function Home() {
  // fetch recommended list of movies and series passed on the user's preferences and history of watched content

  // fetch trending list of movies and series
  const trendingResponse = await fetch(
    `${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/getDataListing`,
    {
      cache: "no-store",
    }
  );
  const { results: trending }: { results: ListItem[] } =
    await trendingResponse.json();

  return (
    <main className="text-white w-full flex flex-col  p-10">
     
      <ConintueWatching />

      <section className="h-full  text-white  w-full  ">
        <h2 className="font-bold text-3xl my-6 ">Trending</h2>
        <div className="grid  md:grid-cols-3 lg:grid-cols-4  3xl:grid-cols-5 gap-4 ">
          {trending.map((item: any) => (
            <MovieCard data={item} key={item.id} />
          ))}
        </div>
      </section>
    </main>
  );
}
