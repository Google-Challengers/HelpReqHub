import Image from "next/image";
import { Stats } from "@/components/ComponentExporter";

const Dashboard = ({ params }) => {
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
        <div className="mt-3 p-1 w-full flex flex-col items-start">
          <div className="w-full mt-4">
            <Stats />
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
