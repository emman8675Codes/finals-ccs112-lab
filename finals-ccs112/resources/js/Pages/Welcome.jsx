import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome - Ticket Management System" />
            <div className="min-h-screen bg-gray-100 dark:bg-zinc-900 text-gray-900 dark:text-gray-100 flex flex-col justify-between">
                {/* Navigation Header */}
                <header className="w-full bg-white dark:bg-zinc-800 shadow-sm border-b border-gray-200 dark:border-zinc-700">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                        <div className="font-bold text-lg tracking-wide text-indigo-600 dark:text-indigo-400">
                            HelpDesk TMS
                        </div>
                        <nav className="flex items-center gap-4">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </nav>
                    </div>
                </header>

                {/* Hero / Main Section */}
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col items-center text-center">
                    <div className="max-w-2xl bg-white dark:bg-zinc-800 p-8 sm:p-12 rounded-xl shadow-md border border-gray-200 dark:border-zinc-700">
                        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
                            IT Support Ticket Management
                        </h1>
                        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                            Replace messy shared spreadsheets with a secure, streamlined helpdesk system. Log, track, prioritize, and resolve your support requests effortlessly.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow hover:bg-indigo-700 transition"
                                >
                                    Go to Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow hover:bg-indigo-700 transition"
                                    >
                                        Get Started / Log In
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="px-6 py-3 bg-gray-200 dark:bg-zinc-700 text-gray-800 dark:text-gray-200 font-medium rounded-lg hover:bg-gray-300 dark:hover:bg-zinc-600 transition"
                                    >
                                        Create Account
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="py-6 text-center text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-zinc-800">
                    Application Development and Emerging Technology Final Laboratory Examination
                </footer>
            </div>
        </>
    );
}