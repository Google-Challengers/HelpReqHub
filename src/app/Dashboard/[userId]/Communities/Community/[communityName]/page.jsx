import { CommunityOne } from "@/components/ComponentExporter";

const Community = ({ params }) => {
  return (
    <>
      <section className="w-full lg:h-screen min-h-screen overflow-x-hidden overflow-y-auto bg-gradient-to-b from-purple-200 via-fuchsia-300 to-fuchsia-500 flex flex-col items-center">
        <h1 className="font-black text-purple-900 text-5xl md:text-7xl lg:text-9xl p-3 m-2 flex flex-col items-start w-full">
          Community
          <span className="text-xs md:text-sm font-thin text-gray-700 mx-1">
            find/join/create <span className="text-black font-black">NEW</span>{" "}
            communities.
          </span>
        </h1>
        <div className="w-full flex flex-col items-start m-1 p-1">
          <CommunityOne name={params.communityName} />
        </div>
      </section>
    </>
  );
};

export default Community;
