// import Table from "../components/Table";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Test = () => {
    const [selectedDate, setSelectedDate] = useState(null);

    return (
        <div className="w-64 mx-auto mt-8">
            <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="dd/MM/yyyy"
                placeholderText="Chọn ngày"
                className="border border-gray-300 rounded px-3 py-2 w-full"
                calendarClassName="!p-2 bg-white border border-gray-200 rounded-lg shadow-md"
                dayClassName={(date) =>
                    "text-gray-700 hover:bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center"
                }
            />
        </div>
    );
}
export default Test;