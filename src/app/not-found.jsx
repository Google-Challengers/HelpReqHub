import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex text-white flex-col items-center justify-center w-full min-h-screen bg-black">
      <h2 className="m-1 text-4xl text-white font-black flex flex-col sm:flex-row items-center gap-2">
        <span className="text-red-600 text-6xl mx-1">{`[404]`}</span>Not Found
      </h2>
      <p className="m-1 text-lg text-zinc-400">
        Could not find requested resource
      </p>
      <Link href="/">
        <button type="button" className="text-white px-3 py-3 m-2 bg-blue-500">
          Return Home
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
