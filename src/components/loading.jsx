const loading = ({ msg }) => {
  return (
    <>
      <div className="w-full items-center flex flex-col p-1">
        <h1 className="text-xl font-black m-1 text-black capitalize">{msg}</h1>
      </div>
    </>
  );
};

export default loading;
