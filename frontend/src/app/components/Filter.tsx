import React, { useState } from "react";
type Props = {
  handleFilter: (index: string) => void;
  pretRange: { min: number | undefined; max: number | undefined };
  setPretRange: Function;
};
export default function Filter({
  handleFilter,
  pretRange,
  setPretRange,
}: Props) {
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
              value={pretRange.min === undefined ? "" : pretRange.min}
              onChange={(e) => {
                const value = e.target.value;
                setPretRange({
                  ...pretRange,
                  min: value === "" ? undefined : parseFloat(value),
                });
              }}
              placeholder="Min Pret"
            />
            <input
              type="number"
              style={{ width: "80%" }}
              className="border border-gray-300 rounded-md p-2"
              value={pretRange.max === undefined ? "" : pretRange.max}
              onChange={(e) => {
                const value = e.target.value;
                setPretRange({
                  ...pretRange,
                  max: value === "" ? undefined : parseFloat(value),
                });
              }}
              placeholder="Max Pret"
            />{" "}
          </div>
        </div>
      </div>
    </div>
  );
}
