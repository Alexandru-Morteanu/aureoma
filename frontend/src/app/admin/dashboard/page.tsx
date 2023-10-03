"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/app/components/lessCode/axios";
import { ItemData } from "../../../../constants";
import { supabase } from "@/app/components/supabase";
import Table from "../../components/display/Table";
import CategoryButtons from "@/app/components/display/CategoryButtons";
import { Details } from "@/app/components/Details";
import Filter from "@/app/components/display/Filter";
import Sort from "@/app/components/display/Sort";

function Dashboard() {
  const { push } = useRouter();
  const [showMoreButtons, setShowMoreButtons] = useState<boolean>(false);
  const [tableData, setTableData] = useState<ItemData[]>([]);
  const [expandDetails, setExpandDetails] = useState<boolean>(false);
  const [expandSortCresc, setExpandSortCresc] = useState<boolean>(false);
  const [expandSortDesc, setExpandSortDesc] = useState<boolean>(false);
  const [aurChecked, setAurChecked] = useState<boolean>(false);
  const [argintChecked, setArgintChecked] = useState<boolean>(false);
  const [filter, setFilter] = useState<boolean>(false);
  const [originalIndices, setOriginalIndices] = useState<number[]>([]);
  const [details, setDetails] = useState<number>();
  const [filterData, setFilterData] = useState<{
    min: number | undefined;
    max: number | undefined;
    aur: boolean;
    argint: boolean;
  }>({ min: undefined, max: undefined, aur: false, argint: false });

  const [sort, setSort] = useState<string>("");

  useEffect(() => {
    handleRefresh();
  }, []);

  async function handleLogout() {
    try {
      await axiosInstance.post("/remove");
      push("/");
    } catch (error) {}
  }

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
  function saveDetails(data: ItemData, index: number) {
    const newData = [...tableData];
    newData[index] = data;
    if (isNaN(data.greutate) || isNaN(data.marime)) {
      alert("detalii gresite");
      return;
    }
    setTableData(newData);
    console.log(newData);
  }
  async function handleDelete(id: number, path: string) {
    try {
      const { error } = await supabase.storage.from("Images").remove([path]);

      if (error) {
        console.error(error);
        return;
      }
      const { data } = await supabase.from("item").delete().eq("id", id);
      handleRefresh();
    } catch (error) {}
  }
  function handleSort(sortBy: string) {
    setSort(sortBy);
    setExpandSortCresc(false);
    setExpandSortDesc(false);
  }
  function handleFilter(sortBy: string) {
    console.log("ok");
  }
  return (
    <div className="w-100 flex justify-center mt-5">
      <div
        className="flex flex-col items-center"
        style={{
          width: "80%",
        }}
      >
        <div
          className="flex"
          style={{
            width: "100%",
          }}
        >
          <Filter
            filterData={filterData}
            setFilterData={setFilterData}
            handleFilter={handleFilter}
          />
          <div className="w-100">
            <div className="flex items-center justify-between mx-8">
              <b className="text-4xl">Admin</b>
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
              filter={filter}
              originalIndices={originalIndices}
              setOriginalIndices={setOriginalIndices}
            />
          </div>
        </div>
        <button
          className="text-white bg-black"
          onClick={() => {
            setShowMoreButtons(!showMoreButtons);
          }}
        >
          Add
        </button>
        <div className=" flex justify-center">
          {showMoreButtons && <CategoryButtons />}
        </div>
        <button className="my-10" onClick={handleLogout}>
          Log out
        </button>
      </div>
      {expandDetails && (
        <Details
          data={tableData}
          index={details}
          closeDetails={handleDetails}
          saveDetails={saveDetails}
          handleDelete={handleDelete}
          originalIndices={originalIndices}
        />
      )}
    </div>
  );
}

export default Dashboard;
