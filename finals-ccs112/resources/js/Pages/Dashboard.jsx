import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Dashboard() {
    const user = usePage().props.auth.user;

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="bg-white p-6 shadow-sm sm:rounded-lg">
                        <p className="text-gray-900">Welcome, {user.name}.</p>
                        <Link href={route('tickets.index')} className="mt-4 inline-block text-indigo-600 hover:underline">
                            Go to my tickets
                        </Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}