import { MoveToAboutPageBtn } from "@/components/ComponentExporter";

const Home = () => {
  return (
    <>
      <section className="w-full min-h-screen flex flex-col items-center bg-black">
        <div className="w-full m-1 flex flex-col items-center justify-between">
          <h1 className="text-7xl md:text-9xl font-black capitalize bg-gradient-to-r from-fuchsia-400 via-pink-400 to-fuchsia-500 text-transparent bg-clip-text m-1">
            Recyclez
          </h1>
          <span className="text-base text-white m-1 font-light">
            An End-to-End Waste Management System
          </span>
        </div>
        <div className="w-full max-w-lg flex flex-col items-start justify-between m-2">
          <p className="text-white font-light text-center p-1 m-2 flex flex-col">
            <span className="text-3xl m-1 text-pink-500">{`####`}</span>
            <span className="text-white font-light text-base md:text-xl hover:bg-gradient-to-b hover:from-yellow-500 hover:to-orange-500 hover:text-transparent hover:bg-clip-text">
              In our waste management system, we empower users to foster a
              culture of sustainability by providing a platform to share items
              they no longer need. By promoting the exchange of unused goods, we
              aim to reduce waste and encourage a sense of community
              collaboration. Users can easily share items that still hold value,
              fostering a more sustainable and environmentally conscious
              lifestyle. Together, we contribute to a greener future by
              extending the life cycle of goods and minimizing the environmental
              impact of unnecessary waste.
            </span>
            <span className="text-3xl m-1 text-pink-500">{`####`}</span>
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
