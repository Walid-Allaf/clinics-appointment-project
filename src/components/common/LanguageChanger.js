"use client";

import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import i18nConfig from "@/i18nConfig";
import { Select, MenuItem } from "@mui/material";
import Cookies from "js-cookie";

export default function LanguageChanger() {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  const router = useRouter();
  const currentPathname = usePathname();

  const handleChange = (e) => {
    const newLocale = e.target.value;
    console.log(currentLocale);

    // set cookie for next-i18n-router
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = date.toUTCString();
    Cookies.set("NEXT_LOCALE", newLocale);

    // redirect to the new locale path
    router.push(currentPathname.replace(`/${currentLocale}`, `/${newLocale}`));
    // if (currentLocale === i18nConfig.defaultLocale) {
    // router.push("/" + newLocale + currentPathname);
    // } else {
    // router.push(currentPathname.replace(`/${currentLocale}`, `/${newLocale}`));
    // }

    router.refresh();
  };

  return (
    <Select
      size="small"
      color="secondary"
      sx={{ background: "#3FBDE6", borderRadius: "100px" }}
      onChange={handleChange}
      value={currentLocale}
    >
      <MenuItem value="en">{currentLocale == "en" ? "English" : "الإنكليزية"}</MenuItem>
      <MenuItem value="ar">{currentLocale == "en" ? "Arabic" : "العربية"}</MenuItem>
    </Select>
  );
}
