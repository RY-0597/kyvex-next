import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const userAgent = request.headers.get('user-agent') || '';
    const isInstagram = userAgent.toLowerCase().includes('instagram');

    // Create response with next()
    const response = NextResponse.next();

    if (isInstagram) {
        // Instagram In-App Browser: MAXIMUM permissive headers for Safe Browsing pass-through
        // Key insight: IG's Safe Browsing likely tries to iframe/pre-fetch the site
        response.headers.set('Referrer-Policy', 'no-referrer-when-downgrade');
        response.headers.set('Access-Control-Allow-Origin', '*');
        response.headers.set('Content-Security-Policy', "frame-ancestors *;");
        // Explicitly DELETE restrictive headers that might block IG Safe Browsing
        response.headers.delete('X-Frame-Options'); // Remove any inherited X-Frame-Options
        response.headers.delete('X-Content-Type-Options'); // Remove MIME sniff blocking
        response.headers.set('X-Instagram-Fix', 'Active-V2'); // Debug header
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
