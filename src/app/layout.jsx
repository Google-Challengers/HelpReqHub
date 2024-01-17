import "@/app/globals.css";

export const metadata = {
  title: "Recyclez",
  description: "This is our Google Solution Challenge Project.",
};

const RootLayout = ({ children }) => {
  return (
    <>
      <html lang="en">
        <body>{children}</body>
      </html>
    </>
  );
};

export default RootLayout;
