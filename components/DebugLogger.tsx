'use client';

import { useEffect, useState } from 'react';

export default function DebugLogger() {
    const [logs, setLogs] = useState<string[]>([]);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);

        const addLog = (msg: string) => {
            setLogs(prev => [...prev.slice(-10), `${new Date().toLocaleTimeString()} - ${msg}`]);
        };

        const originalError = console.error;
        console.error = (...args) => {
            addLog(`ERR: ${args.map(a => String(a)).join(' ')}`);
            originalError.apply(console, args);
        };

        window.onerror = (msg, url, line, col, error) => {
            addLog(`WIN_ERR: ${msg} at ${line}:${col}`);
        };

        window.onunhandledrejection = (event) => {
            addLog(`UNHANDLED: ${event.reason}`);
        };

        addLog('Debug Logger Initialized');
        addLog(`UA: ${navigator.userAgent}`);

        return () => {
            console.error = originalError;
        };
    }, []);

    if (!isVisible) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '250px',
            overflowY: 'scroll',
            background: 'rgba(0,0,0,0.9)',
            color: '#00ff00',
            fontSize: '11px',
            zIndex: 2147483647,
            padding: '10px',
            fontFamily: 'monospace',
            borderBottom: '2px solid #00ff00',
            wordBreak: 'break-all'
        }}>
            <div style={{ fontWeight: 'bold', borderBottom: '1px solid #333', marginBottom: '5px' }}>SYSTEM DEBUGGER (INSTAGRAM)</div>
            {logs.map((log, i) => (
                <div key={i} style={{ marginBottom: '4px', borderBottom: '1px dotted #333' }}>{log}</div>
            ))}
        </div>
    );
}
