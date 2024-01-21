import { SelectRoleBtns } from "@/components/ComponentExporter";

const Role = () => {
  return (
    <>
      <section className="w-full lg:h-screen min-h-screen overflow-x-hidden overflow-y-auto bg-gradient-to-b from-emerald-100 via-green-300 to-emerald-500 flex flex-col items-center">
        <h1 className="font-black text-emerald-900 text-6xl md:7xl lg:text-9xl p-3 m-2 flex flex-col items-start w-full">
          Select Role
          <span className="text-xs md:text-sm font-thin text-gray-700 mx-1">
            Set up your role, get results based on your role.{" "}
            <span className="font-normal text-black">
              ( * for global requestors )
            </span>
          </span>
        </h1>
        <div className="w-full flex flex-col lg:flex-row lg:justify-center items-center p-3">
          <SelectRoleBtns />
        </div>
        <div className="flex flex-row w-full p-6">
          <div className="p-2 w-1/2">
            <h3 className="font-bold text-slate-600 text-xl">
              Who is Receiver?
            </h3>
            <p className="w-fit text-black text-left font-thin">
              The Receiver can request the resources what he/she want. Then
              supplier will see that request and send you message to help you
              for that request. Then you have to contact with the supplier.
              After the request is successfully resolved then you(receiver) will
              have to update the status of that request.
            </p>
          </div>
          <div className="p-2 w-1/2">
            <h3 className="font-bold text-slate-600 text-xl">
              Who is Supplier?
            </h3>
            <p className="w-fit text-black text-left font-thin">
              Their role is to provide the goods on time and in better
              condition. Go to{" "}
              <span className="font-bold">Global Requests</span> tab to see all
              the requests.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Role;
