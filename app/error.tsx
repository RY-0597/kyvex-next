'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an analytics service
        console.error(error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-900 text-white">
            <h2 className="text-2xl font-bold mb-4">很抱歉，發生了一些錯誤</h2>
            <p className="text-gray-400 mb-8 max-w-md text-center">
                我們無法順利載入此頁面。請嘗試重新整理。
            </p>
            <div className="flex gap-4">
                <button
                    onClick={
                        // Attempt to recover by trying to re-render the segment
                        () => reset()
                    }
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                >
                    重試
                </button>
                <Link
                    href="/"
                    className="px-6 py-2 border border-gray-600 hover:bg-gray-800 rounded-lg transition-colors"
                >
                    回首頁
                </Link>
            </div>
        </div>
    );
}
