

import React from "react";
import { Box, Paper } from "@mui/material";
import LineChartComponent from "../Dropdowns/LineChardt";

interface DataItem {
  name: string;
  value: number;
}

export default function CardLineChart() {
    // useEffect(() => {
  //   const config = {
  //     type: "line",
  //     data: {
  //       labels: [
  //         "January",
  //         "February",
  //         "March",
  //         "April",
  //         "May",
  //         "June",
  //         "July",
  //       ],
  //       datasets: [
  //         {
  //           label: String(new Date().getFullYear()),
  //           backgroundColor: "#4c51bf",
  //           borderColor: "#4c51bf",
  //           data: [65, 78, 66, 44, 56, 67, 75],
  //           fill: false,
  //         },
  //         {
  //           label: String(new Date().getFullYear() - 1),
  //           fill: false,
  //           backgroundColor: "#fff",
  //           borderColor: "#fff",
  //           data: [40, 68, 86, 74, 56, 60, 87],
  //         },
  //       ],
  //     },
  //     options: {
  //       maintainAspectRatio: false,
  //       responsive: true,
  //       plugins: {
  //         legend: {
  //           labels: {
  //             color: "white",
  //           },
  //           align: "end",
  //           position: "bottom",
  //         },
  //       },
  //       scales: {
  //         x: {
  //           ticks: {
  //             color: "rgba(255,255,255,.7)",
  //           },
  //           display: true,
  //           grid: {
  //             display: false,
  //           },
  //         },
  //         y: {
  //           ticks: {
  //             color: "rgba(255,255,255,.7)",
  //           },
  //           display: true,
  //           grid: {
  //             display: false,
  //           },
  //         },
  //       },
  //     },
  //   };

  //   const ctx = (
  //     document.getElementById("line-chart") as HTMLCanvasElement
  //   ).getContext("2d");
  //   // window.myLine = new Chart(ctx, config);
  // }, []);

  const data: DataItem[] = [  //projects + horas 
    { name: "Hola", value: 150 },
    { name: "Rio", value: 185 },
    { name: "Mapa", value: 325 },
    { name: "Papa", value: 128 },
    { name: "Messi", value: 200 },
    
  ];

  return (
    <>
      <Box width={900} height="500" style={{ marginTop: "60px", marginLeft: "100px" }}>
        <Paper>
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700">
            <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full max-w-full flex-grow flex-1">
                  <h6 className="uppercase text-blueGray-100 mb-1 text-xs font-semibold">
                    Recorded Time
                  </h6>
                  <h2 className="text-black text-xl font-semibold">
                    Busy Time
                  </h2>
                </div>
              </div>
            </div>
            <div className="p-4 flex-auto">
              <LineChartComponent data={data}/>
                <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">
                Valores:
                </h3>
                <ul>
                  {data.map((item, index) => (
                    <li key={index}>
                      <span>{item.name}:</span> {item.value}
                    </li>
                  ))}
                </ul>
              </div>
              </div>
            </div>
        </Paper>
      </Box>
    </>
  );
}
