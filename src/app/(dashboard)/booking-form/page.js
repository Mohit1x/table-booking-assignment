import { Suspense } from "react";
import BookingForm from "../../../components/BookingForm";

const BookingFormPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookingForm />
    </Suspense>
  );
};

export default BookingFormPage;
