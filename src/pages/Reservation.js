import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const Reservation = () => {
    const [startDate, setStartDate] = useState(new Date());
    return (
      <DatePicker 
        minDate={new Date()}
        selected={startDate}
        showYearDropdown
        scrollableMonthYearDropdown 
        onChange={(date) => setStartDate(date)}
         />
    );
};

export default Reservation;