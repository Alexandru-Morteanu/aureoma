"use client";
import React, { useEffect, useState } from "react";
import axiosInstance from "../components/lessCode/axios";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false); // Track whether to show the password
  const [logged, setLogged] = useState<Boolean | null>(null); // Initialize as null
  const { push } = useRouter();

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handlePasswordRevealToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await axiosInstance.post("/login", {
      password: password,
      username: username,
    });
    if (res.data) {
      push("/admin/dashboard");
      setLogged(true);
    } else {
      setLogged(false); // Set to false if login fails
    }
  };

  useEffect(() => {
    if (logged === true) {
      console.log("LOGAT");
    } else if (logged === false) {
      console.log("Login failed");
    }
  }, [logged]);

  return (
    <div className="w-full flex justify-center items-center gap-3 flex-col">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <div className="mb-4 relative">
          <label htmlFor="username" className="text-gray-600">
            Username:
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4 relative">
          <label htmlFor="password" className="text-gray-600">
            Password:
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
            <button
              type="button"
              className="absolute top-0 right-0 mt-2 mr-2"
              onClick={handlePasswordRevealToggle}
            >
              {showPassword ? (
                <span role="img" aria-label="Hide Password">
                  🙉
                </span>
              ) : (
                <span role="img" aria-label="Show Password">
                  🙈
                </span>
              )}
            </button>
          </div>
        </div>
        <button
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          type="submit"
        >
          Login
        </button>
        {logged === false && (
          <p className="text-red-500">
            Login failed. Please check your credentials.
          </p>
        )}
      </form>
    </div>
  );
}
