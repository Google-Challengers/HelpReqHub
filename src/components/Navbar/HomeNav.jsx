import Link from "next/link";
import Image from "next/image";

const HomeNav = () => {
  const isLoggedIn = false;

  return (
    <>
      <nav className="bg-black border-b-2 border-solid border-slate-100 w-full px-5 py-2 flex flex-row items-center justify-between">
        <Link href={"/"}>
          <h1 className="flex flex-row items-center justify-between font-black cursor-pointer p-2 m-1 bg-white rounded-full text-slate-700 text-xl">
            <Image
              src={"/logo.png"}
              alt="logo"
              width={40}
              height={40}
              className="w-11 h-auto rounded-full shadow-sm mx-1"
            />
            Recyclez
          </h1>
        </Link>
        <div className="flex flex-row items-center justify-evenly mx-1">
          {isLoggedIn ? (
            <Link href={"/dashboard"}>
              <button
                type="button"
                className="px-2 py-3 rounded-full text-white hover:underline mx-1"
              >
                Dashboard
              </button>
            </Link>
          ) : (
            <Link href={"/login"}>
              <button
                type="button"
                className="px-2 py-3 rounded-full text-white hover:underline mx-1"
              >
                Login
              </button>
            </Link>
          )}
        </div>
      </nav>
    </>
  );
};

export default HomeNav;
