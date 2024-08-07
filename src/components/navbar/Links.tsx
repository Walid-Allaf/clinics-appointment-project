import { NavItems } from "@/src/constants";
import { LinksPosition } from "@/src/types";
import { List, ListItem, ListItemText } from "@mui/material";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export const Links = (props: { position: LinksPosition }) => {
  const { position } = props;
  const { t } = useTranslation();
  return (
    <List
      sx={{
        display: {
          xs: position == "header" ? "none" : "flex",
          md: position == "header" ? "flex" : "none",
        },
        flexDirection: position == "header" ? "row" : "column",
        justifyContent: position == "header" ? "space-between" : "center",
        gap: position == "header" ? 2 : 0,
        alignItems: "center",
      }}
    >
      {NavItems.map((item) => (
        <ListItem key={item.text} sx={{ p: 2 }} disablePadding>
          <Link href={item.path}>
            <ListItemText
              primary={t(item.text)}
              sx={{ textWrap: "nowrap", color: position == "header" ? "#fff" : "primary" }}
            />
          </Link>
        </ListItem>
      ))}
    </List>
  );
};
