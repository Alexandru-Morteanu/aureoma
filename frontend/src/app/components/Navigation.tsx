"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import logo from "../favicon.ico";
import Link from "next/link";
const Navigation: React.FC = () => {
  const [isLarge, setIsLarge] = useState(true);
  const [open, setOpen] = useState(false);
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
  return (
    <nav>
      <div
        className={` z-10 font-bold text-xl w-full text-center fixed top-0 left-0 flex items-center justify-center`}
        style={{
          letterSpacing: "-0.45px",
          zIndex: 100,
        }}
      >
        <div className=" nav px-5">
          <div className={`w-100 px-100 flex items-center justify-between`}>
            {isLarge ? (
              <>
                <Image
                  alt="Logo"
                  src={logo}
                  className="mx-2 my-3"
                  style={{
                    width: 100,
                  }}
                />
                <div className="large-nav">
                  <Link
                    href="/"
                    className="hover:text-purple-600 mx-2 cursor-pointer"
                  >
                    Acasă
                  </Link>
                  <Link
                    href="/magazin"
                    className="hover:text-purple-600 mx-2 cursor-pointer"
                  >
                    Magazin
                  </Link>
                  <Link
                    href="/contacte"
                    className="hover:text-purple-600 mx-2 cursor-pointer"
                  >
                    Contacte
                  </Link>
                </div>
              </>
            ) : (
              <>
                <div
                  className={`flex flex-col ${
                    open ? "justify-center" : "justify-between"
                  } items-center cursor-pointer`}
                  style={{
                    width: 50,
                    height: 30,
                    zIndex: 110,
                  }}
                  onClick={() => {
                    setOpen(!open);
                  }}
                >
                  {!open ? (
                    <>
                      <div
                        className="bg bg-black opacity-80"
                        style={{
                          width: 50,
                          height: 7,
                          borderRadius: 20,
                        }}
                      ></div>
                      <div
                        className="bg-black opacity-80"
                        style={{
                          width: 50,
                          height: 7,
                          borderRadius: 20,
                        }}
                      ></div>
                      <div
                        className="bg-black opacity-80"
                        style={{
                          width: 50,
                          height: 7,
                          borderRadius: 20,
                        }}
                      ></div>
                    </>
                  ) : (
                    <>
                      <div
                        className="bg bg-black opacity-80"
                        style={{
                          width: 40,
                          height: 7,
                          transform: "rotate(45deg)",
                          position: "absolute",
                          borderRadius: 20,
                        }}
                      ></div>
                      <div
                        className="bg-black opacity-80"
                        style={{
                          width: 40,
                          height: 7,
                          transform: "rotate(-45deg)",
                          position: "absolute",
                          borderRadius: 20,
                        }}
                      ></div>
                    </>
                  )}
                </div>
                <Image
                  alt="Logo"
                  src={logo}
                  className="mx-2 my-3"
                  style={{
                    width: 120,
                  }}
                />
                <div
                  style={{
                    width: 50,
                    height: 30,
                  }}
                ></div>
              </>
            )}
          </div>
        </div>
      </div>
      {!isLarge && open && (
        <div className="mobile-menu font-bold text-2xl">
          <Link href="/" className="hover:text-green-500 my-1 cursor-pointer">
            Home
          </Link>
          <Link
            href="/about-us"
            className="hover:text-green-500 my-1 cursor-pointer"
          >
            About us
          </Link>
          <Link
            href="/articles"
            className="hover:text-green-500 my-1 cursor-pointer"
          >
            Articles
          </Link>
          <Link
            href="/contact"
            className="hover:text-green-500 my-1 cursor-pointer"
          >
            Contact
          </Link>
          <Link
            href="/terms"
            className="hover:text-green-500 my-1 cursor-pointer"
          >
            Terms
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
