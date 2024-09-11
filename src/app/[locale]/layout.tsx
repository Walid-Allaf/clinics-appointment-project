import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import ltr_theme from "../../theme/ltr_theme";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Footer, Navbar } from "../../components";
import i18nConfig from "@/i18nConfig";
import { dir } from "i18next";
import initTranslations from "../i18n";
import TranslationsProvider from "../../components/common/TranslationsProvider";
import { lang } from "@/src/types";
import rtl_theme from "@/src/theme/rtl_theme";
import { Suspense } from "react";

const lexend = Lexend({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Clinics Appointment Project",
  description: "Clinics Appointment Project",
};

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

const i18nNamespaces = ["common"];

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: lang };
}>) {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);
  return (
    <html lang={locale} dir={dir(locale)}>
      <body className={lexend.className}>
        <Suspense fallback="loading">
          <AppRouterCacheProvider>
            <ThemeProvider theme={dir(locale) == "ltr" ? ltr_theme : rtl_theme}>
              <TranslationsProvider namespaces={i18nNamespaces} locale={locale} resources={resources}>
                <Navbar locale={locale} />
                {children}
                <Footer locale={locale} />
              </TranslationsProvider>
            </ThemeProvider>
            <CssBaseline />
          </AppRouterCacheProvider>
        </Suspense>
      </body>
    </html>
  );
}
