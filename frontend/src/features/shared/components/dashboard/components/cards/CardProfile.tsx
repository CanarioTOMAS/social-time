import React from "react";
import { Avatar, Box, Paper, Typography } from "@mui/material";
import "../../style/CardProfile.css";

export default function CardProfile() {
    const usuario = "YOO"
  return (
    <>
      <Box width={400}>
        <Paper
          elevation={1}
          className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16"
        >
          <div className="px-6">
            <div className="flex flex-wrap justify-center">
              <div className="w-full px-4 flex justify-center mt-[-50px]">
                <div className="relative">
                  <Avatar
                    alt="Profile Image"
                    src=""
                    className="custom-avatar"
                    sx={{ width: 100, height: 100 }}
                  ></Avatar>
                </div>
              </div>
              <div className="w-full px-4 text-center">
                <div className="flex justify-center py-4 lg:pt-4 pt-8">
                  <div className="mr-4 p-3 text-center">
                    <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                      22
                    </span>
                    <span className="text-sm text-blueGray-400">Project</span>
                  </div>
                  <div className="mr-4 p-3 text-center">
                    <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                      10
                    </span>
                    <span className="text-sm text-blueGray-400">Client</span>
                  </div>
                  <div className="lg:mr-4 p-3 text-center">
                    <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                      89
                    </span>
                    <span className="text-sm text-blueGray-400">Hours</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <Typography variant="h6" className=" text-blueGray-700 pb-4">
                {usuario}
              </Typography>
            </div>
          </div>
        </Paper>
      </Box>
    </>
  );
}
