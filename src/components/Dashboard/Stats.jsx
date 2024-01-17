const Stats = () => {
  return (
    <>
      <div className="w-full mt-3">
        <h4 className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold text-black bg-gray-400 px-3 py-1 rounded-full w-fit">
          Real-Time Stats{" "}
          <span className="text-xl text-blue-600 font-extrabold">{`(`}</span>
          <span className="font-pacifico text-slate-700 text-sm mx-1">
            All your activities
          </span>
          <span className="text-xl text-blue-600 font-extrabold">{`)`}</span>
        </h4>
        <p className="text-sm font-normal mt-1 p-1 text-black">
          If you are supplier then you have to update the supplied status by
          clicking on it, then if receiver will receive it then it will be
          shown.
        </p>
        <div className="mt-3 md:m-4">
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3"
                    title="Change it by clicking"
                  >
                    {/* Updated by the supplier */}
                    Status (Supplied)
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Receiver
                  </th>
                  <th scope="col" className="px-6 py-3">
                    {/* Updated by the receiver */}
                    Status (Received)
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    E-Waste
                  </th>
                  <td className="px-6 py-4">30 kg</td>
                  <td className="px-6 py-4">$1.5/kg</td>
                  <td className="px-6 py-4 text-red-500">Pending...</td>
                  <td className="px-6 py-4 cursor-pointer hover:text-blue-500">
                    krishna
                  </td>
                  <td className="px-6 py-4 text-red-500">Pending...</td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    E-Waste
                  </th>
                  <td className="px-6 py-4">200 kg</td>
                  <td className="px-6 py-4">$0.33/kg</td>
                  <td className="px-6 py-4 text-green-500">Sent</td>
                  <td className="px-6 py-4 cursor-pointer hover:text-blue-500">
                    ram
                  </td>
                  <td className="px-6 py-4 text-red-500">Pending...</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Stats;
