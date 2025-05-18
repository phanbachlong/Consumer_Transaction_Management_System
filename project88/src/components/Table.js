import React from "react";

const Table = ({ initialValues, content }) => {


    return (
        <table className="w-full border-collapse border border-gray-300" initialValues={initialValues} content={content}>
            <thead>
                <tr className="bg-gray-100">

                    {Object.keys(initialValues).map((field, index) => (
                        <th className="border border-gray-300 px-4 py-2" key={index}>{field}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {content.map((row, index) => (
                    <tr key={index} className="text-center">
                        {Object.values(row).map((value, i) => (
                            <td key={i} className="border border-gray-300 px-4 py-2">{value}</td>
                        ))}

                    </tr>
                ))}
            </tbody>
        </table>
    )
}
export default Table;