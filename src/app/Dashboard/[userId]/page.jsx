import Image from "next/image";
import { Stats, UserCard, ReceiverForm } from "@/components/ComponentExporter";

const Dashboard = ({ params }) => {
  const currentRole = "receiver";

  return (
    <>
      <section className="w-full lg:h-screen min-h-screen overflow-x-hidden overflow-y-auto bg-gradient-to-r from-gray-200 via-zinc-400 to-slate-500 flex flex-col items-center">
        <div className="w-full flex flex-col md:flex-row justify-between items-center">
          <h1 className="font-black text-gray-900 text-5xl md:7xl lg:text-9xl p-3 m-2 flex flex-col items-start w-full">
            Dashboard
            <span className="text-xs md:text-sm font-thin text-gray-700 mx-1">
              graphical user interface
            </span>
          </h1>
          <Image
            src={"/dashboard-top.png"}
            alt="image"
            width={100}
            height={100}
            className="w-24 h-auto rounded-full mx-2"
            draggable={false}
          />
        </div>
        <h3
          className="text-xl font-semibold p-1"
          title="Change it in profile settings"
        >
          You are currently a{" "}
          <span className="font-black text-cyan-900 uppercase text-2xl">
            {currentRole == "receiver" ? <>Receiver</> : <>Supplier</>}
          </span>
        </h3>
        <div className="m-3 p-1 flex flex-col items-start w-full">
          <ReceiverForm />
        </div>
        <div className="mt-3 p-1 w-full flex flex-col items-start">
          <div className="flex flex-col w-full items-start">
            <h4 className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold text-black bg-gray-400 px-3 py-1 rounded-full">
              {currentRole != "receiver" ? <>Receiver</> : <>Supplier</>}
              {"s "}
              <span className="text-xl text-blue-600 font-extrabold">{`(`}</span>
              <span className="font-pacifico text-slate-700 text-sm mx-1">
                Based on your Location
              </span>
              <span className="text-xl text-blue-600 font-extrabold">{`)`}</span>
            </h4>
            <div className="w-full mt-4 flex flex-row items-center overflow-x-auto">
              <UserCard />
              <UserCard />
            </div>
          </div>
          <div className="w-full mt-4">
            <Stats />
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
