import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoCalendarNumberOutline } from "react-icons/io5";

interface ICustomDate {
  onDateChange?: Function;
  icon?: string;
  width?: string;
  initialDate?: Date; 
}

const CustomDatePicker: React.FC<ICustomDate> = ({
  onDateChange,
  icon,
  width,
  initialDate = new Date(), 
}) => {
  const [date, setDate] = useState(initialDate);

  const handleChange = (val: Date) => {
    setDate(val);
    onDateChange?.(val);
  };

  return (
    <div className={`w-full max-w-[15rem] p-2 flex items-center gap-x-1 bg-white resize-none border border-gray-400  rounded focus-within:outline-none focus-within:border-blue-500 focus-within:ring focus-within:ring-blue-200 ${width ? width : ''}`}>
      {icon ? (
        <img src={icon} alt="" className="h-5 w-5" />
      ) : (
        <IoCalendarNumberOutline color="#7D7D7D" className="cal h-5 w-5" />
      )}
      <DatePicker
        className="outline-none"
        selected={date}
        onChange={(val: Date) => handleChange(val)}
        placeholderText={new Date().toDateString()}
        dropdownMode="select"
        dateFormat="dd MMM yyyy"
        minDate={new Date()}
      />
    </div>
  );
};

export default CustomDatePicker;
