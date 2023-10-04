"use client";
import React, { useEffect, useState } from "react";
import Filter from "./display/Filter";
import Sort from "./display/Sort";
import Table from "./display/Table";
import { ItemData } from "../../../constants";
import { supabase } from "./supabase";

type Props = {
  articol: string;
};

export default function TableKIT({ articol }: Props) {
  const [tableData, setTableData] = useState<ItemData[]>([]);
  const [expandDetails, setExpandDetails] = useState<boolean>(false);
  const [expandSortCresc, setExpandSortCresc] = useState<boolean>(false);
  const [expandSortDesc, setExpandSortDesc] = useState<boolean>(false);
  const [originalIndices, setOriginalIndices] = useState<number[]>([]);
  const [details, setDetails] = useState<number>();
  const [sort, setSort] = useState<string>("");
  const [filterData, setFilterData] = useState<{
    min: number | undefined;
    max: number | undefined;
    aur: boolean;
    argint: boolean;
  }>({ min: undefined, max: undefined, aur: false, argint: false });

  useEffect(() => {
    handleRefresh();
  }, []);
  async function handleRefresh() {
    try {
      const { data } = await supabase
        .from("item")
        .select()
        .eq("articol", articol);
      setTableData(data || []);
    } catch (error) {}
  }

  function handleDetails(index: number) {
    setExpandDetails(!expandDetails);
    setDetails(index);
  }

  function handleSort(sortBy: string) {
    setSort(sortBy);
    setExpandSortCresc(false);
    setExpandSortDesc(false);
  }

  return (
    <div className="w-100 flex justify-center mt-5">
      <div
        className="flex"
        style={{
          width: "80%",
        }}
      >
        <Filter filterData={filterData} setFilterData={setFilterData} />
        <div className="w-100">
          <div className="flex items-center justify-between mx-8">
            <b className="text-4xl">{articol}</b>
            <Sort
              handleSort={handleSort}
              expandSortCresc={expandSortCresc}
              setExpandSortCresc={setExpandSortCresc}
              expandSortDesc={expandSortDesc}
              setExpandSortDesc={setExpandSortDesc}
            />
          </div>
          <Table
            sort={sort}
            tableData={tableData}
            handleDetails={handleDetails}
            filterData={filterData}
            originalIndices={originalIndices}
            setOriginalIndices={setOriginalIndices}
          />
        </div>
      </div>
    </div>
  );
}
