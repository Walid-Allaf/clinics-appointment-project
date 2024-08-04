import { NavItems } from "@/src/constants";
import { LinksPosition } from "@/src/types";
import { List, ListItem, ListItemText } from "@mui/material";
import Link from "next/link";

export const Links = (props: { position: LinksPosition }) => {
  const { position } = props;
  return (
    <List
      sx={{
        display: {
          xs: position == "header" ? "none" : "flex",
          sm: position == "header" ? "flex" : "none",
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
              primary={item.text}
              sx={{ textWrap: "nowrap", color: position == "header" ? "#fff" : "primary" }}
            />
          </Link>
        </ListItem>
      ))}
    </List>
  );
};
