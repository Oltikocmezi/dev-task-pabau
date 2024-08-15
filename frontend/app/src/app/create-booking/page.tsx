"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const CreateBookingPage: React.FC = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    service: "",
    doctor_name: "",
    start_time: "",
    end_time: "",
    date: "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      router.push("/");
    } else {
      const errorData = await res.json();
      setError(
        errorData.message || "An error occurred while creating the booking."
      );
    }
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <h1 className="text-2xl border-l border-red-600 pl-3">
        Create a New Booking
      </h1>
      <form
        className="w-fit mt-6 px-12 h-fit py-12 border border-gray-500 flex flex-col justify-center items-start rounded-xl"
        onSubmit={handleSubmit}
      >
        <div className="flex mt-8 py-4">
          <label className=" border-l border-red-600 pl-3 py-3">Service:</label>
          <input
            className="w-64 h-fit px-12 py-3 text-white bg-transparent border border-gray-700 ml-20 rounded-xl"
            type="text"
            name="service"
            value={formData.service}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="flex mt-8 py-4">
          <label className=" border-l py-3 border-red-600 pl-3">
            Doctor Name:
          </label>
          <input
            className="w-64 h-fit px-12 py-3 text-white bg-transparent border border-gray-700 ml-10 rounded-xl"
            type="text"
            name="doctor_name"
            value={formData.doctor_name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="flex mt-8 py-4">
          <label className=" border-l py-3 border-red-600 pl-3">
            Start Time:
          </label>
          <input
            className="w-64 h-fit px-12 py-3 text-white bg-transparent border border-gray-700 ml-16 rounded-xl"
            type="time"
            name="start_time"
            value={formData.start_time}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="flex mt-8 py-4">
          <label className=" border-l py-3 border-red-600 pl-3">
            End Time:
          </label>
          <input
            className="w-64 h-fit px-12 py-3 text-white bg-transparent border border-gray-700 ml-20 rounded-xl"
            type="time"
            name="end_time"
            value={formData.end_time}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="flex mt-8 py-4">
          <label className=" border-l py-3 border-red-600 pl-3">Date:</label>
          <input
            className="w-64 h-fit px-12 py-3 text-white bg-transparent border border-gray-700 ml-28 rounded-xl"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="w-full flex justify-center items-center">
          <button
            className="mt-6 border border-red-600 rounded-xl bg-transparent hover:bg-red-600 duration-500 px-3 py-4"
            type="submit"
          >
            Create Booking
          </button>
        </div>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <a
        className="mt-6 border border-red-600 rounded-xl bg-transparent hover:bg-red-600 duration-500 px-3 py-4"
        href="/"
      >
        Back Home
      </a>
    </div>
  );
};

export default CreateBookingPage;
