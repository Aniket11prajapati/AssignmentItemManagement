import { Head, Link } from '@inertiajs/react';

export default function Welcome({ children }) {
    const handleImageError = () => {
        document
            .getElementById('screenshot-container')
            ?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document
            .getElementById('docs-card-content')
            ?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <>
            <AppLayout>
                <div className="py-12">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="bg-white p-8 rounded-lg shadow">
                            <h1 className="text-3xl font-bold mb-4">Welcome to Item Manager</h1>
                            <p className="text-gray-600">
                                Manage your inventory with our easy-to-use interface.
                            </p>
                        </div>
                    </div>
                </div>
            </AppLayout>
        </>
    );
}
