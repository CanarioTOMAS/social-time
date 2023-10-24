"use client";
import React from "react";
import CardPage from "./components/cards/CardPage";
import CardLineChart from "./components/cards/CardLineChart";
import CardProfile from "./components/cards/CardProfile";
import SearchAppBar from "../search/search";


export default function DashboardComponent() {
  const style = {
    backgroundColor: "#3b82f6",
  };
  return (
    <>
      <div className="flex flex-wrap" style={style}>


        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardLineChart />
        </div>
        <div className="w-full xl:w-4/12 mb-12 xl:mb-0 px-4">
          <CardProfile />
        </div>
        <div className="w-full xl:w-4/12 px-4">
        <CardPage />
        </div>
      </div>
    </>
  );
}
