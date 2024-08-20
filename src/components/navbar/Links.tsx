import { NavItems } from "@/src/constants";
import { LinksPosition } from "@/src/types";
import { List, ListItem, ListItemText } from "@mui/material";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";

export const Links = (props: { position: LinksPosition }) => {
  const { position } = props;
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();
  const params = new URLSearchParams(searchParams);
  return (
    <List
      sx={{
        display: {
          xs: position == "header" ? "none" : "flex",
          lg: position == "header" ? "flex" : "none",
        },
        flexDirection: position == "header" ? "row" : "column",
        justifyContent: position == "header" ? "space-between" : "center",
        gap: position == "header" ? 2 : 0,
        alignItems: "center",
      }}
    >
      {NavItems.map((item) => (
        <ListItem
          key={item.text}
          disablePadding
          onClick={() => {
            if (item.step) {
              params.set("step", item.step);
              if (pathname.includes("about-us") || pathname.length == 3) {
                push(`${item.path}?${params.toString()}`);
              } else {
                push(`${pathname}?${params.toString()}`);
              }
            } else {
              push(`${item.path}`);
            }
          }}
        >
          {/* <Link href={item.path}> */}
          <ListItemText
            primary={t(item.text)}
            sx={{
              p: 2,
              textWrap: "nowrap",
              transition: "all .3s ease",
              color:
                position == "header"
                  ? params.get("step") === item.step
                    ? "#3FBDE6"
                    : "#fff"
                  : params.get("step") === item.step
                  ? "#3FBDE6"
                  : "primary",
              "&:hover": {
                color: "#3FBDE6",
              },
              cursor: "pointer",
            }}
          />
          {/* </Link> */}
        </ListItem>
      ))}
    </List>
  );
};
