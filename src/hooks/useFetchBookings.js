import { useEffect } from "react";

const useFetchBookings = (setBookings, setIsLoading) => {
  const url = "https://hotel-booking-backend-eight.vercel.app/api/booking";
  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      setBookings(data);
      console.log(data, "bookings");
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchBookings();
  }, []);
};

export default useFetchBookings;
