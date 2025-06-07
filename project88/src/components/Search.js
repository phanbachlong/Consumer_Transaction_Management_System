import React, { useEffect, useRef, useState } from "react";

const Search = ({ onChangeSearch, isReset }) => {

    const [input, setInput] = useState("");

    const debounceTimeout = useRef(null);

    const onChangeInput = (event) => {
        const value = event.target.value;
        setInput(value);

        // Xóa timeout trước đó nếu còn tồn tại
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

        // Đặt timeout mới, 500ms sau mới gọi onChangeSearch
        debounceTimeout.current = setTimeout(() => {
            onChangeSearch(value.toLowerCase());
        }, 500)
    }

    useEffect(() => {
        if (isReset) {
            setInput("");
            onChangeSearch("");
        }
    }, [isReset]);

    return (
        <div class="w-full max-w-md ml-auto mt-8 mb-8">
            <div class="relative ">
                <input
                    onChange={onChangeInput}
                    type="text"
                    value={input}
                    placeholder="Tìm kiếm..."
                    class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" stroke-width="2"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 103.5 10.5a7.5 7.5 0 0013.15 6.15z" />
                    </svg>
                </div>
            </div>
        </div>
    );
}
export default Search;