import { Link, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

const fieldClass = 'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500';

function SelectField({ id, label, value, onChange, choices, error, placeholder }) {
    return (
        <div>
            <InputLabel htmlFor={id} value={label} />
            <select id={id} value={value} onChange={onChange} className={fieldClass}>
                <option value="" disabled>{placeholder}</option>
                {choices.map((c) => (
                    <option key={c} value={c}>{c}</option>
                ))}
            </select>
            <InputError message={error} className="mt-2" />
        </div>
    );
}

export default function TicketForm({ ticket, options, url, method, submitLabel }) {
    const { data, setData, post, put, processing, errors } = useForm({
        title: ticket?.title ?? '',
        description: ticket?.description ?? '',
        priority: ticket?.priority ?? 'Medium',
        status: ticket?.status ?? 'Open',
        category: ticket?.category ?? '',
    });

    const submit = (e) => {
        e.preventDefault();
        if (method === 'put') {
            put(url);
        } else {
            post(url);
        }
    };

    return (
        <form onSubmit={submit} className="space-y-6">
            {Object.keys(errors).length > 0 && (
                <div role="alert" className="rounded-md bg-red-50 p-3 text-sm text-red-700">
                    Please fix the errors below.
                </div>
            )}

            <div>
                <InputLabel htmlFor="title" value="Title" />
                <TextInput
                    id="title"
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                    className="mt-1 block w-full"
                />
                <InputError message={errors.title} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="description" value="Description" />
                <textarea
                    id="description"
                    rows="5"
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    className={fieldClass}
                />
                <InputError message={errors.description} className="mt-2" />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <SelectField
                    id="priority"
                    label="Priority"
                    value={data.priority}
                    onChange={(e) => setData('priority', e.target.value)}
                    choices={options.priorities}
                    error={errors.priority}
                    placeholder="Select priority"
                />
                <SelectField
                    id="status"
                    label="Status"
                    value={data.status}
                    onChange={(e) => setData('status', e.target.value)}
                    choices={options.statuses}
                    error={errors.status}
                    placeholder="Select status"
                />
                <SelectField
                    id="category"
                    label="Category"
                    value={data.category}
                    onChange={(e) => setData('category', e.target.value)}
                    choices={options.categories}
                    error={errors.category}
                    placeholder="Select category"
                />
            </div>

            <div className="flex items-center gap-4">
                <PrimaryButton disabled={processing}>
                    {processing ? 'Saving...' : submitLabel}
                </PrimaryButton>
                <Link href={route('tickets.index')} className="text-sm text-gray-600 hover:text-gray-900">
                    Cancel
                </Link>
            </div>
        </form>
    );
}