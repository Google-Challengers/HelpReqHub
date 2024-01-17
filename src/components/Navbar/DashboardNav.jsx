"use client";

import { useState } from "react";
import Link from "next/link";
import { HamburgerIconBtn, CloseIconBtn } from "../ComponentExporter";
import { MdDashboardCustomize } from "react-icons/md";
import { ImProfile } from "react-icons/im";
import { RiLogoutBoxFill } from "react-icons/ri";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const DashboardNav = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [mobileNavIsOpen, setMobileNavIsOpen] = useState(false);
  const [navwidth, setNavwidth] = useState(100);
  const [navLinkVisibility, setNavLinkVisibility] = useState(false);

  const Links = [
    {
      title: "Dashboard",
      linkto: `/Dashboard/${session?.user?.name}`,
      iconname: MdDashboardCustomize,
    },
    {
      title: "Profile",
      linkto: `/Dashboard/${session?.user?.name}/Profile`,
      iconname: ImProfile,
    },
  ];

  const incNavWidth = () => {
    setNavwidth(navwidth + 100);
    setNavLinkVisibility(!navLinkVisibility);
  };

  const decNavWidth = () => {
    setNavwidth(navwidth - 100);
    setNavLinkVisibility(!navLinkVisibility);
  };

  const logoutHandler = async () => {
    await signOut({ redirect: false });
    router.replace("/");
  };

  return (
    <>
      <nav className="bg-gray-800 border-gray-700">
        {/* Mobile View */}
        <div className="lg:hidden w-full flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            href={"/"}
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src={"/logo.png"}
              width={30}
              height={30}
              className="w-8 h-auto rounded-sm"
              alt="Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
              Recyclez
            </span>
          </Link>
          <HamburgerIconBtn
            clickEvent={() => {
              setMobileNavIsOpen((prev) => !prev);
            }}
          />
          {mobileNavIsOpen ? (
            <div className="w-full">
              <ul className="flex flex-col font-medium mt-4 rounded-lg rtl:space-x-reverse bg-gray-800 border-gray-700">
                {Links.map((link, index) => {
                  return (
                    <li key={index}>
                      <Link
                        href={link.linkto}
                        onClick={() => {
                          setMobileNavIsOpen((prev) => !prev);
                        }}
                      >
                        <span className="w-full flex flex-row items-center py-2 px-3 rounded hover:bg-gray-700 text-white">
                          <link.iconname className="text-white text-2xl font-black mx-1" />
                          {link.title}
                        </span>
                      </Link>
                    </li>
                  );
                })}
                <li>
                  <span
                    onClick={logoutHandler}
                    className="w-full cursor-pointer py-2 px-3 rounded hover:bg-gray-700 text-white flex flex-row"
                  >
                    <RiLogoutBoxFill className="text-white text-2xl font-black mx-1" />
                    Logout
                  </span>
                </li>
              </ul>
            </div>
          ) : (
            <></>
          )}
        </div>

        {/* Desktop View */}
        <div
          className="hidden lg:flex flex-col items-center justify-between h-screen transition-all duration-[.5s] ease-linear p-2"
          style={{ width: navwidth }}
        >
          <div className="flex flex-col items-center p-1 w-full h-full">
            {!navLinkVisibility ? (
              <HamburgerIconBtn
                clickEvent={() => {
                  incNavWidth();
                }}
              />
            ) : (
              <CloseIconBtn
                clickEvent={() => {
                  decNavWidth();
                }}
              />
            )}
            <div className="mt-5 flex flex-col justify-evenly w-full">
              <ul className="flex flex-col font-medium rounded-lg bg-gray-800 border-gray-700">
                {Links.map((link, index) => {
                  return (
                    <li key={index}>
                      <Link
                        href={link.linkto}
                        onClick={() => {
                          setMobileNavIsOpen((prev) => !prev);
                        }}
                      >
                        <span
                          type="button"
                          className="rounded hover:bg-gray-700 text-white p-2 mt-1 cursor-pointer flex flex-row items-center justify-between"
                        >
                          {navLinkVisibility && link.title}
                          <link.iconname className="text-white text-2xl font-black mx-1" />
                        </span>
                      </Link>
                    </li>
                  );
                })}
                <li>
                  <span
                    type="button"
                    onClick={logoutHandler}
                    className="rounded hover:bg-gray-700 text-white p-2 mt-1 cursor-pointer flex flex-row items-center justify-between"
                  >
                    {navLinkVisibility && <>Logout</>}
                    <RiLogoutBoxFill className="text-white text-2xl font-black mx-1" />
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full flex items-center flex-col">
            <Link href={"/"} className="flex flex-col items-center">
              <img
                src={"/logo.png"}
                width={30}
                height={30}
                className="w-8 h-auto rounded-sm"
                alt="Logo"
                draggable={false}
              />
              <span className="text-xl font-semibold whitespace-nowrap text-white">
                Recyclez
              </span>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default DashboardNav;
