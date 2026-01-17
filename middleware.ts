import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const userAgent = request.headers.get('user-agent') || '';
    const isInstagram = userAgent.toLowerCase().includes('instagram');

    // Create response with next()
    const response = NextResponse.next();

    if (isInstagram) {
        // Instagram In-App Browser: Apply permissive headers to fix "Safe Browsing" handshake
        response.headers.set('Referrer-Policy', 'no-referrer-when-downgrade');
        response.headers.set('X-Frame-Options', 'SAMEORIGIN');
        response.headers.set('Access-Control-Allow-Origin', '*');
        response.headers.set('X-Content-Type-Options', 'nosniff');
        response.headers.set('X-Instagram-Fix', 'Active'); // Debug header
    } else {
        // Normal browsers: Apply stricter security headers
        response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
        response.headers.set('X-Frame-Options', 'DENY');
        response.headers.set('X-Content-Type-Options', 'nosniff');
        response.headers.set('X-XSS-Protection', '1; mode=block');
    }

    // Common headers for all requests
    response.headers.set('X-DNS-Prefetch-Control', 'on');

    return response;
}

// Apply middleware to all routes
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
