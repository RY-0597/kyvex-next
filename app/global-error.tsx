'use client';

// global-error.tsx is a special error boundary that wraps the entire app
// including the root layout. It MUST define its own <html> and <body>.

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <html>
            <body className="bg-gray-900 text-white">
                <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
                    <h2 className="text-2xl font-bold mb-4">發生嚴重錯誤</h2>
                    <p className="text-gray-400 mb-8">無法載入網站內容。這可能是由於瀏覽器兼容性問題。</p>
                    <button
                        onClick={() => reset()}
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                    >
                        重新載入
                    </button>
                </div>
            </body>
        </html>
    );
}
