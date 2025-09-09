import React from "react";
import { RxCross1 } from "react-icons/rx";

const SeeUserData = ({ userDivData, userDiv, setuserDiv }) => {
  return (
    <>
      {/* Background Overlay */}
      <div
        className={`${userDiv} fixed top-0 left-0 h-screen w-full bg-zinc-800 opacity-80 z-40`}
        onClick={() => setuserDiv("hidden")} // Click outside to close
      ></div>

      {/* Modal */}
      <div
        className={`${userDiv} fixed top-0 left-0 h-screen w-full flex items-center justify-center z-50`}
      >
        <div className="bg-white rounded-xl p-6 w-[80%] md:w-[50%] lg:w-[40%] shadow-lg relative">
          {/* Header */}
          <div className="flex items-center justify-between border-b pb-2">
            <h1 className="text-2xl font-semibold text-gray-800">
              User Information
            </h1>
            <button
              onClick={() => setuserDiv("hidden")}
              className="text-red-500 hover:text-red-700"
            >
              <RxCross1 size={20} />
            </button>
          </div>

          {/* User Details */}
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-gray-600">
                Username:{" "}
                <span className="font-semibold text-gray-900">
                  {userDivData?.username || "N/A"}
                </span>
              </label>
            </div>
            <div>
              <label className="block text-gray-600">
                Email:{" "}
                <span className="font-semibold text-gray-900">
                  {userDivData?.email || "N/A"}
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SeeUserData;
