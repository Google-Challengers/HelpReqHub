import {
  CommunityCard,
  NewCommunityForm,
} from "@/components/ComponentExporter";
import { BsFillQuestionOctagonFill } from "react-icons/bs";

const Communities = () => {
  return (
    <>
      <section className="w-full lg:h-screen min-h-screen overflow-x-hidden overflow-y-auto bg-gradient-to-b from-purple-200 via-purple-300 to-purple-500 flex flex-col items-center">
        <h1 className="font-black text-purple-900 text-6xl md:text-7xl lg:text-9xl p-3 m-2 flex flex-col items-start w-full">
          Community
          <span className="text-xs md:text-sm font-thin text-gray-700 mx-1">
            find/join/create <span className="text-black font-black">NEW</span>{" "}
            communities.
          </span>
        </h1>
        <div className="w-full my-2 p-2 flex flex-col items-start">
          <div className="m-1 flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-1">
            <BsFillQuestionOctagonFill className="text-black font-black text-xl" />
            <span className="text-black font-normal text-lg">
              Make sure you trust the Community you are joining and follow the
              rules set by them. Build your trust also, with them.
            </span>
          </div>
        </div>
        <div className="w-full my-2 flex flex-row items-start p-2">
        <CommunityCard />
        </div>
      </section>
    </>
  );
};

export default Communities;
