import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const userAgent = request.headers.get('user-agent') || '';
    const ua = userAgent.toLowerCase();

    // Detect Instagram, Facebook crawlers, and Facebook In-App Browser
    // facebookexternalhit is used by the Link Shim (Safe Browsing) bot
    const isMetaPlatform =
        ua.includes('instagram') ||
        ua.includes('facebookexternalhit') ||
        ua.includes('fb_iab') ||         // Facebook In-App Browser
        ua.includes('fbav');             // Facebook App for Android/iOS

    // Detect PageSpeed Insights / Lighthouse crawlers
    // These need permissive headers or they timeout on mobile tests
    const isPageSpeedBot =
        ua.includes('lighthouse') ||
        ua.includes('pagespeed') ||
        ua.includes('chrome-lighthouse') ||
        ua.includes('speed insights');

    // Create response with next()
    const response = NextResponse.next();

    if (isMetaPlatform || isPageSpeedBot) {
        // Instagram/Facebook/PageSpeed: Permissive headers to avoid blocking
        // Key insight: IG's Safe Browsing and Lighthouse need to iframe/pre-fetch the site
        response.headers.set('Referrer-Policy', 'no-referrer-when-downgrade');
        response.headers.set('Access-Control-Allow-Origin', '*');
        response.headers.set('Content-Security-Policy', "frame-ancestors *;");
        // Explicitly DELETE restrictive headers
        response.headers.delete('X-Frame-Options');
        response.headers.delete('X-Content-Type-Options');
        // Debug headers
        if (isMetaPlatform) {
            response.headers.set('X-Instagram-Fix', 'Active-V2');
        }
        if (isPageSpeedBot) {
            response.headers.set('X-PageSpeed-Fix', 'Active');
        }
    } else {
        // Normal browsers: Apply strict security headers
        response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
        response.headers.set('X-Frame-Options', 'DENY'); // Strict: No framing allowed
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
