"use client";
import React, { useState } from "react";
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import {
  AppBar as MuiAppBar,
  Box,
  Divider,
  Drawer as MuiDrawer,
  IconButton,
  Link,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  CssBaseline,
  AppBar,
  Badge,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HomeIcon from "@mui/icons-material/Home";
import BusinessTwoToneIcon from "@mui/icons-material/BusinessTwoTone";
import GroupsIcon from "@mui/icons-material/Groups";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import MoreTimeIcon from "@mui/icons-material/MoreTime";
import SettingsIcon from "@mui/icons-material/Settings";
import ProfileForm from "../../../avatar/Avatar";
import NotificationsIcon from "@mui/icons-material/Notifications";

type SidebarProps = {
  open: boolean;
};

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

// const AppBar = styled(MuiAppBar, { shouldForwardProp: (prop) => prop !== 'open' })(
//   ({  }) => ({
//     zIndex: theme.zIndex.drawer + 1,
//     transition: theme.transitions.create(['width', 'margin'], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//     ...(open && {
//       marginLeft: drawerWidth,
//       width: `calc(100% - ${drawerWidth}px)`,
//       transition: theme.transitions.create(['width', 'margin'], {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.enteringScreen,
//       }),
//     }),
//   }),
// );
const DrawerHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
}));

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
    text: "  ",
    link: "/pages/dashboard/registerTime",
    icon: <MoreTimeIcon style={iconsStyle} />,
  },
  {
    text: "",
    link: "/pages/dashboard/settings",
    icon: <SettingsIcon style={iconsStyle} />,
  },
];



const Sidebar : React.FC<SidebarProps> = ({ open }) => {
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(open);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            sx={{
              marginRight: 5,
              ...(drawerOpen && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Social Up
          </Typography>
          <ProfileForm onChange={function (data: any): void {
            throw new Error("Function not implemented.");
          } } avatarType={"user"} defaultImage={""} resetKey={undefined}/>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={drawerOpen}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menuItems.map((item, index) => (
            <Link key={index} href={item.link}>
              <ListItemButton>
                <ListItemIcon sx={{ minWidth: 0 }}>{item.icon}</ListItemIcon>
                <ListItemText>{item.text}</ListItemText>
              </ListItemButton>
            </Link>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
        }}
      >
        <DrawerHeader />
      </Box>
    </Box>
  );
};

export default Sidebar;