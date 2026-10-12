import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TicketForm from '@/Components/TicketForm';
import { Head } from '@inertiajs/react';

export default function Edit({ ticket, options }) {
    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Edit Ticket #{ticket.id}</h2>}
        >
            <Head title={`Edit Ticket #${ticket.id}`} />

            <div className="py-8">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    <div className="bg-white p-6 shadow-sm sm:rounded-lg">
                        <TicketForm
                            ticket={ticket}
                            options={options}
                            url={route('tickets.update', ticket.id)}
                            method="put"
                            submitLabel="Save Changes"
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}