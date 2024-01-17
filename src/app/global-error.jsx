"use client";

const GlobalError = ({ error, reset }) => {
  return (
    <html lang="en">
      <body className="p-2 w-full min-h-screen text-white bg-black flex flex-col items-center">
        <h2 className="text-8xl m-2 text-white capitalize font-black">
          Something went wrong!
        </h2>
        <p className="p-2 m-1 text-xs text-zinc-400 font-light">{error}</p>
        <button
          onClick={() => reset()}
          className="m-1 p-3 rounded-md bg-red-500"
        >
          Try again
        </button>
      </body>
    </html>
  );
};

export default GlobalError;
