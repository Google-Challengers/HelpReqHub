const Wait = () => {
  return (
    <div className="flex flex-col bg-black w-full min-h-screen p-2 text-white items-center">
      <h1 className="text-white font-black m-1 p-1 text-6xl">Wait ...</h1>
      <p className="text-xl m-1 p-2 text-zinc-400">
        Checking your login staus, this will take only few seconds
      </p>
    </div>
  );
};

export default Wait;
