"use client";
import React, { useEffect, useState } from "react";
import Filter from "./display/Filter";
import Sort from "./display/Sort";
import Table from "./display/Table";
import { FilterSchema, ItemData, MARIME, MODEL } from "../../../constants";
import reqSupabase from "./reqFunction";

type Props = {
  articol: string;
};

export default function TableKIT({ articol }: Props) {
  let model: any = MODEL;
  let marime: any = MODEL;

  switch (articol) {
    case "Inel":
      model = MODEL.Inel;
      marime = MARIME.Inel;
      break;
    case "Cercei":
      model = MODEL.Cercei;
      marime = [];
      break;
    case "Lant":
      model = MODEL.Lant;
      marime = MARIME.Lant;
      break;
    case "Bratara":
      model = MODEL.Lant;
      marime = MARIME.Bratara;
      break;
    case "Pandantiv":
      model = MODEL.Pandantive;
      marime = [];
      break;
    default:
      marime = [];
      model = [];
      break;
  }
  const [tableData, setTableData] = useState<ItemData[]>([]);
  const [expandDetails, setExpandDetails] = useState<boolean>(false);
  const [expandSortCresc, setExpandSortCresc] = useState<boolean>(false);
  const [expandSortDesc, setExpandSortDesc] = useState<boolean>(false);
  const [nextReq, setNextReq] = useState<boolean>(false);
  const [details, setDetails] = useState<number>();
  const [sortData, setSortData] = useState<string>("");
  const [pageNumber, setPageNumber] = useState(1);
  const [filterData, setFilterData] = useState<FilterSchema>({
    pret: { min: undefined, max: undefined },
    greutate: { min: undefined, max: undefined },
    material: { aur: false, argint: false },
    model: model.reduce((acc: any, cur: any) => ({ ...acc, [cur]: false }), {}),
    marime: marime.reduce(
      (acc: any, cur: any) => ({ ...acc, [cur]: false }),
      {}
    ),
  });

  useEffect(() => {
    // handleRefresh(pageNumber, false);
    console.log(filterData);
  }, [filterData, sortData]);

  useEffect(() => {
    handleRefresh(pageNumber, true);
  }, [pageNumber]);

  useEffect(() => {
    if (nextReq) {
      const newPageNumber = pageNumber + 1;
      console.log(newPageNumber);
      setPageNumber(newPageNumber);
      setNextReq(false);
    }
  }, [nextReq]);

  async function handleRefresh(pageNumber: number, range: boolean) {
    try {
      const data: ItemData[] = await reqSupabase({
        articol: articol,
        filterData,
        sortData,
        pageNumber,
        range,
      });
      if (range) {
        setTableData((prevItems) => [...prevItems, ...data]);
      } else {
        setTableData(data);
      }
    } catch (error) {}
  }

  function handleDetails(index: number) {
    setExpandDetails(!expandDetails);
    setDetails(index);
  }

  function handleSort(sortBy: string) {
    setSortData(sortBy);
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
            tableData={tableData}
            handleDetails={handleDetails}
            setNextReq={setNextReq}
          />
        </div>
      </div>
    </div>
  );
}
