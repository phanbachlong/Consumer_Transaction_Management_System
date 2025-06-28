import React, { useEffect } from "react";


function Test() {

    const [isActive, setIsActive] = React.useState(false);

    const handleToggle = () => {
        setIsActive(!isActive);
    }

    useEffect(() => {

    }, [isActive])

    return (
        <label class="inline-flex items-center me-5 cursor-pointer">
            <input type="checkbox" value="" class="sr-only peer" onChange={handleToggle} />
            <div class="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-white-900 peer-focus:ring-4 peer-focus:ring-orange-300 dark:peer-focus:ring-orange-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-500 dark:peer-checked:bg-orange-500"></div>
        </label>
    );


}
export default Test;
