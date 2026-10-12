import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PriorityBadge, StatusBadge } from '@/Components/Badges';
import { Head, Link, router } from '@inertiajs/react';

export default function Show({ ticket }) {
    const destroyTicket = () => {
        if (confirm('Delete this ticket? This cannot be undone.')) { // confirm first
            router.delete(route('tickets.destroy', ticket.id));
        }
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Ticket #{ticket.id}</h2>}
        >
            <Head title={`Ticket #${ticket.id}`} />

            <div className="py-8">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    <div className="bg-white p-6 shadow-sm sm:rounded-lg">
                        <h3 className="break-words text-lg font-semibold text-gray-900">{ticket.title}</h3>

                        <div className="mt-3 flex flex-wrap gap-2">
                            <PriorityBadge value={ticket.priority} />
                            <StatusBadge value={ticket.status} />
                            <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700">
                                {ticket.category}
                            </span>
                        </div>

                        <p className="mt-4 whitespace-pre-line break-words text-gray-700">{ticket.description}</p>

                        <div className="mt-6 grid grid-cols-1 gap-2 text-sm text-gray-500 sm:grid-cols-2">
                            <div>Created: {new Date(ticket.created_at).toLocaleString()}</div>
                            <div>Updated: {new Date(ticket.updated_at).toLocaleString()}</div>
                        </div>

                        <div className="mt-6 flex flex-wrap items-center gap-4">
                            <Link href={route('tickets.edit', ticket.id)} className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500">
                                Edit
                            </Link>
                            <button type="button" onClick={destroyTicket} className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-500">
                                Delete
                            </button>
                            <Link href={route('tickets.index')} className="text-sm text-gray-600 hover:text-gray-900">
                                Back to tickets
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}