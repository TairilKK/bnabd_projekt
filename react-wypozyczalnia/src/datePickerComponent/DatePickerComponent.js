import React, { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import pl from "date-fns/locale/pl";
import "react-datepicker/dist/react-datepicker.css";

registerLocale("pl", pl);

const DatePickerComponent = () => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  return (
    <DatePicker
      locale="pl"
      selectsRange={true}
      startDate={startDate}
      endDate={endDate}
      onChange={(update) => {
        setDateRange(update);
        if (update[0] && update[1]) {
          setTimeout(() => setDateRange([null, null]), 2000);
        }
      }}
      dateFormat="eee, d MMM"
      inline
    />
  );
};

export default DatePickerComponent;
