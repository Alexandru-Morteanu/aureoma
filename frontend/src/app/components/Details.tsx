import React, { useEffect, useState } from "react";
import { ItemData, PRET_ARGINT, PRET_AUR } from "../../../constants";
import { supabase } from "@/app/components/supabase";
import { useBasket } from "./Basket";
type ItemDataExpand = {
  id: number;
  category: string;
  articol: string;
  model: string;
  descriere: string;
  marime: number;
  greutate: number;
  pret: number;
  imageUrl: string;
};
export const Details = ({
  data,
  index,
  closeDetails,
  saveDetails,
  handleDelete,
}: any) => {
  const [newData, setNewData] = useState<ItemDataExpand>(data[index]);
  const { updateBasketItemCount } = useBasket();
  useEffect(() => {
    console.log(newData);
  }, [newData]);
  const handleContentChange = (key: string, value: string) => {
    setNewData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  async function handleStoreEdit() {
    try {
      if (isNaN(newData.greutate) || isNaN(newData.marime)) {
        alert("detalii gresite");
        return;
      }
      const { data, error } = await supabase
        .from("item")
        .update({
          model: newData.model,
          descriere: newData.descriere,
          marime: newData.marime,
          greutate: newData.greutate,
          pret: newData.pret,
          imageurl: newData.imageUrl,
        })
        .eq("id", newData.id);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="fixed top-0 left-0 flex justify-center items-center w-full min-h-screen bg-black bg-opacity-80 z-10">
      <div className="bg-black w-4/5 sm:w-2/3 md:w-1/2 lg:w-2/5 xl:w-1/3 p-6 rounded-lg shadow-lg text-white relative">
        <button
          className="absolute top-2 right-2 bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600 transition duration-300"
          onClick={closeDetails}
        >
          X
        </button>
        <div className="text-red-500 text-center text-xl font-bold">
          ({newData?.id})
        </div>
        <div className="text-xl font-semibold text-center">
          {newData?.category}
        </div>
        <div className="text-lg font-medium text-center mb-4">
          {newData?.articol}
        </div>
        <div className="mb-4">
          <b className="text-gray-400">Model:</b>
          <Editable
            onChange={(value) => handleContentChange("denumire", value)}
            item={newData?.model}
          />
        </div>
        <div className="mb-4">
          <b className="text-gray-400">Descriere:</b>
          <Editable
            onChange={(value) => handleContentChange("descriere", value)}
            item={newData?.descriere}
          />
        </div>
        <div className="mb-4 flex items-center">
          <b className="text-gray-400">Marime:</b>
          <Editable
            onChange={(value) => handleContentChange("marime", value)}
            item={newData?.marime}
          />
          <span className="ml-2">cm</span>
        </div>
        <div className="mb-4 flex items-center">
          <b className="text-gray-400">Greutate:</b>
          <Editable
            onChange={(value: any) => {
              handleContentChange("greutate", value);
              setNewData((prevData) => {
                const pret = parseFloat(
                  (
                    (newData?.category === "Aur" ? PRET_AUR : PRET_ARGINT) *
                    value
                  ).toFixed(2)
                );
                return {
                  ...prevData,
                  pret: pret,
                };
              });
            }}
            item={newData?.greutate}
          />
          <span className="ml-2">g</span>
        </div>
        <div className="text-lg font-medium text-center mb-4">
          Pret: {newData?.pret.toLocaleString()}MDL
        </div>
        <div className="text-center">
          <button
            className="bg-green-400 text-black py-2 px-4 rounded-full hover:bg-green-500 transition duration-300"
            onClick={() => {
              handleStoreEdit();
              saveDetails(newData, data[index]);
            }}
          >
            Save
          </button>
          <button
            className="bg-red-500 text-white py-2 px-4 rounded-full ml-4 hover:bg-red-600 transition duration-300"
            onClick={() => {
              closeDetails();
              handleDelete(newData.id, newData.imageUrl);
            }}
          >
            Delete
          </button>
          <button
            className="bg-red-500 text-white py-2 px-4 rounded-full ml-4 hover:bg-red-600 transition duration-300"
            onClick={() => {
              closeDetails();
              updateBasketItemCount((prevCount: number) => prevCount + 1);
            }}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};
function Editable({
  item,
  onChange,
}: {
  item: any;
  onChange: (value: string) => void;
}) {
  const handleContentChange = (e: React.ChangeEvent<HTMLDivElement>) => {
    onChange(e.currentTarget.textContent || "");
    console.log(item);
  };
  return (
    <div
      contentEditable={true}
      style={{
        border: "2px solid #333",
        paddingInline: "10px",
        paddingBlock: "5px",
        borderRadius: "10px",
      }}
      onBlur={handleContentChange}
      dangerouslySetInnerHTML={{ __html: item }}
    ></div>
  );
}
