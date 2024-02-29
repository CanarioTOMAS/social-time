import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import BusinessTwoToneIcon from "@mui/icons-material/BusinessTwoTone";
import MoreTimeIcon from "@mui/icons-material/MoreTime";
import GroupsIcon from "@mui/icons-material/Groups";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link } from "react-router-dom";

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

export const mainListItems = (
  <React.Fragment>
    {/* <Link
      to="/pages/dashboard"
      style={{ textDecoration: "none", color: "inherit" }}
    > */}
      <ListItemButton>
        <ListItemIcon style={iconsStyle}>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItemButton>
    {/* </Link> */}
    {/* <Link 
      // to="/pages/dashboard/listBusiness"
      // style={{ textDecoration: "none", color: "inherit" }}
    // >*/}
      <ListItemButton>
        <ListItemIcon style={iconsStyle}>
          <BusinessTwoToneIcon />
        </ListItemIcon>
        <ListItemText primary="Business" />
      </ListItemButton>
    {/* </Link> */}
    {/* <Link 
      // to="/pages/dashboard/listClients"
    //   style={{ textDecoration: "none", color: "inherit" }}
    // >*/}
      <ListItemButton>
        <ListItemIcon style={iconsStyle}>
          <GroupsIcon />
        </ListItemIcon>
        <ListItemText primary="Clients" />
      </ListItemButton>
    {/* </Link> */}
    {/* <Link
    //   to="/pages/dashboard/listProject"
    //   style={{ textDecoration: "none", color: "inherit" }}
    // > */}
      <ListItemButton>
        <ListItemIcon style={iconsStyle}>
          <ContentPasteIcon />
        </ListItemIcon>
        <ListItemText primary="Projects" />
      </ListItemButton>
    {/* </Link> */}
    {/* <Link 
    //   to="/pages/dashboard/registerTime"
    //   style={{ textDecoration: "none", color: "inherit" }}
    // >*/}
      <ListItemButton>
        <ListItemIcon style={iconsStyle}>
          <MoreTimeIcon />
        </ListItemIcon>
        <ListItemText primary="Register Time" />
      </ListItemButton>
    {/* </Link> */}
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    {/* <Link
      to="/pages/dashboard/settings"
      style={{ textDecoration: "none", color: "inherit" }}
    > */}
      <ListItemButton>
        <ListItemIcon style={iconsStyle}>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Setting" />
      </ListItemButton>
    {/* </Link> */}
  </React.Fragment>
);
// import React from "react";
// import Link from "next/link";
// import {
//   Box,
//   Divider,
//   Drawer,
//   List,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   Tooltip,
// } from "@mui/material";
// import BusinessTwoToneIcon from "@mui/icons-material/BusinessTwoTone";
// import MoreTimeIcon from "@mui/icons-material/MoreTime";
// import GroupsIcon from "@mui/icons-material/Groups";
// import ContentPasteIcon from "@mui/icons-material/ContentPaste";
// import HomeIcon from "@mui/icons-material/Home";
// import SettingsIcon from "@mui/icons-material/Settings";

// const iconsStyle = {
//   borderRadius: "5px",
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   color: "black",
//   fontSize: "30px",
//   marginTop: "30px",
//   marginBottom: "10px",
// };
// const menuItems = [
//   {
//     text: "",
//     link: "/pages/dashboard",
//     icon: <HomeIcon style={iconsStyle} />,
//   },
//   {
//     text: "",
//     link: "/pages/dashboard/listBusiness",
//     icon: <BusinessTwoToneIcon style={iconsStyle} />,
//   },
//   {
//     text: "",
//     link: "/pages/dashboard/listClient",
//     icon: <GroupsIcon style={iconsStyle} />,
//   },
//   {
//     text: "",
//     link: "/pages/dashboard/listProject",
//     icon: <ContentPasteIcon style={iconsStyle} />,
//   },
//   {
//     text: "",
//     link: "/pages/dashboard/registerTime",
//     icon: <MoreTimeIcon style={iconsStyle} />,
//   },
//   {
//     text: "",
//     link: "/pages/dashboard/settings",
//     icon: <SettingsIcon style={iconsStyle} />,
//   },
// ];

// export const mainListItems = (
//     <>

//       <Drawer variant="permanent" sx={{ width: 100, flexShrink: 0 }}>
//         <List>
//           {menuItems.map((item, index) => (
//             <Link key={index} href={item.link}>
//               <Tooltip title={item.text}>
//                 <ListItemButton sx={{ width: "100%" }}>
//                   <ListItemIcon>{item.icon}</ListItemIcon>
//                   <ListItemText primary={item.text} style={iconsStyle}></ListItemText>
//                 </ListItemButton>
//               </Tooltip>
//             </Link>
//           ))}
//         </List>
//       </Drawer>
//     </>
//   );
