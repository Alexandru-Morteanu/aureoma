import React, { useState } from "react";
type Props = {
  handleSort: (index: string) => void;
  expandSort: boolean;
  setExpandSort: Function;
};
export default function Sort({ handleSort, expandSort, setExpandSort }: Props) {
  function handleExpandSort() {
    setExpandSort(!expandSort);
  }
  return (
    <>
      <button
        className="bg-gray-400 m-3 p-2 rounded-lg shadow-md hover:bg-gray-500 transition duration-300"
        onClick={() => handleExpandSort()}
      >
        Sort
      </button>
      <div className="flex justify-center">
        {expandSort && (
          <div className="z-20 flex flex-col absolute right-10 top-12 bg-black text-white rounded-lg shadow-md p-2 space-y-2">
            <div>
              <button
                className="bg-gray-800 text-white p-2 rounded-md hover:bg-gray-600 transition duration-300"
                onClick={() => {
                  handleSort("PretCresc");
                }}
              >
                Pret ↑
              </button>
              <button
                className="bg-gray-800 text-white p-2 rounded-md hover:bg-gray-600 transition duration-300"
                onClick={() => handleSort("PretDesc")}
              >
                Pret ↓
              </button>
            </div>
            <div>
              <button
                className="bg-gray-800 text-white p-2 rounded-md hover:bg-gray-600 transition duration-300"
                onClick={() => handleSort("GreutateCresc")}
              >
                Greutate ↑
              </button>
              <button
                className="bg-gray-800 text-white p-2 rounded-md hover:bg-gray-600 transition duration-300"
                onClick={() => handleSort("GreutateDesc")}
              >
                Greutate ↓
              </button>
            </div>
            <div>
              <button
                className="bg-gray-800 text-white p-2 rounded-md hover:bg-gray-600 transition duration-300"
                onClick={() => handleSort("MarimeCresc")}
              >
                Marime ↑
              </button>
              <button
                className="bg-gray-800 text-white p-2 rounded-md hover:bg-gray-600 transition duration-300"
                onClick={() => handleSort("MarimeDesc")}
              >
                Marime ↓
              </button>
            </div>
            <button
              className="bg-gray-800 text-white p-2 rounded-md hover:bg-gray-600 transition duration-300"
              onClick={() => handleSort("Alfabetic")}
            >
              Alfabetic
            </button>
          </div>
        )}
      </div>
    </>
  );
}
