const MemberCard = () => {
  return (
    <>
      <div className="flex flex-col items-start bg-white rounded-lg p-2 m-1">
        <img
          src={"/default-user.webp"}
          alt="/"
          className="w-11 h-11 rounded-full border-2 border-solid border-white"
        />
        <div className="flex flex-col items-start mx-1">
          <h4 className="flex flex-row items-center">
            <span className="text-zinc-800 font-light text-sm">Name:</span>
            <span className="text-blue-700 mx-1 font-bold">Karan Yadav</span>
          </h4>
          <h5 className="flex flex-row items-center">
            <span className="text-zinc-800 font-light text-sm">Email:</span>
            <span className="text-blue-700 mx-1 font-bold">abc@gmail.com</span>
          </h5>
          <h6 className="flex flex-row items-center">
            <span className="text-zinc-800 font-light text-sm">Contact:</span>
            <span className="text-blue-700 mx-1 font-bold">1029384756</span>
          </h6>
        </div>
      </div>
    </>
  );
};

export default MemberCard;
