import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const MyDatePicker = ({ value, onChange, typeDate }) => {

    const selectedDate = value ? new Date(value) : null;

    return (
        <div >
            <DatePicker
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                selected={selectedDate}
                onChange={(date) => {
                    if (date) {
                        const localDate = date.toLocaleDateString('en-CA'); // "yyyy-MM-dd"
                        onChange(localDate);
                    } else {
                        onChange(null); // hoặc "" nếu bạn cần giá trị trống
                    }
                }}
                dateFormat="dd-MM-yyyy"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                placeholderText="Chọn ngày"
                maxDate={typeDate}
            />
        </div>

    )
}

export default MyDatePicker;