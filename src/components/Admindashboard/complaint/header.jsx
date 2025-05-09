import { FiDownload, FiRefreshCw } from "react-icons/fi";
function Header() {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Complaints Management
        </h1>
        <p className="text-gray-600">
          Handle and resolve customer complaints efficiently
        </p>
      </div>
      <div className="flex items-center space-x-3">
        <button className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50">
          <FiRefreshCw className="mr-2" />
          Refresh
        </button>
      </div>
    </div>
  );
}

export default Header;
