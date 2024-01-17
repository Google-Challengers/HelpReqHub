import { CiBoxes, CiBag1 } from "react-icons/ci";

const Role = () => {
  return (
    <>
      <section className="w-full lg:h-screen min-h-screen overflow-x-hidden overflow-y-auto bg-gradient-to-b from-emerald-100 via-green-300 to-emerald-500 flex flex-col items-center">
        <h1 className="font-black text-emerald-900 text-6xl md:7xl lg:text-9xl p-3 m-2 flex flex-col items-start w-full">
          Select Role
          <span className="text-xs md:text-sm font-thin text-gray-700 mx-1">
            Set up your role, get results based on your role.
          </span>
        </h1>
        <div className="w-full flex flex-col lg:flex-row lg:justify-center items-center p-3">
          <div className="cursor-pointer bg-black text-white p-3 m-2 flex flex-col items-center justify-between rounded-md hover:bg-gray-700">
            <CiBag1 className="text-9xl font-black" />
            <span className="text-5xl font-bold m-2">Receiver</span>
          </div>
          <div className="cursor-pointer bg-black text-white p-3 m-2 flex flex-col items-center justify-between rounded-md hover:bg-gray-700">
            <CiBoxes className="text-9xl font-black" />
            <span className="text-5xl font-bold m-2">Supplier</span>
          </div>
        </div>
        <div className="flex flex-row w-full p-6">
          <div className="p-2 w-1/2">
            <h3 className="font-bold text-slate-600 text-xl">
              Who is Receiver?
            </h3>
            <p className="w-fit text-black text-left font-thin">
              The Receiver will see all the supplier joined and can contact to
              them for the goods that they are supplying.
            </p>
          </div>
          <div className="p-2 w-1/2">
            <h3 className="font-bold text-slate-600 text-xl">
              Who is Supplier?
            </h3>
            <p className="w-fit text-black text-left font-thin">
              Their role is provide the goods on time and in better condition.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Role;
