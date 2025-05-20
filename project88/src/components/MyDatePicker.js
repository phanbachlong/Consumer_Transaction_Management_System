import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { parseISO, formatISO } from 'date-fns';


const MyDatePicker = ({ value, onChange }) => {

    return (
        <div >
            <DatePicker
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                selected={value ? parseISO(value) : null}
                onChange={(date) => {
                    onChange(date.toISOString().split("T")[0]); // 👈 yyyy-MM-dd
                }}
                dateFormat="dd-MM-yyyy"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                placeholderText="Chọn ngày"
                maxDate={new Date()}
            />
        </div>

    )
}

export default MyDatePicker;