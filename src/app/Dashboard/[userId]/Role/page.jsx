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
              Who is Requester/Help seeker?
            </h3>
            <p className="w-fit text-black text-left font-thin">
              As a help seeker on HelpReqHub, your main task is to articulate
              your needs and seek assistance from the community. Your task as a
              help seeker is to submit requests for support, outlining your
              specific challenges or requirements, on HelpReqHub's platform.
              Help seekers play a proactive role in identifying their needs and
              taking steps to seek the support they require from the HelpReqHub
              community.
            </p>
          </div>
          <div className="p-2 w-1/2">
            <h3 className="font-bold text-slate-600 text-xl">Who is Helper?</h3>
            <p className="w-fit text-black text-left font-thin">
              Your primary task is to lend a helping hand to those in need.
              Helpers on HelpReqHub play a crucial role in providing assistance
              and support to individuals facing various challenges. Your tasks
              as a helper may include offering guidance, providing resources, or
              simply being a compassionate listener to those seeking help.
              Helpers on HelpReqHub have the opportunity to make a meaningful
              difference in the lives of others by offering their skills, time,
              and support. Whether it's offering practical solutions, emotional
              support, or simply a sympathetic ear, helpers on HelpReqHub
              contribute to building a supportive community. As a helper, you'll
              have the chance to respond to help requests, connect with
              individuals in need, and offer your expertise or assistance where
              it's needed most.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Role;
