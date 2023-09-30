"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import logo from "../../../public/shop_icon.svg";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
const Navigation: React.FC = () => {
  const nrItem = useSearchParams().get("nrItems") ?? 0;
  const [isLarge, setIsLarge] = useState(true);
  const [open, setOpen] = useState(false);
  const [nrItems, setNrItems] = useState(nrItem);

  useEffect(() => {
    setOpen(false);
  }, [isLarge]);

  useEffect(() => {
    const handleResize = () => {
      setIsLarge(window.innerWidth > 700);
    };
    handleResize();
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  useEffect(() => {
    setNrItems(nrItem);
  }, [nrItem]);
  return (
    <nav>
      <div
        className={` z-10 font-semibold text-xl w-full text-center top-0 left-0`}
        style={{
          letterSpacing: "-0.45px",
          zIndex: 100,
        }}
      >
        <div className="nav px-5 py-2 w-100 px-100">
          {isLarge ? (
            <div className="flex items-center justify-between">
              <div>
                <Link
                  href="/contacte"
                  className="hover:text-purple-600 mx-2 cursor-pointer"
                >
                  Contacte
                </Link>
                <Link
                  href="/"
                  className="hover:text-purple-600 mx-2 cursor-pointer"
                >
                  Calitate
                </Link>
                <Link
                  href="/"
                  className="hover:text-purple-600 mx-2 cursor-pointer"
                >
                  Cariera
                </Link>
              </div>
              <div className="flex gap-4">
                <div
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Image
                    className="cursor-pointer"
                    alt="shop_icons"
                    src={logo}
                  />
                  <div
                    className="absolute flex justify-center items-center rounded-full bg-red-500"
                    style={{
                      height: 18,
                      width: 18,
                      top: "22%",
                      right: -4,
                      transform: "translateY(-50%)",
                      fontSize: 15,
                    }}
                  >
                    {nrItems}
                  </div>
                </div>
                <div className="flex">
                  <button>RO</button>/<button>RU</button>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div
          className="w-100 bg-yellow-300 flex justify-center items-center"
          style={{
            height: 150,
            fontFamily: "'Pacifico', cursive",
            fontSize: 50,
            borderTop: "0.5px solid black",
            borderBottom: "0.5px solid black",
          }}
        >
          <b className="cursor-pointer">aureoma.</b>
        </div>
        {isLarge ? (
          <div
            className="flex items-center justify-center"
            style={{
              borderBottom: "0.5px solid black",
            }}
          >
            <div>
              <Link
                href="/inele"
                className="hover:text-purple-600 mx-2 cursor-pointer"
              >
                Inele
              </Link>
              <Link
                href="/cercei"
                className="hover:text-purple-600 mx-2 cursor-pointer"
              >
                Cercei
              </Link>
              <Link
                href="/lanturi"
                className="hover:text-purple-600 mx-2 cursor-pointer"
              >
                Lanturi
              </Link>
              <Link
                href="/bratari"
                className="hover:text-purple-600 mx-2 cursor-pointer"
              >
                Bratari
              </Link>
              <Link
                href="/pandantive"
                className="hover:text-purple-600 mx-2 cursor-pointer"
              >
                Pandantive
              </Link>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
