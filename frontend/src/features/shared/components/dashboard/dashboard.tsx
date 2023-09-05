"use client"
import React from "react";
import CardPage from "./components/cards/CardPage";
import CardSocialTraffic from "./components/cards/CardSocialTraffic";
import CardBarChart from "./components/cards/CardBarChart";
import Sidebar from "./components/sideBar/sideBar";





export default function DashboardComponent() {
  
  return (
    <>
    <Sidebar />
      <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          {/* <CardPage /> */}
        </div>
        <div className="w-full xl:w-4/12 px-4">
{/* <CardBarChart/> */}
        </div>
      </div>
      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
        </div>
        <div className="w-full xl:w-4/12 px-4">
          {/* <CardSocialTraffic /> */}
        </div>
      </div>
    </>
  );
}


