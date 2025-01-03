import Link from "next/link";

const HomePage = () => {
  return (
    <div
      style={{ backgroundImage: "url(/home-bg.jpg)" }}
      className="h-full bg-no-repeat w-full bg-cover bg-center"
    >
      <div className="flex flex-col gap-8 items-center justify-center h-screen">
        <div className="flex flex-col gap-3 items-center justify-center">
          <h1 className="text-5xl text-white font-bold">Book in Seconds</h1>
          <p className="text-gray-200 text-md font-medium">
            Simple. Fast. Hassle-free reservations
          </p>
        </div>
        <Link href="/booking-form">
          <button className="text-blue-500 text-lg font-medium py-3 px-6 w-fit bg-white rounded-full transition duration-300 hover:scale-[1.1]">
            Make a Reservation
          </button>
        </Link>
        <div className="flex items-center justify-center gap-4 text-md font-medium text-gray-300">
          <p>⚪ Instant Confirmation</p>
          <p>⚪ 24/7 Availability</p>
          <p>⚪ No Booking Fees</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
