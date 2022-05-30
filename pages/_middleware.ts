import { NextResponse } from 'next/server';

const signedInPages = ['/', 'playlist', '/library'];

export default function middleware(req) {
  const { pathname, origin } = req.nextUrl;
  if (signedInPages.find((p) => p === pathname)) {
    const token = req.cookies.TRAX_ACCESS_TOKEN;

    if (!token) {
      return NextResponse.redirect(`${origin}/signin`);
    }
  }
}
