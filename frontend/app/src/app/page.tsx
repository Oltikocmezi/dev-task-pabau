import React from "react";

type Booking = {
  id: number;
  date: string;
  start_time: string;
};

async function getBookings() {
  const res = await fetch("http://host.docker.internal:5000/api/bookings", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const Home: React.FC = async () => {
  const bookings = await getBookings();

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <h1 className="text-2xl border-l border-red-600 pl-3">
        Current booking by count: {bookings.length}
      </h1>
      <ul className="w-full px-16 flex flex-wrap justify-center items-center">
        {bookings.map((booking) => (
          <li
            className="mt-12 ml-8 border border-gray-700 rounded-xl w-64 h-fit px-4 py-6 hover:border-gray-500 transition duration-500"
            key={booking.id}
          >
            <a href={`/booking/${booking.id}`}>
              A Booking on {booking.date} starting at {booking.start_time}
            </a>
          </li>
        ))}
      </ul>
      <a
        className="mt-6 border border-red-600 rounded-xl bg-transparent hover:bg-red-600 duration-500 px-3 py-4"
        href="/create-booking"
      >
        Create a New Booking
      </a>
    </div>
  );
};

export default Home;
