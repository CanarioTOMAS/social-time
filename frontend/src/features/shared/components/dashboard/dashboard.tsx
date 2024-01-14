"use client";
import React from "react";
import CardPage from "./components/cards/CardPage";
import CardLineChart from "./components/cards/CardLineChart";
import CardProfile from "./components/cards/CardProfile";

export default function DashboardComponent() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "auto auto auto",
        gap: "1rem",
        backgroundColor: "lightblue",
        padding: "10rem",
        marginTop:"-4rem"
      }}
    >
      <CardLineChart/>
      <CardProfile />
      <CardPage />
    </div>
  );
}
