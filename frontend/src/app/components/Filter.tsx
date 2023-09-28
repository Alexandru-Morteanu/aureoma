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
  const [expandFilter, setExpandFilter] = useState<boolean>(false);

  function handleExpandSort() {
    setExpandFilter(!expandFilter);
  }
  return (
    <>
      <button
        className=" bg-gray-400 m-3 p-2"
        onClick={() => handleExpandSort()}
      >
        filter
      </button>
      <div className=" flex justify-center">
        {expandFilter && (
          <div className=" flex justify-center items-center flex-col absolute  gap-4 p-2">
            <div className="flex gap-2">
              <input
                type="number"
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
        )}
      </div>
    </>
  );
}
