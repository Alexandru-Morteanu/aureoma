"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/app/components/lessCode/axios";
import { FilterSchema, ItemData, MODEL } from "../../../../constants";
import { supabase } from "@/app/components/supabase";
import Table from "../../components/display/Table";
import CategoryButtons from "@/app/components/display/CategoryButtons";
import { Details } from "@/app/components/Details";
import Filter from "@/app/components/display/Filter";
import Sort from "@/app/components/display/Sort";
import reqSupabase from "@/app/components/reqFunction";
export type Data = {
  data: ItemData[];
  stop: boolean;
};
function Dashboard() {
  const { push } = useRouter();
  const [showMoreButtons, setShowMoreButtons] = useState<boolean>(false);
  const [tableData, setTableData] = useState<ItemData[]>([]);
  const [expandDetails, setExpandDetails] = useState<boolean>(false);
  const [expandSortCresc, setExpandSortCresc] = useState<boolean>(false);
  const [filterTrigger, setFilterTrigger] = useState<boolean>(false);
  const [numberTrigger, setNumberTrigger] = useState<boolean>(false);
  const [expandSortDesc, setExpandSortDesc] = useState<boolean>(false);
  const [stopLoading, setStopLoading] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [nextReq, setNextReq] = useState<boolean>(false);
  const [details, setDetails] = useState<number>();
  const [sortData, setSortData] = useState<string>("");
  const [go, setGO] = useState<boolean>(false);
  const [filterData, setFilterData] = useState<FilterSchema>({
    pret: { min: undefined, max: undefined },
    greutate: { min: undefined, max: undefined },
    material: { aur: false, argint: false },
    model: MODEL.admin.reduce(
      (acc: any, cur: any) => ({ ...acc, [cur]: false }),
      {}
    ),
  });

  async function handleLogout() {
    try {
      await axiosInstance.post("/remove");
      push("/");
    } catch (error) {}
  }

  useEffect(() => {
    if (pageNumber === 1 && tableData.length > 0) {
      setNumberTrigger(!numberTrigger);
    }
    setTimeout(() => {
      setGO(true);
    }, 1000);
    setTableData([]);
    setStopLoading(false);
    setPageNumber(1);
  }, [sortData, filterTrigger]);

  useEffect(() => {
    handleRefresh(pageNumber, true);
  }, [pageNumber, numberTrigger]);

  useEffect(() => {
    if (nextReq && !stopLoading && !go) {
      const newPageNumber = pageNumber + 1;
      setPageNumber(newPageNumber);
      setNextReq(false);
    }
    if (go) {
      setGO(false);
    }
  }, [nextReq, sortData, go, filterTrigger]);

  async function handleRefresh(pageNumber: number, range: boolean) {
    try {
      const req: Data = await reqSupabase({
        articol: "*",
        filterData,
        sortData,
        pageNumber,
      });
      if (req.stop) {
        setStopLoading(true);
      }
      if (range) {
        setTableData((prevItems) => [...prevItems, ...req.data]);
      } else if (!range && pageNumber > 1) {
        setTableData(req.data);
      }
    } catch (error) {}
  }

  function handleDetails(index: number) {
    setExpandDetails(!expandDetails);
    setDetails(index);
  }

  function saveDetails(data: ItemData, index: number) {
    const newData = [...tableData];
    newData[index] = data;
    if (isNaN(data.greutate)) {
      alert("detalii gresite");
      return;
    }
    setTableData(newData);
  }

  async function handleDelete(id: number, path: string) {
    try {
      const { error } = await supabase.storage.from("Images").remove([path]);

      if (error) {
        console.error(error);
        return;
      }
      await supabase.from("item").delete().eq("id", id);
      handleRefresh(pageNumber, false);
    } catch (error) {}
  }

  function handleSort(sortBy: string) {
    setSortData(sortBy);
    setExpandSortCresc(false);
    setExpandSortDesc(false);
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
            filterTrigger={filterTrigger}
            setFilterTrigger={setFilterTrigger}
            filterData={filterData}
            setFilterData={setFilterData}
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
              filterTrigger={filterTrigger}
              sorted={sortData}
              tableData={tableData}
              handleDetails={handleDetails}
              setNextReq={setNextReq}
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
        />
      )}
    </div>
  );
}

export default Dashboard;
