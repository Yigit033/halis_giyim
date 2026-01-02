import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import type { Database } from '@/lib/types/database';

export async function middleware(req: NextRequest) {
    const res = NextResponse.next();
    const supabase = createMiddlewareClient<Database>({ req, res });

    // Refresh session if expired
    const {
        data: { session },
    } = await supabase.auth.getSession();

    // Protect admin routes
    if (req.nextUrl.pathname.startsWith('/admin')) {
        // Allow login page
        if (req.nextUrl.pathname === '/admin/login') {
            // If already logged in, redirect to dashboard
            if (session) {
                return NextResponse.redirect(new URL('/admin/dashboard', req.url));
            }
            return res;
        }

        // For other admin pages, require authentication
        if (!session) {
            return NextResponse.redirect(new URL('/admin/login', req.url));
        }
    }

    return res;
}

export const config = {
    matcher: ['/admin/:path*'],
};
