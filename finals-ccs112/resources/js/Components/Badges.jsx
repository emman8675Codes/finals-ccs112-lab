const priorityColors = {
    Low: 'bg-gray-100 text-gray-800',
    Medium: 'bg-blue-100 text-blue-800',
    High: 'bg-orange-100 text-orange-800',
    Urgent: 'bg-red-100 text-red-800',
};

const statusColors = {
    Open: 'bg-green-100 text-green-800',
    'In Progress': 'bg-yellow-100 text-yellow-800',
    Resolved: 'bg-indigo-100 text-indigo-800',
    Closed: 'bg-gray-200 text-gray-700',
};

const base = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium';

export function PriorityBadge({ value }) {
    return <span className={`${base} ${priorityColors[value] ?? ''}`}>{value}</span>;
}

export function StatusBadge({ value }) {
    return <span className={`${base} ${statusColors[value] ?? ''}`}>{value}</span>;
}