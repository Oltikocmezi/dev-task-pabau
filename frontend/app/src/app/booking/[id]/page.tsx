"use client";

import React from "react";

type BookingDetails = {
  doctor_name: string;
  service: string;
  start_time: string;
  end_time: string;
  date: string;
};

async function getBooking(id: string): Promise<BookingDetails> {
  const res = await fetch(
    `http://host.docker.internal:5000/api/bookings/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch booking data");
  }

  return res.json();
}

const BookingPage: React.FC<{ params: { id: string } }> = async ({
  params,
}) => {
  const booking = await getBooking(params.id);

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center ">
      <h1 className="text-2xl border-l border-red-600 pl-3">
        Booking Details:
      </h1>
      <p className="mt-12 border border-gray-700 rounded-xl w-64 h-fit px-4 py-6 hover:border-gray-500 transition duration-500">
        This Booking is with {booking.doctor_name} for {booking.service} and it
        ends on {booking.end_time}
      </p>
      <a
        className="mt-6 border border-red-600 rounded-xl bg-transparent hover:bg-red-600 duration-500 px-3 py-3"
        href="/"
      >
        Back Home
      </a>
    </div>
  );
};

export default BookingPage;
