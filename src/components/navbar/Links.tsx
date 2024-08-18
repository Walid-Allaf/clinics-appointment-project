import { NavItems } from "@/src/constants";
import { LinksPosition } from "@/src/types";
import { List, ListItem, ListItemText } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

export const Links = (props: { position: LinksPosition }) => {
  const { position } = props;
  const { t } = useTranslation();
  const pathname = usePathname();
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
          sx={{}}
          disablePadding
          onClick={() => console.log("consile", item.path.slice(1), pathname.slice(4))}
        >
          <Link href={item.path}>
            <ListItemText
              primary={t(item.text)}
              sx={{
                p: 2,
                textWrap: "nowrap",
                transition: "all .3s ease",
                color:
                  position == "header"
                    ? pathname.slice(4) === item.path.slice(1)
                      ? "#3FBDE6"
                      : "#fff"
                    : pathname.slice(4) === item.path.slice(1)
                    ? "#3FBDE6"
                    : "primary",
                "&:hover": {
                  color: "#3FBDE6",
                },
              }}
            />
          </Link>
        </ListItem>
      ))}
    </List>
  );
};
