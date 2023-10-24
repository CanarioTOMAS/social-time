import React from "react";
import {
  Avatar,
  AvatarGroup,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const CardPageVisits: React.FC = () => {

  return (
    <Box width={900} style={{ marginTop: "0px", marginLeft: "100px", marginBottom:"0px" }}>
      <Paper elevation={3} style={{ width: "100%", height: "100%" }}>
        <Box p={3}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6" fontWeight="bold">
              Projects
            </Typography>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Project Name</TableCell>
                  <TableCell>Work Hours</TableCell>
                  <TableCell>Users</TableCell>
                  <TableCell>Progress</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>/argon/</TableCell>
                  <TableCell>4,569</TableCell>
                  <div className="flex items-center"> 
                      <AvatarGroup max={2}>
                        <Avatar />
                        <Avatar />
                        <Avatar />
                        <Avatar />
                      </AvatarGroup>
                    </div>
                  <TableCell>
                    <Typography variant="inherit" color="success">
                      <i className="fas fa-arrow-up text-emerald-500 mr-4"></i>
                      46.53%
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Paper>
    </Box>
  );
};

export default CardPageVisits;
