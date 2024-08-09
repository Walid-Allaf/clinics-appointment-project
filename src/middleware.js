import { NextResponse } from "next/server";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import i18nConfig from "../i18nConfig";

const locales = i18nConfig.locales;

function getLocale(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  // URL
  const pathnameLocale = locales.find((locale) => pathname.startsWith(`/${locale}`));
  if (pathnameLocale) {
    return pathnameLocale;
  }

  // COOKIE
  const cookieLocale = request.cookies.get("NEXT_LOCALE").value;
  console.log(cookieLocale);
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale;
  }

  // BROWSER
  const negotiatorHeaders = {
    headers: { "accept-language": request.headers.get("accept-language") },
  };
  const languages = new Negotiator(negotiatorHeaders).languages(locales);

  // Intl.LocaleMatcher
  const locale = matchLocale(languages, locales, i18nConfig.defaultLocale);

  return locale;
}

export function middleware(request) {
  const locale = getLocale(request);

  // Redirect to detected language
  if (locale && !request.nextUrl.pathname.startsWith(`/${locale}`)) {
    const url = new URL(`/${locale}${request.nextUrl.pathname}`, request.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// applies this middleware only to files in the app directory
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
