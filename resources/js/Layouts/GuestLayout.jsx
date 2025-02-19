import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex justify-between">
                        <Link href="/" className="text-xl font-bold text-gray-800">
                            Item Manager
                        </Link>
                        <div className="space-x-4">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-800"
                            >
                                View Items
                            </Link>
                            <Link
                                href="/items/create"
                                className="text-gray-600 hover:text-gray-800"
                            >
                                Add Items
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="py-8">
                <div className="max-w-7xl mx-auto px-4">
                    {children}
                </div>
            </main>
        </div>
    );
}
