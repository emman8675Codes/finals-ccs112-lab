import { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';

export default function FlashMessage() {
    const { flash } = usePage().props;
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (!flash.success) {
            setShow(false); // nothing to show
            return;
        }
        setShow(true);
        const timer = setTimeout(() => setShow(false), 4000); // auto dismiss
        return () => clearTimeout(timer);
    }, [flash]);

    if (!show) return null;

    return (
        <div role="status" className="flex items-center justify-between rounded-md bg-green-50 p-4 text-sm text-green-800">
            <span>{flash.success}</span>
            <button type="button" onClick={() => setShow(false)} aria-label="Dismiss" className="ms-4 text-lg leading-none hover:text-green-950">
                &times;
            </button>
        </div>
    );
}