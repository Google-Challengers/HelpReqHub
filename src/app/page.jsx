import { MoveToAboutPageBtn } from "@/components/ComponentExporter";

const Home = () => {
  const appName = "HelpReqHub ";

  return (
    <>
      <section className="w-full min-h-screen flex flex-col items-center bg-gray-950">
        <div className="w-full m-1 flex flex-col items-center justify-between">
          <h1 className="text-5xl sm:text-7xl md:text-9xl font-black capitalize bg-gradient-to-r from-fuchsia-400 via-pink-400 to-fuchsia-500 text-transparent bg-clip-text m-1">
            {appName}
          </h1>
          <br></br>
          <span className="text-base text-white m-1 font-light font-mono">
            An End-to-End Helping System
          </span>
        </div>
        <div className="w-full p-2 md:px-8 flex flex-col items-start justify-between m-2">
          <p className="text-white font-light text-center p-1 m-2 flex flex-col">
            <span className="text-3xl m-1 text-pink-500">{`Initiative`}</span>
            <br></br>
            <span className="text-white font-light text-base md:text-xl hover:bg-gradient-to-b hover:from-yellow-500 hover:to-orange-500 hover:text-transparent hover:bg-clip-text font-mono">
              Our app, {appName}, is a digital platform dedicated to fostering a
              culture of empathy and assistance within communities. We believe
              in the power of collective support. Our app connects individuals
              seeking help with those eager to offer assistance, creating a
              network of compassion. With {appName}, no request goes unheard.
              Whether it's a global call for aid or a community-specific need,
              our platform facilitates meaningful connections and tangible acts
              of kindness. From global outreach to local initiatives, {appName}
              is your gateway to making a positive impact. Together, we're
              rewriting the narrative of community support and empowerment. In a
              world that often feels disconnected, {appName} bridges the gap
              between those in need and those willing to lend a hand. Together,
              we're creating a web of support that knows no bounds.
            </span>
            <span className="text-3xl m-1 text-pink-500">{}</span>
          </p>
          <div className="w-full items-center flex flex-col">
            <MoveToAboutPageBtn />
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
