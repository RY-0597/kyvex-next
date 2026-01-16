'use client';

// global-error.tsx is a special error boundary that wraps the entire app
// including the root layout. It MUST define its own <html> and <body>.
// IMPORTANT: Uses inline styles because CSS may not have loaded when this renders.

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <html lang="zh-TW">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>發生錯誤 | KYVEX</title>
            </head>
            <body style={{
                margin: 0,
                padding: 0,
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#0f172a',
                color: '#ffffff',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                textAlign: 'center',
            }}>
                <div style={{ padding: '24px', maxWidth: '400px' }}>
                    <h2 style={{
                        fontSize: '24px',
                        fontWeight: 'bold',
                        marginBottom: '16px',
                    }}>
                        發生嚴重錯誤
                    </h2>
                    <p style={{
                        color: '#94a3b8',
                        marginBottom: '24px',
                        lineHeight: 1.6,
                    }}>
                        無法載入網站內容。這可能是由於瀏覽器兼容性問題。
                    </p>
                    <button
                        onClick={() => reset()}
                        style={{
                            padding: '12px 24px',
                            backgroundColor: '#3b82f6',
                            color: '#ffffff',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '16px',
                            fontWeight: 500,
                            cursor: 'pointer',
                        }}
                    >
                        重新載入
                    </button>
                </div>
            </body>
        </html>
    );
}
