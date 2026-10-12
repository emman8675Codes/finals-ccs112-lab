import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PriorityBadge, StatusBadge } from '@/Components/Badges';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

function destroyTicket(id) {
    if (confirm('Delete this ticket? This cannot be undone.')) { // confirm first
        router.delete(route('tickets.destroy', id));
    }
}

function Actions({ ticket }) {
    return (
        <div className="flex gap-4 text-sm">
            <Link href={route('tickets.show', ticket.id)} className="text-indigo-600 hover:underline">View</Link>
            <Link href={route('tickets.edit', ticket.id)} className="text-yellow-600 hover:underline">Edit</Link>
            <button type="button" onClick={() => destroyTicket(ticket.id)} className="text-red-600 hover:underline">
                Delete
            </button>
        </div>
    );
}

const selectClass = 'w-full rounded-md border-gray-300 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500';

function FilterSelect({ label, name, value, choices, onChange }) {
    return (
        <div>
            <label htmlFor={name} className="block text-xs font-medium text-gray-500">{label}</label>
            <select id={name} value={value} onChange={(e) => onChange(name, e.target.value)} className={selectClass}>
                <option value="">All</option>
                {choices.map((c) => (
                    <option key={c} value={c}>{c}</option>
                ))}
            </select>
        </div>
    );
}

export default function Index({ tickets, filters, options }) {
    const [values, setValues] = useState({
        status: filters.status ?? '',
        priority: filters.priority ?? '',
        category: filters.category ?? '',
    });

    const hasFilters = Object.values(values).some((v) => v !== '');

    // send only the filters that have a value
    const applyFilters = (next) => {
        setValues(next);
        const params = Object.fromEntries(Object.entries(next).filter(([, v]) => v !== ''));
        router.get(route('tickets.index'), params, { preserveState: true, replace: true });
    };

    const changeFilter = (name, value) => applyFilters({ ...values, [name]: value });
    const clearFilters = () => applyFilters({ status: '', priority: '', category: '' });

    const date = (d) => new Date(d).toLocaleDateString();

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">My Tickets</h2>}
        >
            <Head title="Tickets" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* filter bar */}
                    <div className="mb-4 grid grid-cols-1 gap-3 rounded-lg bg-white p-4 shadow-sm sm:grid-cols-2 lg:grid-cols-4 lg:items-end">
                        <FilterSelect label="Status" name="status" value={values.status} choices={options.statuses} onChange={changeFilter} />
                        <FilterSelect label="Priority" name="priority" value={values.priority} choices={options.priorities} onChange={changeFilter} />
                        <FilterSelect label="Category" name="category" value={values.category} choices={options.categories} onChange={changeFilter} />
                        {hasFilters && (
                            <button type="button" onClick={clearFilters} className="rounded-md bg-gray-100 px-3 py-2 text-sm text-gray-700 hover:bg-gray-200">
                                Clear filters
                            </button>
                        )}
                    </div>

                    {tickets.data.length === 0 ? (
                        <div className="rounded-lg bg-white p-10 text-center shadow-sm">
                            {hasFilters ? (
                                <>
                                    <p className="text-lg font-medium text-gray-900">No matching tickets</p>
                                    <p className="mt-1 text-sm text-gray-500">Try changing or clearing your filters.</p>
                                </>
                            ) : (
                                <>
                                    <p className="text-lg font-medium text-gray-900">No tickets yet</p>
                                    <p className="mt-1 text-sm text-gray-500">Create your first ticket to get started.</p>
                                    <Link
                                        href={route('tickets.create')}
                                        className="mt-4 inline-block rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
                                    >
                                        New Ticket
                                    </Link>
                                </>
                            )}
                        </div>
                    ) : (
                        <>
                            {/* table on md and up */}
                            <div className="hidden overflow-hidden rounded-lg bg-white shadow-sm md:block">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            {['Title', 'Category', 'Priority', 'Status', 'Created', 'Actions'].map((h) => (
                                                <th key={h} className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                    {h}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {tickets.data.map((t) => (
                                            <tr key={t.id}>
                                                <td className="max-w-xs truncate px-4 py-3 text-sm font-medium text-gray-900">
                                                    <Link href={route('tickets.show', t.id)} className="hover:underline">{t.title}</Link>
                                                </td>
                                                <td className="px-4 py-3 text-sm text-gray-600">{t.category}</td>
                                                <td className="px-4 py-3"><PriorityBadge value={t.priority} /></td>
                                                <td className="px-4 py-3"><StatusBadge value={t.status} /></td>
                                                <td className="px-4 py-3 text-sm text-gray-600">{date(t.created_at)}</td>
                                                <td className="px-4 py-3"><Actions ticket={t} /></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* stacked cards on small screens */}
                            <div className="space-y-3 md:hidden">
                                {tickets.data.map((t) => (
                                    <div key={t.id} className="rounded-lg bg-white p-4 shadow-sm">
                                        <Link href={route('tickets.show', t.id)} className="break-words font-semibold text-gray-900">
                                            {t.title}
                                        </Link>
                                        <div className="mt-2 flex flex-wrap gap-2">
                                            <PriorityBadge value={t.priority} />
                                            <StatusBadge value={t.status} />
                                        </div>
                                        <p className="mt-2 text-sm text-gray-500">{t.category} &middot; {date(t.created_at)}</p>
                                        <div className="mt-3"><Actions ticket={t} /></div>
                                    </div>
                                ))}
                            </div>

                            {tickets.last_page > 1 && (
                                <div className="mt-4 flex items-center justify-between">
                                    {tickets.prev_page_url ? (
                                        <Link href={tickets.prev_page_url} className="rounded-md bg-white px-3 py-2 text-sm shadow-sm hover:bg-gray-50">
                                            Previous
                                        </Link>
                                    ) : (
                                        <span className="rounded-md bg-white px-3 py-2 text-sm text-gray-400 opacity-50 shadow-sm">Previous</span>
                                    )}
                                    <span className="text-sm text-gray-600">
                                        Page {tickets.current_page} of {tickets.last_page}
                                    </span>
                                    {tickets.next_page_url ? (
                                        <Link href={tickets.next_page_url} className="rounded-md bg-white px-3 py-2 text-sm shadow-sm hover:bg-gray-50">
                                            Next
                                        </Link>
                                    ) : (
                                        <span className="rounded-md bg-white px-3 py-2 text-sm text-gray-400 opacity-50 shadow-sm">Next</span>
                                    )}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}