import React, { useState } from "react";
type Props = {
  filterData: {
    min: number | undefined;
    max: number | undefined;
    aur: boolean;
    argint: boolean;
  };
  setFilterData: Function;
};
export default function Filter({ filterData, setFilterData }: Props) {
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
            <b>Pret</b>
            <input
              type="number"
              className="border border-gray-300 rounded-md p-2"
              style={{ width: "80%" }}
              value={filterData.min === undefined ? "" : filterData.min}
              onChange={(e) => {
                const value = e.target.value;
                setFilterData({
                  ...filterData,
                  min: value === "" ? undefined : parseFloat(value),
                });
              }}
              placeholder="Min Pret"
            />
            <input
              type="number"
              style={{ width: "80%" }}
              className="border border-gray-300 rounded-md p-2"
              value={filterData.max === undefined ? "" : filterData.max}
              onChange={(e) => {
                const value = e.target.value;
                setFilterData({
                  ...filterData,
                  max: value === "" ? undefined : parseFloat(value),
                });
              }}
              placeholder="Max Pret"
            />{" "}
            <b>Material</b>
            <div>
              <label className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  name="aurCheckbox"
                  onChange={(e) => {
                    setFilterData({
                      ...filterData,
                      aur: e.target.checked,
                    });
                  }}
                />
                Aur
              </label>
              <label className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  name="argintCheckbox"
                  onChange={(e) => {
                    setFilterData({
                      ...filterData,
                      argint: e.target.checked,
                    });
                  }}
                />
                Argint
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
