import React, { useState } from "react";
import {
  Card,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  ListSubheader,
  ListItemButton,
  Container,
  CardMedia,
} from "@mui/material";
import {
  Home,
  Person,
  Settings,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";

import { sidebarItems, SidebarItem } from "./sidebarItems";
import Link from "next/link";

export default function Sidebar() {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

  const toggleSubmenu = () => {
    setIsSubmenuOpen(!isSubmenuOpen);
  };

  return (
    <Card
      sx={{
        width: 300,
        height: "100vh",
        backgroundColor: "#2c2c2c",
        color: "#fff",
      }}
    >
      <CardMedia
        component="img"
        width={100}
        height={100}
        image="/logo.png"
        alt="Logo"
        sx={{
          borderRadius: "16px 16px 16px 16px",
          objectFit: "cover",
        }}
      />
      <List
        key={"sidebar"}
        sx={{ width: "100%", maxWidth: 360, bgcolor: "#2c2c2c" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        {sidebarItems.map((item: SidebarItem, index) => {
          if (item.subItems) {
            return (
              <div key={item.name}>
                <ListItemButton key={item.name} onClick={toggleSubmenu}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.name} disableTypography />
                  {isSubmenuOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={isSubmenuOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.subItems.map((subItem, index) => (
                      <Link href={subItem.route} key={subItem.name}>
                        <ListItemButton
                          key={`submenu_${index}`}
                          sx={{ pl: 3, fontSize: "0.8rem" }}
                        >
                          <ListItemIcon>{subItem.icon}</ListItemIcon>
                          <ListItemText
                            primary={subItem.name}
                            disableTypography
                          />
                        </ListItemButton>
                      </Link>
                    ))}
                  </List>
                </Collapse>
              </div>
            );
          } else {
            return (
              <Link href={item.route} key={item.name}>
                <ListItemButton key={item.name}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.name} disableTypography />
                </ListItemButton>
              </Link>
            );
          }
        })}
      </List>
    </Card>
  );
}
