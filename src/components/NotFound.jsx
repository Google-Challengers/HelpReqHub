const NotFound = ({ msg }) => {
  return (
    <>
      <div className="p-1 flex flex-col items-center w-full">
        <img
          src={"/not-found.png"}
          alt="/"
          className="w-32 h-32 m-1 rounded-full border-8 border-solid border-black p-1"
        />
        <h1 className="text-xl text-black font-black m-1">{msg}</h1>
      </div>
    </>
  );
};

export default NotFound;
