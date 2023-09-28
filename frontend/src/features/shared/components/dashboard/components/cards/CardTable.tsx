import React from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import PropTypes from "prop-types";
import TableDropdown from "../Dropdowns/TableDropdown";

interface CardTableProps {
  color?: "light" | "dark";
}

export default function CardTable({ color = "light" }: CardTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className={`px-6 py-3 text-xs uppercase font-semibold ${color === "light" ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100" : "bg-blueGray-600 text-blueGray-200 border-blueGray-500"}`}>
              Project
            </TableCell>
            <TableCell className={`px-6 py-3 text-xs uppercase font-semibold ${color === "light" ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100" : "bg-blueGray-600 text-blueGray-200 border-blueGray-500"}`}>
              Budget
            </TableCell>
            <TableCell className={`px-6 py-3 text-xs uppercase font-semibold ${color === "light" ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100" : "bg-blueGray-600 text-blueGray-200 border-blueGray-500"}`}>
              Status
            </TableCell>
            <TableCell className={`px-6 py-3 text-xs uppercase font-semibold ${color === "light" ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100" : "bg-blueGray-600 text-blueGray-200 border-blueGray-500"}`}>
              Users
            </TableCell>
            <TableCell className={`px-6 py-3 text-xs uppercase font-semibold ${color === "light" ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100" : "bg-blueGray-600 text-blueGray-200 border-blueGray-500"}`}>
              Completion
            </TableCell>
            <TableCell className={`px-6 py-3 text-xs uppercase font-semibold ${color === "light" ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100" : "bg-blueGray-600 text-blueGray-200 border-blueGray-500"}`}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projects.map((project, index) => (
            <TableRow key={index}>
              <TableCell className="px-6 py-4">
                <div className="flex items-center">
                  <img src={project.image} alt="..." className="h-12 w-12 bg-white rounded-full border" />
                  <span className={`ml-3 font-bold ${color === "light" ? "text-blueGray-600" : "text-white"}`}>
                    {project.name}
                  </span>
                </div>
              </TableCell>
              <TableCell className="px-6 py-4">
                {project.budget}
              </TableCell>
              <TableCell className="px-6 py-4">
                <i className={`fas fa-circle ${project.statusColor} mr-2`}></i> {project.status}
              </TableCell>
              <TableCell className="px-6 py-4">
                <div className="flex">
                  {project.users.map((user, userIndex) => (
                    <img key={userIndex} src={user} alt="..." className={`w-10 h-10 rounded-full border-2 border-blueGray-50 shadow ${userIndex > 0 ? "-ml-4" : ""}`} />
                  ))}
                </div>
              </TableCell>
              <TableCell className="px-6 py-4">
                <div className="flex items-center">
                  <span className="mr-2">{project.completionPercentage}%</span>
                  <div className="relative w-full">
                    <div className="overflow-hidden h-2 text-xs flex rounded bg-red-200">
                      <div style={{ width: `${project.completionPercentage}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"></div>
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="px-6 py-4 text-right">
                <TableDropdown />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

CardTable.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};

const projects = [
  {
    name: "Argon Design System",
    budget: "$2,500 USD",
    statusColor: "text-orange-500",
    status: "pending",
    completionPercentage: 60,
    image: "/img/bootstrap.jpg",
    users: ["/img/team-1-800x800.jpg", "/img/team-2-800x800.jpg", "/img/team-3-800x800.jpg", "/img/team-4-470x470.png"],
  },
  {
    name: "Angular Now UI Kit PRO",
    budget: "$1,800 USD",
    statusColor: "text-emerald-500",
    status: "completed",
    completionPercentage: 100,
    image: "/img/angular.jpg",
    users: ["/img/team-1-800x800.jpg", "/img/team-2-800x800.jpg", "/img/team-3-800x800.jpg", "/img/team-4-470x470.png"],
  },
  {
    name: "Black Dashboard Sketch",
    budget: "$3,150 USD",
    statusColor: "text-red-500",
    status: "delayed",
    completionPercentage: 73,
    image: "/img/sketch.jpg",
    users: ["/img/team-1-800x800.jpg", "/img/team-2-800x800.jpg", "/img/team-3-800x800.jpg", "/img/team-4-470x470.png"],
  },
  {
    name: "React Material Dashboard",
    budget: "$4,400 USD",
    statusColor: "text-teal-500",
    status: "on schedule",
    completionPercentage: 90,
    image: "/img/react.jpg",
    users: ["/img/team-1-800x800.jpg", "/img/team-2-800x800.jpg", "/img/team-3-800x800.jpg", "/img/team-4-470x470.png"],
  },
  {
    name: "React Material Dashboard",
    budget: "$2,200 USD",
    statusColor: "text-emerald-500",
    status: "completed",
    completionPercentage: 100,
    image: "/img/vue.jpg",
    users: ["/img/team-1-800x800.jpg", "/img/team-2-800x800.jpg", "/img/team-3-800x800.jpg", "/img/team-4-470x470.png"],
  },
];
