"use client";

import DashboardNav from "@/components/Navbar/DashboardNav";
import { useSession } from "next-auth/react";
import NotFound from "@/app/not-found";
import { Wait } from "@/components/ComponentExporter";

const DashboardLayout = ({ children }) => {
  const { data: session, status } = useSession();

  return (
    <section>
      {status === "loading" ? (
        <>
          <Wait />
        </>
      ) : status === "authenticated" ? (
        <>
          <div className="flex lg:flex-row flex-col lg:items-center">
            <DashboardNav />
            {children}
          </div>
        </>
      ) : (
        <>
          <NotFound />
        </>
      )}
    </section>
  );
};

export default DashboardLayout;
