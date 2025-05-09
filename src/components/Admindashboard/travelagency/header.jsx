// import { FiPlus, FiRefreshCw } from "react-icons/fi";
// function Header() {
//   return (
//     <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//       <div>
//         <h1 className="text-2xl font-bold text-gray-800">Agency Management</h1>
//         <p className="text-gray-600">
//           Manage all registered travel agencies and their performance metrics.
//         </p>
//       </div>
//       <div className="flex items-center space-x-3">
//         <button className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50">
//           <FiRefreshCw className="mr-2" />
//           Refresh
//         </button>
//         <button className="flex items-center px-4 py-2 bg-[#1784ad] text-white rounded-lg hover:bg-[#14739c]">
//           <FiPlus className="mr-2" />
//           Add Agency
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Header;
import { useState } from "react";
import { FiPlus, FiRefreshCw, FiX } from "react-icons/fi";
// Update path as needed
import AddAgencyModal from "./AddTravelAgency";

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Agency Management
          </h1>
          <p className="text-gray-600">
            Manage all registered travel agencies and their performance metrics.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50">
            <FiRefreshCw className="mr-2" />
            Refresh
          </button>
          <button
            className="flex items-center px-4 py-2 bg-[#1784ad] text-white rounded-lg hover:bg-[#14739c]"
            onClick={() => setIsModalOpen(true)}
          >
            <FiPlus className="mr-2" />
            Add Agency
          </button>
        </div>
      </div>

      {isModalOpen && <AddAgencyModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
}

export default Header;
