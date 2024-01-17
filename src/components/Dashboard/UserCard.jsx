import Link from "next/link";

const UserCard = () => {
  return (
    <>
      <div className="min-w-[298px] flex flex-col items-center border rounded-lg shadow bg-gray-800 border-gray-700 m-2">
        <img
          className="rounded-t-lg w-full max-w-xs h-auto md:max-w-xs border-b-2 border-solid border-gray-700 shadow-sm shadow-gray-600"
          src={"/test-waste.png"}
          width={250}
          height={250}
          alt="Waste Card"
        />
        <div className="p-5 w-full flex flex-col items-start">
          <div className="text-white">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
              E-Waste
            </h5>
          </div>
          <p className="mb-3 font-normal text-gray-400 flex flex-col">
            <span>Name: Karan Yadav</span>
            <span>Amount: 130 kg</span>
            <span>By: Jan, 24 2024</span>
          </p>
          <Link
            href={"#"}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg focus:ring-4 focus:outline-none bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
          >
            See details
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>
        </div>
      </div>
    </>
  );
};

export default UserCard;
