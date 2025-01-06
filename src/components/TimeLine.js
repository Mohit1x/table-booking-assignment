"use client";

import { useState } from "react";
import {
  Clock,
  Users,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import useFetchBookings from "@/hooks/useFetchBookings";

const TimeLine = () => {
  // Initialize with start of day in local timezone
  const [selectedDate, setSelectedDate] = useState(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  });
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useFetchBookings(setBookings, setIsLoading);

  const generateTimeSlots = () => {
    const slots = [];
    const start = new Date(selectedDate);
    start.setHours(10, 0, 0);
    const end = new Date(selectedDate);
    end.setHours(20, 0, 0);

    while (start <= end) {
      slots.push(
        start.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
      start.setMinutes(start.getMinutes() + 30);
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const formatDateToLocaleDateString = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleBooking = (time) => {
    // Use local date string format
    const formattedDate = formatDateToLocaleDateString(selectedDate);
    router.push(`/booking-form/?time=${time}&date=${formattedDate}`);
  };

  const groupedBookings = bookings.reduce((acc, booking) => {
    // Handle dates in local timezone
    const bookingDate = new Date(booking.date);
    const dateKey = formatDateToLocaleDateString(bookingDate);

    if (!acc[dateKey]) {
      acc[dateKey] = {};
    }
    acc[dateKey][booking.time] = booking;
    return acc;
  }, {});

  const changeDate = (days) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + days);
    newDate.setHours(0, 0, 0, 0);
    setSelectedDate(newDate);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const isToday = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date.getTime() === today.getTime();
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Time Slots</h2>
            <div className="flex items-center gap-4">
              <button
                onClick={() => changeDate(-1)}
                disabled={isToday(selectedDate)}
                className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2 font-medium">
                <Calendar className="w-5 h-5" />
                <span>{formatDate(selectedDate)}</span>
              </div>
              <button
                onClick={() => changeDate(1)}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            <div className="space-y-4">
              {timeSlots.map((timeSlot, index) => {
                const currentDate = formatDateToLocaleDateString(selectedDate);
                const booking = groupedBookings[currentDate]?.[timeSlot];
                const isBooked = !!booking;

                return (
                  <div key={timeSlot} className="relative pl-8 pb-8 group">
                    {index !== timeSlots.length - 1 && (
                      <div className="absolute left-3 top-6 bottom-0 w-0.5 bg-blue-100"></div>
                    )}

                    <div
                      className={`absolute left-0 top-2 w-6 h-6 rounded-full ${
                        isBooked ? "bg-red-500" : "bg-green-500"
                      } flex items-center justify-center`}
                    >
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    </div>

                    <div
                      className={`bg-white rounded-lg shadow-sm border ${
                        isBooked ? "border-red-100" : "border-green-100"
                      } p-4 transition-all duration-200 hover:shadow-md ${
                        isBooked
                          ? "hover:border-red-200"
                          : "hover:border-green-200"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span className="font-medium text-lg text-gray-900">
                              {timeSlot}
                            </span>
                          </div>

                          {isBooked ? (
                            <div className="mt-2">
                              <h3 className="font-medium text-gray-900">
                                {booking.name}
                              </h3>
                              <div className="flex items-center gap-1 mt-1 text-gray-600">
                                <Users className="w-4 h-4" />
                                <span>{booking.guests} guests</span>
                              </div>
                            </div>
                          ) : (
                            <div className="mt-2 text-green-600 font-medium">
                              Available for booking
                            </div>
                          )}
                        </div>

                        {!isBooked && (
                          <button
                            onClick={() => handleBooking(timeSlot)}
                            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                          >
                            Book Now
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimeLine;
