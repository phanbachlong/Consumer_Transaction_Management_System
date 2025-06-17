import React from "react";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    return (
        <div className="text-right mt-4">
            <button className={`px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-200 text-gray-400' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
            >
                First
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
                <button
                    key={index + 1}
                    className={`px-4 py-2 ${currentPage === index + 1 ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-700'} rounded hover:bg-gray-200`}
                    onClick={() => handlePageChange(index + 1)}
                >
                    {index + 1}
                </button>
            ))}

            <button className={`px-4 py-2 rounded ${currentPage === totalPages ? 'bg-gray-200 text-gray-400' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
            >
                Last
            </button>
        </div>
    );
}

export default Pagination; 