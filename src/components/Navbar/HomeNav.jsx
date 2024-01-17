"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const HomeNav = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  return (
    <>
      <nav
        className={clsx(
          "bg-black border-b-2 border-solid border-slate-100 w-full px-5 py-2 flex flex-row items-center justify-between",
          pathname.toLowerCase().includes("dashboard") ? "hidden" : "flex"
        )}
      >
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
          {status === "loading" ? (
            <>
              <span className="text-xs text-white">Loading</span>
            </>
          ) : status === "authenticated" ? (
            <Link
              href={`/Dashboard/${session?.user?.name}`}
              className="flex flex-col sm:flex-row items-center justify-between gap-1"
            >
              <button
                type="button"
                className="px-2 py-3 rounded-full text-white hover:underline mx-1"
              >
                Dashboard
              </button>
              <img
                src={session?.user?.image}
                alt="/"
                width={40}
                height={40}
                className="w-8 h-8 rounded-full border-2 border-solid border-white mx-1 p-1"
              />
            </Link>
          ) : (
            <Link href={"/Login"}>
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
