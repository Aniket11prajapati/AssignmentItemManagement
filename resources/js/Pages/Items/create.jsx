
// import React, { useState } from 'react';
// import { router } from '@inertiajs/react';
// import ValidationErrors from '@/Components/ValidationErrors';
// import GuestLayout from '@/Layouts/GuestLayout';

// export default function Create() {
//     const [items, setItems] = useState([{
//         image: null,
//         title: '',
//         description: '',
//         quantity: 1,
//         price: '',
//         date: ''
//     }]);
//     const [errors, setErrors] = useState({});

//     const handleChange = (index, field, value) => {
//         const newItems = [...items];
//         newItems[index][field] = value;
//         setItems(newItems);
//     };

//     const addNewItem = () => {
//         setItems([...items, {
//             image: null,
//             title: '',
//             description: '',
//             quantity: 1,
//             price: '',
//             date: ''
//         }]);
//     };

//     const removeItem = (index) => {
//         setItems(items.filter((_, i) => i !== index));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setErrors({});

//         const formData = new FormData();
//         items.forEach((item, index) => {
//             formData.append(`items[${index}][image]`, item.image);
//             formData.append(`items[${index}][title]`, item.title);
//             formData.append(`items[${index}][description]`, item.description);
//             formData.append(`items[${index}][quantity]`, item.quantity);
//             formData.append(`items[${index}][price]`, item.price);
//             formData.append(`items[${index}][date]`, item.date);
//         });

//         try {
//             const response = await fetch('/api/items', {
//                 method: 'POST',
//                 body: formData,
//                 headers: {
//                     'Accept': 'application/json',
//                 }
//             });

//             if (!response.ok) {
//                 const errorData = await response.json();
//                 setErrors(errorData.errors || {});
//                 return;
//             }
//             router.visit('/items');
//         } catch (error) {
//             console.error('Network error:', error);
//             setErrors({ general: 'Failed to connect to server' });
//         }
//     };

//     return (
//         <GuestLayout>
//             <div className="max-w-6xl mx-auto bg-white p-6 shadow-lg rounded-lg">
//                 <h1 className="text-2xl font-bold mb-4">Add Multiple Items</h1>
//                 <ValidationErrors errors={errors} />

//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     <div className="overflow-x-auto">
//                         <table className="w-full border-collapse border border-gray-300">
//                             <thead>
//                                 <tr className="bg-gray-200">
//                                     <th className="p-2 border">Image</th>
//                                     <th className="p-2 border">Title</th>
//                                     <th className="p-2 border">Description</th>
//                                     <th className="p-2 border">Quantity</th>
//                                     <th className="p-2 border">Price</th>
//                                     <th className="p-2 border">Date</th>
//                                     <th className="p-2 border">Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {items.map((item, index) => (
//                                     <tr key={index} className="border">
//                                         <td className="p-2 border">
//                                             <input
//                                                 type="file"
//                                                 required
//                                                 onChange={(e) => handleChange(index, 'image', e.target.files[0])}
//                                             />
//                                         </td>
//                                         <td className="p-2 border">
//                                             <input
//                                                 type="text"
//                                                 value={item.title}
//                                                 onChange={(e) => handleChange(index, 'title', e.target.value)}
//                                                 className="w-full p-1 border rounded"
//                                                 required
//                                             />
//                                         </td>
//                                         <td className="p-2 border">
//                                             <textarea
//                                                 value={item.description}
//                                                 onChange={(e) => handleChange(index, 'description', e.target.value)}
//                                                 className="w-full p-1 border rounded"
//                                                 maxLength={250}
//                                                 required
//                                             />
//                                         </td>
//                                         <td className="p-2 border">
//                                             <input
//                                                 type="number"
//                                                 min="1"
//                                                 value={item.quantity}
//                                                 onChange={(e) => handleChange(index, 'quantity', e.target.value)}
//                                                 className="w-full p-1 border rounded"
//                                                 required
//                                             />
//                                         </td>
//                                         <td className="p-2 border">
//                                             <input
//                                                 type="number"
//                                                 min="0.01"
//                                                 step="0.01"
//                                                 value={item.price}
//                                                 onChange={(e) => handleChange(index, 'price', e.target.value)}
//                                                 className="w-full p-1 border rounded"
//                                                 required
//                                             />
//                                         </td>
//                                         <td className="p-2 border">
//                                             <input
//                                                 type="date"
//                                                 value={item.date}
//                                                 onChange={(e) => handleChange(index, 'date', e.target.value)}
//                                                 className="w-full p-1 border rounded"
//                                                 required
//                                             />
//                                         </td>
//                                         <td className="p-2 border text-center">
//                                             {items.length > 1 && (
//                                                 <button
//                                                     type="button"
//                                                     onClick={() => removeItem(index)}
//                                                     className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
//                                                 >
//                                                     Remove
//                                                 </button>
//                                             )}
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>

