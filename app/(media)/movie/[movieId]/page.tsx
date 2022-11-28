import Image from "next/image";
import React from "react";
import { getImageUrl } from "../../../../util/getImageUrl";
import Head from "../head";
interface Props {
  params: { movieId: string };
}
import { AiFillHeart } from "react-icons/ai";
import { MoviePage } from "../../../../pages/api/movie";
import VideoSlider from "./VideoSlider";
import Slider from "./Slider";
import CharacterCard from "../../../../components/cards/CharacterCard";
import MovieCard from "../../../../components/cards/MovieCard";
import Rating from "../../../../components/Rating";
import { notFound } from "next/navigation";
import FavoriteButton from "../../../../components/Favorite";

import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../firebase/firebase-init";
import { cookies } from "next/headers";
import { getAuth } from "firebase-admin/auth";
import { Admin_Firebase } from "../../../../firebase/firebase-admin";
const getMoveDetails = async (movieId: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/movie?id=${movieId}`
  );
  const data: MoviePage = await res.json();
  return data;
};
async function page({ params: { movieId } }: Props) {
  const movieDetails = await getMoveDetails(movieId);
  const nextCookies = cookies();
  const token = nextCookies.get("token")?.value!;
  const auth = getAuth(Admin_Firebase);
  const currentUser = await auth.verifyIdToken(token);

  if (!movieDetails.id) {
    notFound();
  }
  if (currentUser) {
    const uid = currentUser.uid;
    const docRef = uid && doc(db, "favorite", uid);
    const docSnap = docRef && (await getDoc(docRef));
    const isFavorite: boolean = !!docSnap && docSnap.data()?.[`m-${movieId}`];
    
    return (
      <>
        <Head title={movieDetails.title} />
        <main className=" h-full text-white ">
          <div className="w-full mx-auto  aspect-video relative overflow-hidden">
            <div className="bg-gradient-to-b from-transparent via-transparent to-zinc-900 w-full h-full absolute z-50" />
            <Image
              src={
                movieDetails.backdrop_path
                  ? getImageUrl(movieDetails.backdrop_path, "original")
                  : getImageUrl(movieDetails.poseter_path, "original")
              }
              alt="movie poster"
              fill
              priority
              className="object-cover"
              placeholder="blur"
              blurDataURL={
                movieDetails.backdrop_path
                  ? getImageUrl(movieDetails.backdrop_path, "w780")
                  : getImageUrl(movieDetails.poseter_path, "w300")
              }
            />
            {/* labtop and desktop  view 👇 */}
            <section className="p-5  absolute  top-2/3 -translate-y-2/3 w-1/2 bg-light-gray/30 backdrop-blur-lg rounded-tr-2xl rounded-br-2xl z-[51] hidden lg:block">
              <div className="flex gap-2 items-center justify-between">
                <h1 className="capitalize text-4xl my-3 font-extrabold text-red">
                  {movieDetails.title ? movieDetails.title : "No title"}
                </h1>
                <Rating rating={movieDetails.vote_average} />
              </div>
              <p className="text-justify">
                {movieDetails.overview
                  ? movieDetails.overview
                  : "No overview available"}
              </p>
              <div className="flex justify-between items-center my-1">
                <p>
                  • {(movieDetails.runtime / 60).toFixed(0)}h{" "}
                  {movieDetails.runtime % 60}m
                </p>
                <div className="flex items-center justify-end gap-3 ">
                  <button className="btn-primary px-5 py-2 rounded-xl cursor-pointer  my-2">
                    Watch Now
                  </button>
                  <FavoriteButton
                    isFavorite={isFavorite}
                    mediaId={`m-${movieId}`}
                    uid={uid}
                  />
                </div>
              </div>
            </section>
          </div>
          <section className="p-5 my-5 w-full  block lg:hidden">
            <h1 className="capitalize text-4xl my-3 font-extrabold text-red">
              {movieDetails.title ? movieDetails.title : "No title"}
            </h1>
            <p className="text-justify">
              {movieDetails.overview
                ? movieDetails.overview
                : "No overview available"}
            </p>
            <div className="flex items-center justify-end gap-3 my-3">
              <button className="btn-primary px-5 py-2 rounded-xl cursor-pointer flex-1">
                Watch Now
              </button>

              <FavoriteButton
                isFavorite={isFavorite}
                mediaId={`m-${movieId}`}
                uid={uid}
              />
            </div>
          </section>
          <section className="p-5 w-full lg:w-10/12 aspect-video mx-auto">
            <h2 className="text-4xl font-bold my-6">Trailers</h2>
            <VideoSlider trailers={movieDetails.trailers} />
          </section>
          <section className="w-[80vw] mx-auto p-5">
            <h2 className="text-3xl font-bold my-6">Cast</h2>
            <Slider className="min-w-[33%] md:min-w-[25%] lg:min-w-[16%]">
              {movieDetails.cast.map((cast) => (
                <CharacterCard character={cast} key={cast.id} />
              ))}
            </Slider>
          </section>
          {movieDetails.collection !== null && (
            <section className="w-[80vw] mx-auto p-5">
              <h2 className="text-3xl font-bold my-6">Parts</h2>
              <Slider className="md:min-w-[33%] lg:min-w-[25%] min-w-[25%] ">
                {movieDetails.collection!.map((data) => (
                  <MovieCard data={data} key={data.id} />
                ))}
              </Slider>
            </section>
          )}
          <section className="w-[80vw] mx-auto p-5">
            <h2 className="text-3xl font-bold my-6">Recommendations</h2>
            <Slider className="md:min-w-[33%] lg:min-w-[25%] min-w-[25%]">
              {movieDetails.recommendations.map((data) => (
                <MovieCard data={data} key={data.id} />
              ))}
            </Slider>
          </section>
        </main>
      </>
    );
  } else {
    return <div>Error</div>;
  }
}
export default page;
