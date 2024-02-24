import "@/app/globals.css";
import {
  AuthProvider,
  HomeNavigationBar,
} from "@/components/ComponentExporter";
import { getServerSession } from "next-auth";
import Script from "next/script";

export const metadata = {
  title: "HelpReqHub",
  description: "An end-to-end helping system.",
};

const RootLayout = async ({ children }) => {
  const session = await getServerSession();

  return (
    <>
      <html lang="en">
        <head>
          <Script
            async
            strategy="beforeInteractive"
            src={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.GOOGLE_MAP_API_KEY}`}
          />
        </head>
        <body>
          <AuthProvider session={session}>
            <HomeNavigationBar />
            {children}
          </AuthProvider>
        </body>
      </html>
    </>
  );
};

export default RootLayout;