//                     <div className="flex justify-between mt-4">
//                         <button
//                             type="button"
//                             onClick={addNewItem}
//                             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                         >
//                             Add New Item
//                         </button>
//                         <button
//                             type="submit"
//                             className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//                         >
//                             Save All Items
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </GuestLayout>
//     );
// }
import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import ValidationErrors from '@/Components/ValidationErrors';
import GuestLayout from '@/Layouts/GuestLayout';

export default function Create() {
    const [items, setItems] = useState([{ image: null, title: '', description: '', quantity: 1, price: '', date: '' }]);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (index, field, value) => {
        const newItems = [...items];
        newItems[index][field] = value;
        setItems(newItems);
    };

    const addNewItem = () => {
        setItems([...items, { image: null, title: '', description: '', quantity: 1, price: '', date: '' }]);
    };

    const removeItem = (index) => {
        setItems(items.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setLoading(true);

        const formData = new FormData();
        items.forEach((item, index) => {
            formData.append(`items[${index}][image]`, item.image);
            formData.append(`items[${index}][title]`, item.title);
            formData.append(`items[${index}][description]`, item.description);
            formData.append(`items[${index}][quantity]`, item.quantity);
            formData.append(`items[${index}][price]`, item.price);
            formData.append(`items[${index}][date]`, item.date);
        });

        try {
            const response = await fetch('/api/items', {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (!response.ok) {
                const errorData = await response.json();
                setErrors(errorData.errors || {});
            } else {
                router.visit('/items');
            }
        } catch (error) {
            console.error('Network error:', error);
            setErrors({ general: 'Failed to connect to server' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <GuestLayout>
            <div className="max-w-6xl mx-auto bg-white p-6 shadow-lg rounded-lg">
                <h1 className="text-2xl font-bold mb-4">Add Multiple Items</h1>
                <ValidationErrors errors={errors} />

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="p-2 border">Image</th>
                                    <th className="p-2 border">Title</th>
                                    <th className="p-2 border">Description</th>
                                    <th className="p-2 border">Quantity</th>
                                    <th className="p-2 border">Price</th>
                                    <th className="p-2 border">Date</th>
                                    <th className="p-2 border">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item, index) => (
                                    <tr key={index} className="border">
                                        <td className="p-2 border">
                                            <input type="file" required onChange={(e) => handleChange(index, 'image', e.target.files[0])} />
                                        </td>
                                        <td className="p-2 border">
                                            <input type="text" value={item.title} onChange={(e) => handleChange(index, 'title', e.target.value)} className="w-full p-1 border rounded" required />
                                        </td>
                                        <td className="p-2 border">
                                            <textarea value={item.description} onChange={(e) => handleChange(index, 'description', e.target.value)} className="w-full p-1 border rounded" maxLength={250} required />
                                        </td>
                                        <td className="p-2 border">
                                            <input type="number" min="1" value={item.quantity} onChange={(e) => handleChange(index, 'quantity', e.target.value)} className="w-full p-1 border rounded" required />
                                        </td>
                                        <td className="p-2 border">
                                            <input type="number" min="0.01" step="0.01" value={item.price} onChange={(e) => handleChange(index, 'price', e.target.value)} className="w-full p-1 border rounded" required />
                                        </td>
                                        <td className="p-2 border">
                                            <input type="date" value={item.date} onChange={(e) => handleChange(index, 'date', e.target.value)} className="w-full p-1 border rounded" required />
                                        </td>
                                        <td className="p-2 border text-center">
                                            {items.length > 1 && (
                                                <button type="button" onClick={() => removeItem(index)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Remove</button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {loading && <div className="text-center text-blue-500">Submitting, please wait...</div>}

                    <div className="flex justify-between mt-4">
                        <button type="button" onClick={addNewItem} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" disabled={loading}>
                            Add New Item
                        </button>
                        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600" disabled={loading}>
                            {loading ? 'Saving...' : 'Save All Items'}
                        </button>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}
