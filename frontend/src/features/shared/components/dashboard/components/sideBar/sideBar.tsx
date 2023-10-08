import React, { useState } from "react";
import Link from "next/link";
import { Avatar, Grid, IconButton, Tooltip } from "@mui/material";
import BusinessTwoToneIcon from "@mui/icons-material/BusinessTwoTone";
import MoreTimeIcon from "@mui/icons-material/MoreTime";
import GroupsIcon from "@mui/icons-material/Groups";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";


const Sidebar: React.FC = () => {
  return (
    <div className="flex">
      <div className="fixed w-20 h-screen p-4 bg-white border-r-[1px] flex flex-col justify-between sidebar-container">
        <div className="flex flex-col items-center">
          <Avatar />
          <span className="border-b-[1px] border-gray-200 w-full p-2"></span>
          <Link href="/pages/dashboard">
            <Tooltip title="Home" arrow>
              <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block">
                <Grid container sx={{ color: "text.primary" }}>
                  <Grid item xs={4}>
                  <HomeIcon />
                  </Grid>
                </Grid>
              </div>
            </Tooltip>
          </Link>
          <Link href="/pages/dashboard/listBusiness">
            <Tooltip title="Business" arrow>
              <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block">
                <Grid container sx={{ color: "text.primary" }}>
                  <Grid item xs={4}>
                    <BusinessTwoToneIcon />
                  </Grid>
                </Grid>
              </div>
            </Tooltip>
          </Link>
          <Link href="/pages/dashboard/listClient">
            <Tooltip title="Clients" arrow>
              <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block">
                <Grid container sx={{ color: "text.primary" }}>
                  <Grid item xs={4}>
                    <GroupsIcon />
                  </Grid>
                </Grid>
              </div>
            </Tooltip>
          </Link>
          <Link href="/pages/dashboard/listProject">
            <Tooltip title="Project" arrow>
              <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block">
                <Grid container sx={{ color: "text.primary" }}>
                  <Grid item xs={4}>
                    <ContentPasteIcon />
                  </Grid>
                </Grid>
              </div>
            </Tooltip>
          </Link>
          <Link href="/pages/bashboard/registerTime">
            <Tooltip title="Register Time" arrow>
              <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block">
                <Grid container sx={{ color: "text.primary" }}>
                  <Grid item xs={4}>
                    <MoreTimeIcon />
                  </Grid>
                </Grid>
              </div>
            </Tooltip>
          </Link>
          <Link href="/pages/dashboard/settings">
            <Tooltip title="Settings" arrow>
              <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block">
                <Grid container sx={{ color: "text.primary" }}>
                  <Grid item xs={4}>
                    <SettingsIcon />
                  </Grid>
                </Grid>
              </div>
            </Tooltip>
          </Link>
        </div>
      </div>
      <main className="ml-20 w-full"></main>
    </div>
  );
};

export default Sidebar;
