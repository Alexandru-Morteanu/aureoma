"use client";
import React, { useEffect, useState } from "react";
import Filter from "./display/Filter";
import Sort from "./display/Sort";
import Table from "./display/Table";
import { FilterSchema, ItemData, MARIME, MODEL } from "../../../constants";
import reqSupabase from "./reqFunction";
import { Data } from "../admin/dashboard/page";

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
  const [filterTrigger, setFilterTrigger] = useState<boolean>(false);
  const [stopLoading, setStopLoading] = useState<boolean>(false);
  const [numberTrigger, setNumberTrigger] = useState<boolean>(false);
  const [go, setGO] = useState<boolean>(false);
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
    if (pageNumber === 1 && tableData.length > 0) {
      setNumberTrigger(!numberTrigger);
    }
    setTimeout(() => {
      setGO(true);
    }, 500);
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
        articol: articol,
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
        <Filter
          filterTrigger={filterTrigger}
          setFilterTrigger={setFilterTrigger}
          filterData={filterData}
          setFilterData={setFilterData}
        />
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
            filterTrigger={filterTrigger}
            sorted={sortData}
            tableData={tableData}
            handleDetails={handleDetails}
            setNextReq={setNextReq}
          />
        </div>
      </div>
    </div>
  );
}
