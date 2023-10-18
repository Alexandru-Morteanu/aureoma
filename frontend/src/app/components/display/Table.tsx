"use client";
import React, { useEffect, useRef, useState } from "react";
import { ItemData } from "../../../../constants";
import { supabase } from "@/app/components/supabase";

type TableProps = {
  tableData: ItemData[];
  handleDetails: (index: number) => void;
  setNextReq: Function;
};

function Table({ tableData, handleDetails, setNextReq }: TableProps) {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const lastItemRef: any = useRef();
  const basicItem: any = useRef();

  useEffect(() => {
    getImageUrl();
  }, [tableData]);

  const [hasIntersected, setHasIntersected] = useState(false);
  const handleObserver = (entities: any) => {
    const target = entities[0];
    if (target.isIntersecting && !hasIntersected) {
      setNextReq(true);
      setTimeout(() => {
        setHasIntersected(false);
      }, 1000);
      setHasIntersected(true);
    }
  };
  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "0px",
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
  }, [handleObserver]);

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

        return (
          <button
            ref={itemRef}
            onClick={() => handleDetails(index)}
            key={index}
            className={`flex items-center flex-col rounded-2xl ${
              isLastItem ? "bg-red-300" : "bg-yellow-300"
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
        );
      })}
    </div>
  );
}

export default Table;
/*
TO DO
  Modele ---
    Add ---
    Edit ---
  Items +++
  Lazy Scroll !!! +++ FIX 3 EXTRA
*/
