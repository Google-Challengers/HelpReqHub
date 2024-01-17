import { OAuth, Auth } from "@/components/ComponentExporter";

const Login = () => {
  return (
    <section className="w-full min-h-screen text-white bg-black flex flex-col items-center">
      <div className="flex flex-col items-center justify-between">
        <h1 className="font-bold text-4xl m-2 text-white">
          Welcome to
          <span className="font-bold bg-gradient-to-r from-rose-400 to-red-500 text-transparent bg-clip-text text-6xl capitalize mx-2">
            Recyclez
          </span>
        </h1>
        <h2 className="text-sm m-2 text-slate-400 font-light">
          An end-to-end Waste Management System
        </h2>
      </div>
      <div className="m-3 w-full flex flex-col items-center">
        <Auth />
        <div className="w-full flex flex-row items-center justify-between max-w-md">
          <span className="w-full h-[1px] bg-slate-400 mx-2"></span>
          <span className="text-base text-slate-400 font-light mx-1 mb-1">
            or
          </span>
          <span className="w-full h-[1px] bg-slate-400 mx-2"></span>
        </div>
      </div>
      <div className="flex flex-col">
        <OAuth />
      </div>
    </section>
  );
};

export default Login;
