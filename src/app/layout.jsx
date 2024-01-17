import "@/app/globals.css";
import {
  AuthProvider,
  HomeNavigationBar,
} from "@/components/ComponentExporter";
import { getServerSession } from "next-auth";

export const metadata = {
  title: "Recyclez",
  description: "This is our Google Solution Challenge Project.",
};

const RootLayout = async ({ children }) => {
  const session = await getServerSession();

  return (
    <>
      <html lang="en">
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
