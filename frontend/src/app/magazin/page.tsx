"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/components/supabase";
import Filter from "@/app/components/Filter";
import Sort from "@/app/components/Sort";
import { ItemData } from "../../../constants";
import Table from "../components/Table";

function Magazin() {
  const { push } = useRouter();
  const [tableData, setTableData] = useState<ItemData[]>([]);
  const [expandDetails, setExpandDetails] = useState<boolean>(false);
  const [expandSort, setExpandSort] = useState<boolean>(false);
  const [filter, setFilter] = useState<boolean>(false);
  const [originalIndices, setOriginalIndices] = useState<number[]>([]);
  const [details, setDetails] = useState<number>();
  const [pretRange, setPretRange] = useState<{
    min: number | undefined;
    max: number | undefined;
  }>({ min: undefined, max: undefined });

  const [sort, setSort] = useState<string>("");

  useEffect(() => {
    handleRefresh();
  }, []);

  async function handleRefresh() {
    try {
      const { data } = await supabase.from("item").select("*");
      setTableData(data || []);
    } catch (error) {}
  }

  function handleDetails(index: number) {
    setExpandDetails(!expandDetails);
    setDetails(index);
  }
  function handleSort(sortBy: string) {
    setSort(sortBy);
    setExpandSort(!expandSort);
  }
  function handleFilter(sortBy: string) {
    console.log("ok");
  }
  return (
    <div className="w-100 flex justify-center">
      <div
        className="flex my-10 flex-col items-center"
        style={{
          width: "80%",
        }}
      >
        <h2 className=" flex justify-center">Magazin</h2>
        <div className=" flex">
          <Sort
            handleSort={handleSort}
            expandSort={expandSort}
            setExpandSort={setExpandSort}
          />
          <Filter
            pretRange={pretRange}
            setPretRange={setPretRange}
            handleFilter={handleFilter}
          />
        </div>
        <Table
          sort={sort}
          tableData={tableData}
          handleDetails={handleDetails}
          pretRange={pretRange}
          filter={filter}
          originalIndices={originalIndices}
          setOriginalIndices={setOriginalIndices}
        />
      </div>
    </div>
  );
}

export default Magazin;
