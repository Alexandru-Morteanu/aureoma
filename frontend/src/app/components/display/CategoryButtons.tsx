"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { ITEMS } from "../../../../constants";

function CategoryButtons() {
  const { push } = useRouter();

  return (
    <div className="absolute">
      <div className="flex justify-center items-center gap-3">
        <div className="bg-yellow-300">Aur</div>
        {ITEMS.map((item) => (
          <button
            onClick={() => {
              push(`/admin/dashboard/add?category=Aur&item=${item}`);
            }}
            key={item}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="flex justify-center items-center  gap-3">
        <div className="bg-gray-400">Argint</div>
        {ITEMS.map((item) => (
          <button
            onClick={() => {
              push(`/admin/dashboard/add?category=Argint&item=${item}`);
            }}
            key={item}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategoryButtons;
