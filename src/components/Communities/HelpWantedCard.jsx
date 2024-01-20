const HelpWantedCard = () => {
  return (
    <>
      <div className="bg-white w-fit p-2 rounded-md flex flex-col items-start m-1">
        <div className="flex flex-row items-start">
          <img
            src={`/default-user.webp`}
            alt="/"
            className="w-11 h-11 rounded-full border-2 border-solid border-white"
          />
          <div className="flex flex-col items-start mx-1">
            <h1 className="font-black text-black text-base">Karan Yadav</h1>
            <h2 className="text-slate-700 font-light text-sm">
              karan@gmail.com
            </h2>
          </div>
        </div>
        <h4 className="text-black m-1">
          <span className="text-slate-700 mr-1 font-normal">Title:</span>
          <span>Lorem ipsum dolor sit amet.</span>
        </h4>
        <p className="text-black m-1">
          <span className="text-slate-700 mr-1 font-normal">Description:</span>
          <span className="font-medium text-base">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias iusto
            minima mollitia laboriosam veritatis magni laudantium et qui quidem
            modi voluptas consequuntur corrupti quibusdam ipsa ut repellendus
            commodi repudiandae adipisci, vel ipsam, vitae porro quia? Enim esse
            itaque ducimus placeat suscipit blanditiis quisquam perferendis
            incidunt ut error eligendi, magni explicabo?
          </span>
        </p>
        <p className="text-black m-1 bg-green-700 p-1 rounded-md">
          <span className="text-black mr-1 font-normal">Time:</span>
          <span className="font-medium text-base text-white">
            By 29-01-2024
          </span>
        </p>
      </div>
    </>
  );
};

export default HelpWantedCard;
