import { CommunityOne } from "@/components/ComponentExporter";

const Community = ({ params }) => {
  return (
    <>
      <section className="w-full lg:h-screen min-h-screen overflow-x-hidden overflow-y-auto bg-gradient-to-b from-purple-200 via-fuchsia-300 to-fuchsia-500 flex flex-col items-center">
        <h1 className="font-black text-purple-900 text-6xl md:text-7xl lg:text-9xl p-3 m-2 flex flex-col items-start w-full">
          Community
          <span className="text-xs md:text-sm font-thin text-gray-700 mx-1">
            find/join/create <span className="text-black font-black">NEW</span>{" "}
            communities.
          </span>
        </h1>
        <div className="w-full flex flex-col items-start">
          <h2 className="font-black text-black text-3xl md:text-4xl lg:text-5xl p-3 m-2 flex flex-col items-start w-full">
            {params.communityName}
            <span className="text-xs md:text-sm font-thin text-gray-700 mx-1 my-2">
              we aim to provide a way to handle your money in a way that will be
              useful for others and you will also get benefit from it. we take
              up money from you every month and provide loans on interest to the
              customer (who are in community) and every year end we will return
              your deposited money to you back and interest on that money.
            </span>
          </h2>
        </div>
        <div className="w-full flex flex-col items-start m-1 p-1">
          <CommunityOne />
        </div>
      </section>
    </>
  );
};

export default Community;
