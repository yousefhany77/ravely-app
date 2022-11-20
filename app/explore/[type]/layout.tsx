import Link from "next/link";
import Dropdown from "../../../components/layout/DropdownMenu";
import Providers from "../../../components/layout/ProviderFilter";
import Netflix from "../../../components/Icons/Netflix.svg";
import AmazonPrime from "../../../components/Icons/AmazonPrime.svg";
import HBO from "../../../components/Icons/HBO.svg";
import Disney from "../../../components/Icons/Disney.svg";
import { notFound } from "next/navigation";

const getGenres = async (type: string) => {
  if (type !== "movie") type = "tv";
  const response = await fetch(
    `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.API_KEY}&language=en-US`
  );
  const data = await response.json();
  return data;
};
const listYears = () => {
  const curr_year = new Date().getFullYear();
  const years = [];
  for (let i = 50; i >= 0; i--) {
    years.push({
      id: i,
      name: `${curr_year - i}`,
    });
  }
  return years;
};
interface Props {
  children: React.ReactNode;
  params: {
    type: string;
  };
}

const providers = [
  {
    id: 1,
    name: "Netflix",
    icon: <Netflix width={70} />,
  },
  {
    id: 2,
    name: "Amazon Prime",
    icon: <AmazonPrime width={70} />,
  },
  {
    id: 3,
    name: "Disney",
    icon: <Disney width={50} />,
  },
  {
    id: 4,
    name: "HBO",
    icon: <HBO width={50} />,
  },
];
const sorting = [
  {
    id: 0,
    name: "Newest",
  },

  {
    id: 1,
    name: "Most Popular",
  },
  { id: 2, name: "Top Rated" },
];
async function Layout({ children, params: { type } }: Props) {
  if (type !== "movies" && type !== "serieses") {
    return notFound();
  }
  const { genres } = await getGenres(type);
  const years = listYears();
  return (
    <section className="">
      <div className="w-fit lg:px-16  py-2 mx-auto border  border-light-gray rounded-2xl xl:rounded-full my-5  p-3 grid md:grid-cols-2 gap-2 xl:flex  xl:items-center xl:justify-evenly">
        <Dropdown options={genres} label="genre" />
        <Dropdown options={years} label="year" />
        {<Providers options={providers} label="network" />}
        <Dropdown options={sorting} label="sort" />
      </div>
      <div className="w-fit mx-auto  text-white flex  items-center justify-center bg-light-gray  rounded-full overflow-hidden">
        <Link
          href={"/explore/movies"}
          className={` ${
            type === "movies"
              ? "bg-red border-red font-bold shadow rounded-full"
              : null
          } px-5 py-1 `}
        >
          Movies
        </Link>
        <Link
          href={"/explore/serieses"}
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
