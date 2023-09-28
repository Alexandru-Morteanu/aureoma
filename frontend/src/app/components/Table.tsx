"use client";
import React, { useEffect, useState } from "react";
import { ItemData } from "../../../constants";
import { supabase } from "@/app/components/supabase";
import Image from "next/image";

type TableProps = {
  tableData: ItemData[];
  handleDetails: (index: number) => void;
  sort: string;
  filter: boolean;
  pretRange: { min: number | undefined; max: number | undefined };
  originalIndices: number[];
  setOriginalIndices: Function;
};

function Table({
  tableData,
  handleDetails,
  sort,
  filter,
  pretRange,
  originalIndices,
  setOriginalIndices,
}: TableProps) {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [newImageUrls, setNewImageUrls] = useState<string[]>([]);
  const [sortedData, setSortedData] = useState<ItemData[]>(tableData);

  useEffect(() => {
    if (tableData.length > 0) {
      const indices = Array.from(tableData.keys());
      switch (sort) {
        case "PretCresc":
          indices.sort((a, b) => tableData[a].pret - tableData[b].pret);
          break;
        case "PretDesc":
          indices.sort((a, b) => tableData[b].pret - tableData[a].pret);
          break;
        case "GreutateCresc":
          indices.sort((a, b) => tableData[a].greutate - tableData[b].greutate);
          break;
        case "GreutateDesc":
          indices.sort((a, b) => tableData[b].greutate - tableData[a].greutate);
          break;
        case "MarimeCresc":
          indices.sort((a, b) => tableData[a].marime - tableData[b].marime);
          break;
        case "MarimeDesc":
          indices.sort((a, b) => tableData[b].marime - tableData[a].marime);
          break;
        default:
          indices.sort((a, b) => {
            const itemA = tableData[a].articol.toLowerCase();
            const itemB = tableData[b].articol.toLowerCase();
            if (itemA < itemB) {
              return -1;
            }
            if (itemA > itemB) {
              return 1;
            }
            return 0;
          });
          break;
      }

      const sortedFilteredData = indices
        .filter((index) => {
          const item = tableData[index];
          if (
            pretRange &&
            item.pret >= (pretRange.min !== undefined ? pretRange.min : 0) &&
            item.pret <=
              (pretRange.max !== undefined
                ? pretRange.max
                : Number.MAX_SAFE_INTEGER)
          ) {
            return true;
          }
          if (!pretRange) {
            return true;
          }
          return false;
        })
        .map((index) => tableData[index]);

      setSortedData([...sortedFilteredData]);
      setOriginalIndices([...indices]);
    }
  }, [sort, filter, pretRange, tableData]);

  useEffect(() => {
    getImageUrl();
  }, [tableData]);

  useEffect(() => {
    if (imageUrls.length > 0) {
      const sortedImageUrls = originalIndices.map((index) => {
        return imageUrls[index];
      });
      setNewImageUrls([...sortedImageUrls]);
    }
  }, [originalIndices, imageUrls]);

  async function getImageUrl() {
    const urls = [];
    for (const row of tableData) {
      const { data, error } = await supabase.storage
        .from("Images")
        .download(row.imageUrl);
      if (error) {
        console.error("Error downloading image:", error.message);
        urls.push("");
      } else {
        const imageBlob = new Blob([data]);
        const imageUrl = URL.createObjectURL(imageBlob);
        urls.push(imageUrl);
      }
    }
    setImageUrls(urls);
  }

  return (
    <div
      style={{
        width: "100%",
      }}
      className=" p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-scroll w-5/6 sm:w-3/4 md:w-2/3 xl:w-1/2 mx-auto"
    >
      {" "}
      {sortedData?.map((row, index) => {
        return (
          <button
            onClick={() => handleDetails(index)}
            key={index}
            className=" bg-slate-200 bg-opacity-60 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
            style={{ width: "100%", height: "100%" }}
          >
            <div className="mt-2">
              <div
                className="w-full h-32 md:h-48 lg:h-56 xl:h-64 overflow-hidden"
                style={{ height: 150 }}
              >
                <img
                  src={
                    newImageUrls[index] ? newImageUrls[index] : imageUrls[index]
                  }
                  alt={row.articol}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
            <div className="mt-2 font-bold text-xl">{row.denumire}</div>
            <div className="text-lg">{row.descriere}</div>
            <div className="text-lg">{row.greutate} g</div>
            <div className="text-lg font-bold">{row.pret} MDL</div>
          </button>
        );
      })}
    </div>
  );
}

export default Table;
