import Link from "next/link";

const HomeBtn = () => {
  return (
    <>
      <Link href={"/About-Us"}>
        <button
          type="button"
          className="px-3 py-4 rounded-full shadow-md shadow-slate-200 text-slate-300 font-black text-xl self-center m-3 hover:bg-sky-500"
        >
          Want to Know More
        </button>
      </Link>
    </>
  );
};

export default HomeBtn;
