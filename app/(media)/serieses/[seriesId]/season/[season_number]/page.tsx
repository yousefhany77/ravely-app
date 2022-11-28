import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { cookies } from "next/headers";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";
import EpisodeCard from "../../../../../../components/cards/MovieCard";
import FavoriteButton from "../../../../../../components/Favorite";
import Rating from "../../../../../../components/Rating";
import { db, FirebaseApp } from "../../../../../../firebase/firebase-init";
import { SeriesPage } from "../../../../../../pages/api/serieses";
import { getImageUrl } from "../../../../../../util/getImageUrl";
import Slider from "../../../../movie/[movieId]/Slider";
import Head from "../../head";
const getSeasonData = async (
  id: number,
  season_number: number
): Promise<SeasonResponse> => {
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/${id}/season/${season_number}?api_key=${process.env.API_KEY}&language=en-US`
  );
  const data = await res.json();
  return data;
};

interface Props {
  params: {
    seriesId: number;
    season_number: number;
  };
}
async function page({ params: { seriesId, season_number } }: Props) {
  const seasonDetails = await getSeasonData(seriesId, season_number);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/serieses?id=${seriesId}`
  );
  const seriesDetails: SeriesPage = await res.json();
  if (seriesDetails.id === undefined) notFound();

  const tabTitle = seriesDetails.title;
  const rating = seriesDetails.vote_average;
  const ep_runTime = seriesDetails.episode_run_time;

  const nextCookies = cookies();
  const token = nextCookies.get("token")?.value;
  const auth = getAuth(FirebaseApp);
  const currentUser =  auth.currentUser;
  if (currentUser) {
    const uid = currentUser.uid;
    const docRef = uid && doc(db, "favorite", uid);
    const docSnap = docRef && (await getDoc(docRef));
    const isFavorite: boolean =
      !!docSnap && docSnap.data()?.[`s-${seriesId}-${season_number}`];

    return (
      <>
        <Head title={`${tabTitle} | season ${season_number}`} />
        <main className="h-full text-white">
          <div className="w-full mx-auto  aspect-video relative overflow-hidden">
            <div className="bg-gradient-to-b from-transparent via-transparent to-zinc-900 w-full h-full absolute z-50" />
            <Image
              src={getImageUrl(seasonDetails.poster_path, "original")}
              alt="movie poster"
              fill
              priority
              className="object-cover"
              placeholder="blur"
              blurDataURL={getImageUrl(seasonDetails.poster_path, "w300")}
            />
            <section className="p-5  absolute  top-2/3 -translate-y-2/3 w-1/2 bg-light-gray/30 backdrop-blur-lg rounded-tr-2xl rounded-br-2xl z-[51] hidden lg:block">
              <div className="flex gap-2 items-center justify-between">
                <h1 className="capitalize text-4xl my-3 font-extrabold text-red">
                  {seriesDetails.title} | S
                  {seasonDetails.season_number
                    ? seasonDetails.season_number
                    : "No title"}
                </h1>
                <Rating rating={rating} />
              </div>
              <p className="text-justify">
                {seasonDetails.overview
                  ? seasonDetails.overview
                  : "No overview available"}
              </p>
              <div className="flex justify-between items-center my-1">
                <p>
                  • Duration: {(ep_runTime / 60).toFixed(0)}h {ep_runTime % 60}m
                </p>
                <p>
                  • Episodes: {seasonDetails.episodes?.length || "unknown"}{" "}
                </p>

                <FavoriteButton
                  isFavorite={isFavorite}
                  mediaId={`s-${seriesId}-${season_number}`}
                  uid={uid}
                />
              </div>
            </section>
          </div>
          <section className="p-5 my-5 w-full  block lg:hidden">
            <div className="flex gap-2 items-center justify-between">
              <h1 className="capitalize text-4xl my-3 font-extrabold text-red">
                {seriesDetails.title} | S
                {seasonDetails.season_number
                  ? seasonDetails.season_number
                  : "No title"}
              </h1>
              <Rating rating={rating} />
            </div>
            <p className="text-justify">
              {seasonDetails.overview
                ? seasonDetails.overview
                : "No overview available"}
            </p>
            <div className="flex justify-between items-center my-1">
              <p>
                • Duration: {(ep_runTime / 60).toFixed(0)}h {ep_runTime % 60}m
              </p>
              <p>• Episodes: {seasonDetails.episodes?.length || "unkown"} </p>
              <FavoriteButton
                isFavorite={isFavorite}
                mediaId={`s-${seriesId}-${season_number}`}
                uid={uid}
              />
            </div>
          </section>
          <section className="w-[80vw] mx-auto p-5">
            <h2 className="text-3xl font-bold my-6">Episodes</h2>
            <Slider className="md:min-w-[33%] lg:min-w-[25%] min-w-[25%]">
              {seasonDetails.episodes.map((data) => {
                const ep = {
                  id: data.id,
                  title: `Ep ${data.episode_number} | ${data.name}`,
                  poster_path: data.still_path,
                  vote_average: data.vote_average,
                  media_type: "episode",
                  episode_number: data.episode_number,
                  season_number: season_number,
                  seriesId,
                };
                return <EpisodeCard data={ep} key={ep.id} />;
              })}
            </Slider>
          </section>
        </main>
      </>
    );
  }
}
export default page;

interface SeasonResponse {
  episodes: episode[];
  season_number: number;
  poster_path: string;
  overview: string;
}

interface episode {
  id: number;
  episode_number: number;
  name: string;
  still_path: string;
  vote_average: number;
  media_type: string;
  guest_stars: {
    character: string;
    credit_id: string;
    name: string;
    profile_path: string;
  };
}
