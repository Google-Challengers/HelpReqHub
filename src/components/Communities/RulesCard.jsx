const RulesCard = ({ n, desc }) => {
  return (
    <>
      <div className="p-2 bg-white rounded-lg flex flex-row items-start w-fit m-1">
        <span className="text-blue-800 font-black mx-1">{n}.</span>
        <p className="text-black font-light text-sm">{desc}</p>
      </div>
    </>
  );
};

export default RulesCard;
