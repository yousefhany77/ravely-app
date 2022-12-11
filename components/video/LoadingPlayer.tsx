import { SyncLoader } from "react-spinners";
import Head from "../../app/(media)/movie/head";

const LoadingPlayer = () => {
  return (
    <section className="h-[70vw]  w-full animate-pulse ">
      <div className="w-[70vw] h-auto aspect-video bg-slate-800 p-5 rounded-xl flex flex-col items-center justify-center gap-4 ">
        <Head title={"Ravely"} />
        <SyncLoader color="rgb(190, 18, 60)" size={16} loading={true} />
        <p className="text-lg font-bold">loading</p>
      </div>
    </section>
  );
};

export default LoadingPlayer;
