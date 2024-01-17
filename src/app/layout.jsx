import "@/app/globals.css";
import { HomeNavigationBar } from "@/components/ComponentExporter";

export const metadata = {
  title: "Recyclez",
  description: "This is our Google Solution Challenge Project.",
};

const RootLayout = ({ children }) => {
  return (
    <>
      <html lang="en">
        <body>
          <HomeNavigationBar />
          {children}
        </body>
      </html>
    </>
  );
};

export default RootLayout;
