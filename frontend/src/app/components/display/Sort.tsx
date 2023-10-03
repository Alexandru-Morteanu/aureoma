import React, { useState } from "react";
import { sortOptionsCresc, sortOptionsDesc } from "../../../../constants";
type Props = {
  handleSort: (index: string) => void;
  expandSortCresc: boolean;
  setExpandSortCresc: Function;
  expandSortDesc: boolean;
  setExpandSortDesc: Function;
};
export default function Sort({
  handleSort,
  expandSortCresc,
  setExpandSortCresc,
  expandSortDesc,
  setExpandSortDesc,
}: Props) {
  return (
    <div className="flex">
      <div>
        <button
          className="bg-gray-400 m-3 p-2 rounded-lg shadow-md hover:bg-gray-500 transition duration-300"
          onClick={() => {
            setExpandSortCresc(!expandSortCresc);
            setExpandSortDesc(false);
          }}
        >
          Sort ↑
        </button>
        {expandSortCresc && (
          <div className="absolute flex flex-col bg-black text-white rounded-lg p-2 space-y-2 z-50">
            {sortOptionsCresc.map((option, index) => (
              <button
                key={index}
                className="bg-gray-800 text-white p-2 rounded-md hover:bg-gray-600 transition duration-300"
                onClick={() => handleSort(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
      <div>
        <button
          className="bg-gray-400 m-3 p-2 rounded-lg shadow-md hover:bg-gray-500 transition duration-300"
          onClick={() => {
            setExpandSortDesc(!expandSortDesc);
            setExpandSortCresc(false);
          }}
        >
          Sort ↓
        </button>
        {expandSortDesc && (
          <div className="absolute flex flex-col bg-black text-white rounded-lg  p-2 space-y-2  z-50">
            {sortOptionsDesc.map((option, index) => (
              <button
                key={index}
                className="bg-gray-800 text-white p-2 rounded-md hover:bg-gray-600 transition duration-300"
                onClick={() => handleSort(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
