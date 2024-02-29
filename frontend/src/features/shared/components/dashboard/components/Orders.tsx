import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import { Avatar, AvatarGroup } from "@mui/material";

// Generate Order Data
function createData(
  
  projectName: string,
  name: string,
  workHours: number,
  users: string,
  progress: number
) {
  return { projectName, name, workHours, users, progress };
}

const rows = [createData("social-time", "John Smith", 30, "social-time", 100)];

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function Orders() {
  return (
    <React.Fragment>
      <Title>Assigned Projects</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Work Hours</TableCell>
            <TableCell>Project Name</TableCell>
            <TableCell>Progress</TableCell>
            <TableCell>Users</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.projectName}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.workHours} Hs.</TableCell>
              <TableCell>{row.progress} %</TableCell>
              <TableCell>
                {row.users}
                <AvatarGroup max={2}>
                  <Avatar />
                  <Avatar />
                  <Avatar />
                  <Avatar />
                </AvatarGroup>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        Delete Projects
      </Link>
    </React.Fragment>
  );
}
