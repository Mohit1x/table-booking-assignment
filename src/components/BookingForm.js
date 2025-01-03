"use client";

import { useMemo, useState } from "react";
import SummaryModal from "./SummaryModal";
import Header from "./Header";
import { useSearchParams } from "next/navigation";
import useFetchBookings from "@/hooks/useFetchBookings";
import { times } from "@/lib/utils";

const BookingForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const searchParam = useSearchParams();

  const selectedTime = searchParam.get("time");
  const selectedDate = searchParam.get("date");

  useFetchBookings(setBookings, setIsLoading);

  const userSelectedDate = useMemo(() => {
    if (selectedDate) {
      const date = new Date(selectedDate);

      const year = date.getUTCFullYear();
      const month = String(date.getUTCMonth() + 1).padStart(2, "0");
      const day = String(date.getUTCDate()).padStart(2, "0");

      return `${year}-${month}-${day}`;
    } else {
      return "";
    }
  }, [selectedDate]);

  console.log(userSelectedDate, "userdate");

  const [info, setInfo] = useState({
    date: userSelectedDate,
    time: selectedTime || "",
    guests: "",
    name: "",
    email: "",
    number: "",
  });

  const [message, setMessage] = useState("");

  const groupedBookings = bookings.reduce((acc, booking) => {
    if (!acc[booking.date]) {
      acc[booking.date] = {};
    }
    acc[booking.date][booking.time] = booking;
    return acc;
  }, {});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const booking = groupedBookings[info.date]?.[info.time];
    const isBooked = !!booking;

    if (isBooked) {
      setMessage(
        "Booking already exist for this date & time! Please choose another date and try again."
      );
      return;
    }

    const areFieldsFilled = Object.values(info).every(
      (value) => value.trim() !== ""
    );

    if (!areFieldsFilled) {
      setMessage("please fill the field properly");
      return;
    }

    try {
      const response = await fetch(
        "https://hotel-booking-backend-eight.vercel.app/api/booking",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Specifies the data type as JSON
          },
          body: JSON.stringify(info),
        }
      );
    } catch (error) {
      console.log(error);
    }

    setShowModal(true);
    setMessage("");
    console.log("form submitted with data", info);

    setIsOpen(true);
  };

  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="grid grid-col gap-4 bg-white p-6 rounded shadow-2xl"
        >
          <h1 className="text-2xl font-bold">Make a Reservation</h1>
          <div className="flex flex-row gap-2">
            <div className="py-3 px-6 bg-blue-100 rounded flex-1">
              <label className="text-gray-600">Date</label>
              <input
                value={info.date}
                onChange={(e) =>
                  setInfo((prevInfo) => ({ ...prevInfo, date: e.target.value }))
                }
                type="date"
                placeholder="Select Date"
                className="w-full mt-2 p-2 rounded bg-blue-100 placeholder:text-black focus:outline-none"
              />
            </div>
            <div className="py-3 px-6 bg-blue-100 rounded flex-1">
              <label className="text-gray-600">Time</label>
              <select
                value={info.time}
                onChange={(e) =>
                  setInfo((prevInfo) => ({ ...prevInfo, time: e.target.value }))
                }
                className="w-full mt-2 p-2 rounded bg-blue-100 focus:outline-none"
              >
                <option value={""}>select a time</option>
                {times?.map((time, index) => (
                  <option className="bg-white" key={index} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="py-3 px-6 bg-blue-100 rounded">
            <label className="text-gray-600">Number of Guests</label>
            <input
              type="number"
              value={info.guests}
              onChange={(e) =>
                setInfo((prevInfo) => ({ ...prevInfo, guests: e.target.value }))
              }
              placeholder="Enter guests"
              className="w-full mt-2 p-2 rounded bg-blue-100 placeholder:text-black focus:outline-none"
            />
          </div>
          <div className="py-3 px-6 bg-blue-100 rounded">
            <label className="text-gray-600">Full Name</label>
            <input
              onFocus={() => setMessage("")}
              type="text"
              value={info.name}
              onChange={(e) =>
                setInfo((prevInfo) => ({ ...prevInfo, name: e.target.value }))
              }
              placeholder="Enter your name"
              className="w-full mt-2 p-2 rounded bg-blue-100 placeholder:text-black focus:outline-none"
            />
          </div>
          <div className="flex flex-row gap-2">
            <div className="py-3 px-6 bg-blue-100 rounded">
              <label className="text-gray-600">Email Address</label>
              <input
                onFocus={() => setMessage("")}
                type="email"
                value={info.email}
                onChange={(e) =>
                  setInfo((prevInfo) => ({
                    ...prevInfo,
                    email: e.target.value,
                  }))
                }
                placeholder="Enter email"
                className="w-full mt-2 p-2 rounded bg-blue-100 placeholder:text-black focus:outline-none"
              />
            </div>
            <div className="py-3 px-6 bg-blue-100 rounded">
              <label className="text-gray-600">Mobile Number</label>
              <input
                onFocus={() => setMessage("")}
                type="number"
                value={info.number}
                onChange={(e) =>
                  setInfo((prevInfo) => ({
                    ...prevInfo,
                    number: e.target.value,
                  }))
                }
                placeholder="Enter Mobile Number"
                className="w-full mt-2 p-2 rounded bg-blue-100 placeholder:text-black focus:outline-none"
              />
            </div>
          </div>
          <button
            type="submit"
            className="text-white text-md font-semibold bg-blue-600 w-fit px-4 py-2 mt-4 rounded"
          >
            Confirm Reservation
          </button>
          {message.length > 4 && (
            <p className="text-red-500 font-bold">{message}</p>
          )}
        </form>
        {showModal && (
          <SummaryModal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            bookingDetails={info}
          />
        )}
      </div>
    </>
  );
};

export default BookingForm;
