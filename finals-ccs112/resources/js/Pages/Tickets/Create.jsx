import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TicketForm from '@/Components/TicketForm';
import { Head } from '@inertiajs/react';

export default function Create({ options }) {
    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">New Ticket</h2>}
        >
            <Head title="New Ticket" />

            <div className="py-8">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    <div className="bg-white p-6 shadow-sm sm:rounded-lg">
                        <TicketForm
                            options={options}
                            url={route('tickets.store')}
                            method="post"
                            submitLabel="Create Ticket"
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}