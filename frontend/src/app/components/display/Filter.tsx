import React, { useState } from "react";
import { FilterSchema } from "../../../../constants";
type Props = {
  filterData: FilterSchema;
  setFilterData: Function;
  setFilterTrigger: Function;
  filterTrigger: boolean;
};
export default function Filter({
  filterData,
  setFilterData,
  setFilterTrigger,
  filterTrigger,
}: Props) {
  const handleFilterChange = (key: string) => {
    if (key === "aur" || key === "argint") {
      setFilterData({
        ...filterData,
        material: {
          ...filterData.material,
          [key]: !filterData.material[key],
        },
      });
    } else if (key in filterData.model) {
      setFilterData({
        ...filterData,
        model: {
          ...filterData.model,
          [key]: !filterData.model[key],
        },
      });
    } else if (filterData.marime && key in filterData.marime) {
      setFilterData({
        ...filterData,
        marime: {
          ...filterData.marime,
          [key]: !filterData.marime[key],
        },
      });
    }
  };

  const handleInputChange = (e: any, category: string, type: string) => {
    const value = e.target.value;
    setFilterData((prev: any) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [type]: value === "" ? undefined : parseFloat(value),
      },
    }));
  };

  return (
    <div className="flex items-center flex-col m-6" style={{ width: 200 }}>
      <div className=" flex justify-center">
        <div className="flex justify-center items-center flex-col absolute ">
          <div
            className="flex flex-col gap-2"
            style={{
              width: 150,
            }}
          >
            <b>Material</b>
            {renderCheckboxes(filterData.material, handleFilterChange)}
            <b>Model</b>
            {renderCheckboxes(filterData.model, handleFilterChange)}
            {filterData.marime && Object.keys(filterData.marime).length > 0 && (
              <>
                <b>Marime</b>
                {renderCheckboxes(filterData.marime, handleFilterChange)}
              </>
            )}
            <b>Pret</b>
            <input
              type="number"
              className="border border-gray-300 rounded-md p-2"
              style={{ width: "80%" }}
              value={filterData.pret.min ?? ""}
              onChange={(e) => handleInputChange(e, "pret", "min")}
              placeholder="Min Pret"
            />
            <input
              type="number"
              style={{ width: "80%" }}
              className="border border-gray-300 rounded-md p-2"
              value={filterData.pret.max ?? ""}
              onChange={(e) => handleInputChange(e, "pret", "max")}
              placeholder="Max Pret"
            />
            <b>Greutate</b>
            <input
              type="number"
              className="border border-gray-300 rounded-md p-2"
              style={{ width: "80%" }}
              value={filterData.greutate.min ?? ""}
              onChange={(e) => handleInputChange(e, "greutate", "min")}
              placeholder="Min Greutate"
            />
            <input
              type="number"
              style={{ width: "80%" }}
              className="border border-gray-300 rounded-md p-2"
              value={filterData.greutate.max ?? ""}
              onChange={(e) => handleInputChange(e, "greutate", "max")}
              placeholder="Max Greutate"
            />
          </div>
          <div className="w-100">
            <button
              className="bg-gray-500 mt-4 rounded"
              style={{ width: "80%" }}
              onClick={() => {
                setFilterTrigger(!filterTrigger);
              }}
            >
              Filter data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
const renderCheckboxes = (data: any, handleFilterChange: any) => {
  return (
    <div className="max-h-32 overflow-y-auto">
      {Object.keys(data).map((key) => (
        <label key={key} className="flex gap-2 items-center">
          <input
            type="checkbox"
            checked={data[key]}
            onChange={() => handleFilterChange(key)}
          />
          {key}
        </label>
      ))}
    </div>
  );
};
/*
TODO
  Edit/Add - Modele
  BUY
  CHART
*/
