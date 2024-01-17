import DashboardNav from "@/components/Navbar/DashboardNav";

const DashboardLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div className="flex lg:flex-row flex-col lg:items-center">
          <DashboardNav />
          {children}
        </div>
      </body>
    </html>
  );
};

export default DashboardLayout;
