import Header from "@/components/Header";
import TimeLine from "@/components/TimeLine";
import { Suspense } from "react";

const TimelinePage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Header />
      <TimeLine />
    </Suspense>
  );
};

export default TimelinePage;
