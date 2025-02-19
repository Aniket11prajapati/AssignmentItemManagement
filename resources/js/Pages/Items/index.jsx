import React, { useState, useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";

export default function Index() {
    const [items, setItems] = useState([]);
    const [filters, setFilters] = useState({
        title: "",
        start_date: "",
        end_date: "",
        page: 1
    });
    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 1
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const query = new URLSearchParams(filters).toString();
                const response = await fetch(`/api/items?${query}`);

                if (!response.ok) {
                    const errorData = await response.json();
                    if (errorData.errors) {
                        setErrors(errorData.errors);
                    }
                    return;
                }
                const result = await response.json();
                setItems(result.data.data || []);
                setPagination(result.data.meta || { current_page: 1, last_page: 1 });
                setErrors({});
            } catch (error) {
                console.error("Error fetching items:", error);
            }
        };

        fetchItems();
    }, [filters]);

    const handlePageChange = (page) => {
        setFilters(prev => ({ ...prev, page }));
    };

    return (
        <GuestLayout>
            <div className="max-w-6xl mx-auto bg-white p-6 shadow-lg rounded-lg">
                <h1 className="text-2xl font-bold mb-4">Item List</h1>
                {Object.keys(errors).length > 0 && (
                    <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
                        <h3 className="font-semibold">Validation Errors:</h3>
                        <ul>
                            {Object.entries(errors).map(([field, messages]) => (
                                <li key={field}>{`${field}: ${messages.join(", ")}`}</li>
                            ))}
                        </ul>
                    </div>
                )}
                <div className="mb-6 flex gap-4">
                    <input
                        type="text"
                        placeholder="Filter by title"
                        className="border p-2 rounded w-64"
                        value={filters.title}
                        onChange={(e) => setFilters({ ...filters, title: e.target.value, page: 1 })}
                    />
                    <div className="flex gap-2">
                        <input
                            type="date"
                            className="border p-2 rounded"
                            onChange={(e) => setFilters({ ...filters, start_date: e.target.value, page: 1 })}
                        />
                        <input
                            type="date"
                            className="border p-2 rounded"
                            onChange={(e) => setFilters({ ...filters, end_date: e.target.value, page: 1 })}
                        />
                    </div>
                </div>

                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="p-2 border">Image</th>
                            <th className="p-2 border">Title</th>
                            <th className="p-2 border">Description</th>
                            <th className="p-2 border">Quantity</th>
                            <th className="p-2 border">Price</th>
                            <th className="p-2 border">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item.id} className="border">
                                <td className="p-2 border">
                                    <img
                                        src={`/storage/public/${item.image}`}
                                        alt={item.title}
                                        className="w-16 h-16 object-cover"
                                        onError={(e) => {
                                            e.target.src = "/placeholder-image.jpg";
                                            e.target.alt = "Image not found";
                                        }}
                                    />
                                </td>
                                <td className="p-2 border">{item.title}</td>
                                <td className="p-2 border">{item.description}</td>
                                <td className="p-2 border">{item.quantity}</td>
                                <td className="p-2 border">
                                    $
                                    {Number(item.price).toLocaleString(undefined, {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    })}
                                </td>
                                <td className="p-2 border">
                                    {new Date(item.date).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric"
                                    })}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-center mt-4 gap-2">
                    <button
                        disabled={pagination.current_page === 1}
                        onClick={() => handlePageChange(pagination.current_page - 1)}
                        className={`px-4 py-2 rounded ${pagination.current_page === 1
                            ? "bg-gray-300 cursor-not-allowed"
                            : "bg-blue-500 text-white"
                            }`}
                    >
                        Prev
                    </button>
                    {Array.from({ length: pagination.last_page || 1 }, (_, i) => (
                        <button
                            key={i + 1}
                            onClick={() => handlePageChange(i + 1)}
                            className={`px-4 py-2 rounded ${pagination.current_page === i + 1
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200"
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                    <button
                        disabled={pagination.current_page === pagination.last_page}
                        onClick={() => handlePageChange(pagination.current_page + 1)}
                        className={`px-4 py-2 rounded ${pagination.current_page === pagination.last_page
                            ? "bg-gray-300 cursor-not-allowed"
                            : "bg-blue-500 text-white"
                            }`}
                    >
                        Next
                    </button>
                </div>
            </div>
        </GuestLayout>
    );
}
