import React, { useState } from "react";
import Link from "next/link";
import { Avatar, Drawer, Grid, IconButton, Tooltip } from "@mui/material";
import BusinessTwoToneIcon from "@mui/icons-material/BusinessTwoTone";
import MoreTimeIcon from "@mui/icons-material/MoreTime";
import GroupsIcon from "@mui/icons-material/Groups";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";

const Sidebar: React.FC = () => {
  return (
    <>
      <Drawer variant="permanent" sx={{ width: 240, flexShrink: 0 }}>
        <div>
          <div>
            <div>
              <Avatar />
              <span></span>
              <Link href="/pages/dashboard">
                <Tooltip title="Home" arrow>
                  <div>
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
                  <div>
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
                  <div>
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
                  <div>
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
                  <div>
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
                  <div>
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
          <main></main>
        </div>
      </Drawer>
    </>
  );
};

export default Sidebar;
