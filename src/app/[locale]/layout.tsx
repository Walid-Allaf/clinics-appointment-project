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
import { MedicalCenterInfo } from "@/src/api/types";
import { notFound } from "next/navigation";
import { apiRoutes } from "@/src/api";
import { Toaster } from "react-hot-toast";

const lexend = Lexend({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

async function getMedicalInfo() {
  let res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api${apiRoutes.website.GetMedicalCenterInfo}`, {
    headers: { "Content-Type": "application/json", key: `${process.env.NEXT_PUBLIC_BASE_KEY}` },
    cache: "force-cache",
  });
  let data: MedicalCenterInfo = await res.json();
  if (!data) notFound();
  return data;
}

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
  let medicalInfo = await getMedicalInfo();
  return (
    <html lang={locale} dir={dir(locale)}>
      <body className={lexend.className}>
        <Suspense fallback="loading">
          <AppRouterCacheProvider>
            <ThemeProvider theme={dir(locale) == "ltr" ? ltr_theme : rtl_theme}>
              <TranslationsProvider namespaces={i18nNamespaces} locale={locale} resources={resources}>
                <Navbar locale={locale} data={medicalInfo} />
                {children}
                <Footer locale={locale} data={medicalInfo} />
              </TranslationsProvider>
            </ThemeProvider>
            <CssBaseline />
            <Toaster position="bottom-right" />
          </AppRouterCacheProvider>
        </Suspense>
      </body>
    </html>
  );
}
