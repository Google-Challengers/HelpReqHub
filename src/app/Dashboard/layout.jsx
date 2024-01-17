import DashboardNav from "@/components/Navbar/DashboardNav";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex lg:flex-row flex-col lg:items-center">
      <DashboardNav />
      {children}
    </div>
  );
};

export default DashboardLayout;
