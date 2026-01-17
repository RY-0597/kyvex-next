export const metadata = {
    title: 'Test Page',
    description: 'Simple test page',
};

export default function TestLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html>
            <body style={{ background: 'white', color: 'black' }}>
                {children}
            </body>
        </html>
    );
}
