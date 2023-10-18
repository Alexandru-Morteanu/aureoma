"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import {
  ItemData,
  MARIME,
  MODEL,
  PRET_ARGINT,
  PRET_AUR,
} from "../../../../../constants";
import { supabase } from "@/app/components/supabase";

export default function Add({}) {
  const category = useSearchParams().get("category") ?? "";
  const item = useSearchParams().get("item") ?? "";
  const { push } = useRouter();
  const [marimeOptions, setMarimeOptions] = useState<number[]>([]);
  const [modelOptions, setModelOptions] = useState<string[]>([]);
  const [expandMarime, setExpandMarime] = useState<boolean>(false);
  const [expandModel, setExpandModel] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileRef = useRef(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [itemData, setItemData] = useState<ItemData>({
    category: category,
    articol: item,
    model: "",
    descriere: "",
    marime: 0,
    greutate: 0,
    imageurl: "",
  });

  useEffect(() => {
    switch (item) {
      case "Inel":
        setMarimeOptions(MARIME.Inel);
        setModelOptions(MODEL.Inel);
        break;
      case "Lant":
        setMarimeOptions(MARIME.Lant);
        setModelOptions(MODEL.Lant);
        break;
      case "Bratara":
        setMarimeOptions(MARIME.Bratara);
        setModelOptions(MODEL.Lant);
        break;
      case "Pandantive":
        setModelOptions(MODEL.Pandantive);
        break;
      case "Cercei":
        setModelOptions(MODEL.Cercei);
        break;
      case "":
        push("/admin/dashboard");
        break;
    }
  }, []);
  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const imageUrl: string = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
    setImage(file);
  }
  async function handleSubmitItem() {
    try {
      if (image) {
        const currentTimestamp = Date.now();
        const timestamp = new Date(currentTimestamp).toISOString();
        const formattedTimestamp = timestamp.replace(/:/g, "-");
        const fileNameWithoutExtension = image.name.replace(/\.[^/.]+$/, "");
        const storagePath = `${fileNameWithoutExtension}-${formattedTimestamp}.webp`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("Images")
          .upload(storagePath, image);

        if (uploadError) {
          console.error(
            "Error uploading image to Supabase storage:",
            uploadError
          );
          return;
        }
        const imageUrl = uploadData?.path;

        const data = {
          ...itemData,
          // pret: parseFloat(
          //   (
          //     (category === "Aur" ? PRET_AUR : PRET_ARGINT) * itemData.greutate
          //   ).toFixed(2)
          // ),
          imageUrl,
        };
        const res = await supabase.from("item").upsert([data]);
        console.log(res);
        push("/admin/dashboard");
      }
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div className="flex flex-col gap-2 items-center my-4">
      <div className="text-2xl font-bold">{category}</div>
      <div className="text-lg">{item}</div>
      <form className="flex flex-col gap-2 items-center my-4">
        <input
          className="border-2 border-gray-400 rounded-lg px-2 py-1"
          type="text"
          placeholder="Denumire"
          value={itemData.model}
          required={true}
          onChange={(e) => setItemData({ ...itemData, model: e.target.value })}
        />
        <textarea
          className="border-2 border-gray-400 rounded-lg px-2 py-1"
          style={{
            width: 400,
            height: 100,
          }}
          placeholder="Descriere"
          value={itemData.descriere}
          required={true}
          onChange={(e) =>
            setItemData({ ...itemData, descriere: e.target.value })
          }
        />
        <div
          ref={fileRef}
          style={{
            width: 100,
            height: 100,
            backgroundColor: "rgb(200,200,200)",
            borderRadius: 20,
            fontSize: 30,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundImage: imagePreview ? `url(${imagePreview})` : "none",
          }}
          className="flex justify-center items-center cursor-pointer"
          onClick={() => {
            fileInputRef.current?.click();
          }}
        >
          <div>+</div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/webp"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>
        <div className="flex gap-2">
          {marimeOptions.length > 0 && (
            <button
              type="button"
              className="border-2 border-gray-400 rounded-lg px-2 py-1"
              onClick={() => {
                setExpandMarime(!expandMarime);
              }}
            >
              Marime {"->"} {itemData.marime}
            </button>
          )}
          {modelOptions.length > 0 && (
            <div>
              <button
                type="button"
                className="border-2 border-gray-400 rounded-lg px-2 py-1"
                onClick={() => {
                  setExpandModel(!expandModel);
                }}
              >
                Model {"->"} {itemData.model}
              </button>
            </div>
          )}
          <div className="border-2 border-gray-400 rounded-lg px-2 py-1">
            Greutate {"->"}
            <input
              type="number"
              placeholder="Greutate"
              required={true}
              value={itemData.greutate !== 0 ? itemData.greutate : ""}
              onChange={(e) =>
                setItemData({
                  ...itemData,
                  greutate: !isNaN(parseFloat(e.target.value))
                    ? parseFloat(e.target.value)
                    : 0,
                })
              }
            />
          </div>
        </div>
        <div className="flex text-white w-100">
          <div
            className="bg-black flex-col absolute flex"
            style={{ maxHeight: 200, overflow: "scroll", width: 60 }}
          >
            {expandMarime &&
              marimeOptions.map((option, index) => (
                <button
                  onClick={() => {
                    setItemData({ ...itemData, marime: option });
                    setExpandMarime(!expandMarime);
                  }}
                  className="p-3"
                  key={index}
                >
                  {option}
                </button>
              ))}
          </div>
          <div
            className="bg-black flex-col absolute flex"
            style={{ maxHeight: 200, overflow: "scroll", width: 60 }}
          >
            {expandModel &&
              modelOptions.map((option, index) => (
                <button
                  onClick={() => {
                    setItemData({ ...itemData, model: option });
                    setExpandMarime(!expandModel);
                  }}
                  className="p-3"
                  key={index}
                >
                  {option}
                </button>
              ))}
          </div>
        </div>
        <div className="mt-4 text-2xl font-bold">
          Pretul:{" "}
          {(
            (category === "Aur" ? PRET_AUR : PRET_ARGINT) * itemData.greutate
          ).toFixed(2) + "MDL"}
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="button"
          onClick={handleSubmitItem}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
