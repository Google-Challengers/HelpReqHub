const MessageCard = ({ time, desc }) => {
  return (
    <>
      <div className="p-2 bg-white rounded-lg flex flex-col items-start w-fit m-1">
        <span className="text-blue-800 font-black mx-1">{time}.</span>
        <p className="text-black font-light text-sm">{desc}</p>
      </div>
    </>
  );
};

export default MessageCard;
