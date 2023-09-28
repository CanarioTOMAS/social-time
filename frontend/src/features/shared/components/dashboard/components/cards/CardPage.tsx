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
    <Box position="fixed" top="1%" left="6%" width={930}>
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
                  <TableCell>
                    <AvatarGroup max={2}>
                      <Avatar />
                      <Avatar />
                      <Avatar />
                      <Avatar />
                    </AvatarGroup>
                  </TableCell>
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
