"use client";
import React, { useEffect, useRef, useState } from "react";
import { ItemData } from "../../../../constants";
import { supabase } from "@/app/components/supabase";

type TableProps = {
  tableData: ItemData[];
  handleDetails: (index: number) => void;
  setNextReq: Function;
  sorted: string;
  filterTrigger: boolean;
};

function Table({
  tableData,
  handleDetails,
  setNextReq,
  sorted,
  filterTrigger,
}: TableProps) {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [hasIntersected, setHasIntersected] = useState(false);
  const [loaded, setLoaded] = useState(Array(tableData.length).fill(false));
  const lastItemRef: any = useRef();
  const basicItem: any = useRef();

  useEffect(() => {
    getImageUrl();
  }, [tableData]);

  useEffect(() => {
    setLoaded(Array(tableData.length).fill(false));
  }, [sorted, filterTrigger]);

  const handleObserver = (entities: any) => {
    const target = entities[0];
    if (
      target.isIntersecting &&
      !hasIntersected &&
      loaded.reduce((count, value) => count + (value === true ? 1 : 0), 0) ===
        tableData.length
    ) {
      setNextReq(true);
      setTimeout(() => {
        setHasIntersected(false);
      }, 500);
      setHasIntersected(true);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "400px",
      threshold: 1.0,
    });
    if (lastItemRef.current) {
      observer.observe(lastItemRef.current);
    }

    return () => {
      if (lastItemRef.current) {
        observer.unobserve(lastItemRef.current);
        observer.disconnect();
      }
    };
  }, [handleObserver, tableData]);

  async function getImageUrl() {
    const urls = [];
    for (const row of tableData) {
      const { data, error } = await supabase.storage
        .from("Images")
        .download(row.imageurl);
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

  useEffect(() => {
    // if (
    //   loaded.reduce((count, value) => count + (value === true ? 1 : 0), 0) ===
    //   tableData.length
    // ) {
    //   console.log("loaded");
    // }
    // console.log(
    //   loaded.reduce((count, value) => count + (value === true ? 1 : 0), 0)
    // );
  }, [loaded]);

  return (
    <div
      style={{
        width: "100%",
      }}
      className=" p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-scroll w-5/6 sm:w-3/4 md:w-2/3 xl:w-1/2"
    >
      {tableData?.map((row, index) => {
        const isLastItem = index === tableData.length - 1;
        const itemRef = isLastItem ? lastItemRef : basicItem;
        if (imageUrls[index]) {
          if (!loaded[index]) {
            let newLoaded = [...loaded];
            newLoaded[index] = true;
            setLoaded(newLoaded);
          }
        }
        return (
          <div key={index}>
            {imageUrls[index] ? (
              <button
                ref={itemRef}
                onClick={() => handleDetails(index)}
                key={index}
                className={`flex items-center flex-col rounded-2xl ${
                  isLastItem ? "bg-white" : "bg-yellow-300"
                } bg-opacity-60 shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105`}
                style={{ width: "100%", height: "100%" }}
              >
                <div className="" style={{ height: 150 }}>
                  <img
                    src={imageUrls[index]}
                    alt={row.articol}
                    className="w-full h-full object-cover"
                    style={{
                      borderTopLeftRadius: "15px",
                      borderTopRightRadius: "15px",
                    }}
                  />
                </div>
                <div className="mt-2 font-bold text-xl">{row.model}</div>
                <div className="mb-2 text-sm font-bold">
                  {row.pret.toLocaleString()} MDL
                </div>
              </button>
            ) : (
              <div
                role="status"
                className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center"
              >
                <div
                  className={`flex items-center flex-col rounded-2xl bg-black bg-opacity-60 shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105`}
                  style={{ width: "100%", height: "100%" }}
                >
                  <svg
                    className="w-10 h-10 m-9 text-gray-200 dark:text-gray-600"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 18"
                  >
                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                  </svg>
                  <div
                    className="animate-pulse"
                    style={{ height: 80, borderRadius: "15px", width: "100%" }}
                  ></div>
                  <div className="w-3/5 h-1/6 bg-gray-700 mb-2"></div>
                  <div className="w-3/5 h-1/6 bg-gray-700 mb-5"></div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Table;
