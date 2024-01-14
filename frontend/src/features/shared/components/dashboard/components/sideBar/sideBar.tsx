import React from "react";
import Link from "next/link";
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import BusinessTwoToneIcon from "@mui/icons-material/BusinessTwoTone";
import MoreTimeIcon from "@mui/icons-material/MoreTime";
import GroupsIcon from "@mui/icons-material/Groups";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import ResponsiveAppBar from "../../../navBar/NavBarMenu";

const Sidebar: React.FC = () => {
  const iconsStyle = {
    borderRadius: "5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "black",
    fontSize: "30px",
    marginTop: "30px",
    marginBottom: "10px",
  };

  const menuItems = [
    {
      text: "",
      link: "/pages/dashboard",
      icon: <HomeIcon style={iconsStyle} />,
    },
    {
      text: "",
      link: "/pages/dashboard/listBusiness",
      icon: <BusinessTwoToneIcon style={iconsStyle} />,
    },
    {
      text: "",
      link: "/pages/dashboard/listClient",
      icon: <GroupsIcon style={iconsStyle} />,
    },
    {
      text: "",
      link: "/pages/dashboard/listProject",
      icon: <ContentPasteIcon style={iconsStyle} />,
    },
    {
      text: "",
      link: "/pages/dashboard/registerTime",
      icon: <MoreTimeIcon style={iconsStyle} />,
    },
    {
      text: "",
      link: "/pages/dashboard/settings",
      icon: <SettingsIcon style={iconsStyle} />,
    },
  ];

  return (
    <>

      <Drawer variant="permanent" sx={{ width: 100, flexShrink: 0 }}>
        <Divider />
        <Box sx={{ marginTop: "0px", marginBottom: "10px", textAlign: "center" }}>

        </Box>
        <Divider />
        <List>
          {menuItems.map((item, index) => (
            <Link key={index} href={item.link}>
              <Tooltip title={item.text}>
                <ListItemButton sx={{ width: "100%" }}>
                  <ListItemIcon sx={{ minWidth: 0 }}>{item.icon}</ListItemIcon>
                  <ListItemText style={iconsStyle}>{item.text}</ListItemText>
                </ListItemButton>
              </Tooltip>
            </Link>
          ))}
        </List>
      </Drawer>
    </>
  );
};
export default Sidebar;
