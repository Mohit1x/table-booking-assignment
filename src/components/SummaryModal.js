import { useEffect } from "react";
import { CheckCircle, X } from "lucide-react";
import { useRouter } from "next/navigation";

const SummaryModal = ({ isOpen, onClose, bookingDetails }) => {
  const router = useRouter();

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg bg-white rounded-xl shadow-lg p-6 m-4 animate-in fade-in zoom-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex justify-center mb-6">
          <div className="bg-green-100 rounded-full p-3">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
          Booking Confirmed!
        </h2>

        <div className="bg-gray-50 rounded-lg p-6 mb-6 space-y-4">
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Date & Time</p>
            <div className="flex items-center gap-2">
              <p className="text-gray-900">{bookingDetails?.date}</p>
              <p className="text-gray-900">{bookingDetails?.time}</p>
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-sm text-gray-500">Number of Guests</p>
            <p className="text-gray-900">{bookingDetails?.guests} People</p>
          </div>

          <div className="space-y-1">
            <p className="text-sm text-gray-500">Name</p>
            <p className="text-gray-900">{bookingDetails?.name}</p>
          </div>
        </div>
        <button
          onClick={() => {
            router.push("/timeline");
          }}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-colors"
        >
          Track Booking
        </button>
      </div>
    </div>
  );
};

export default SummaryModal;
