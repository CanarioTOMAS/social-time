"use client";
import React from "react";
import CardPage from "./components/cards/CardPage";
import CardBarChart from "./components/cards/CardLineChart";
import Sidebar from "./components/sideBar/sideBar";
import CardTable from "./components/cards/CardTable";
import CardSocialTraffic from "./components/cards/CardSocialTrafic";
import CardLineChart from "./components/cards/CardLineChart";
import CardProfile from "./components/cards/CardProfile";

export default function DashboardComponent() {
  return (
    <>
     
      <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardPage />
        </div>
        <div className="w-full xl:w-4/12 mb-12 xl:mb-0 px-4">
          <CardProfile/>
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardLineChart />
        </div>
      </div>
      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4"></div>
        <div className="w-full xl:w-4/12 px-4"></div>
      </div>
    </>
  );
}
