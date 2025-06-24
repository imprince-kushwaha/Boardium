import React, { useState } from "react";
import { Calendar } from "primereact/calendar";

const MainPage = () => {
  const [date, setDate] = useState(null);

  return (
    <>
      <div>Welcome John Porter 👋</div>

      <Calendar
        value={date}
        onChange={(e) => setDate(e.value)}
        inline
        showWeek
      />
    </>
  );
};

export default MainPage;
