import { ProfileForm } from "@/components/ComponentExporter";

const Profile = () => {
  return (
    <>
      <section className="w-full lg:h-screen min-h-screen overflow-x-hidden overflow-y-auto bg-gradient-to-b from-fuchsia-100 via-pink-300 to-rose-500 flex flex-col items-center">
        <h1 className="font-black text-fuchsia-900 text-6xl md:7xl lg:text-9xl p-3 m-2 flex flex-col items-start w-full">
          Profile
          <span className="text-xs md:text-sm font-thin text-gray-700 mx-1">
            Set up your profile, others can see this.
          </span>
        </h1>
        <div className="flex flex-col w-full p-5">
          <ProfileForm />
        </div>
      </section>
    </>
  );
};

export default Profile;
