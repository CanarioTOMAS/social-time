"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";

const styles = {
  cardContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  card: {
    width: 400,
    padding: 20,
  },
};

export default function FormRegisterTime() {
  const [Client, setClient] = useState<string | number>("");
  const [Project, setProject] = useState<string | number>("");
  const [openClient, setOpenClient] = useState(false);
  const [openProject, setOpenProject] = useState(false);

  const handleChange = (event: SelectChangeEvent<typeof Client>) => {
    setClient(event.target.value);
  };
  const handleChange2 = (event: SelectChangeEvent<typeof Project>) => {
    setProject(event.target.value);
  };

  const handleClose = () => {
    setOpenClient(false);
    setOpenProject(false);
  };

  const handleOpen = () => {
    setOpenProject(false);
    setOpenClient(false);
  };

  return (
    <>
      <Box>
        <Card style={styles.card}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <h2>Register Time</h2>
            </Grid>

            <Grid item xs={12}>
              <Button sx={{ display: "block", mt: 2 }} onClick={handleOpen}>
                Client
              </Button>
            </Grid>
            <Grid item xs={12}>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-controlled-open-select-label">
                  Client
                </InputLabel>
                <Select
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
                  open={openClient}
                  onClose={handleClose}
                  onOpen={handleOpen}
                  value={Client}
                  label="Client"
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button sx={{ display: "block", mt: 2 }} onClick={handleOpen}>
                Project
              </Button>
            </Grid>
            <Grid item xs={12}>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-controlled-open-select-label">
                  Project
                </InputLabel>
                <Select
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
                  open={openProject}
                  onClose={handleClose}
                  onOpen={handleOpen}
                  value={Project}
                  label="Project"
                  onChange={handleChange2}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                </Select>
                <br />
                <Grid container justifyContent="center">
                  <Typography>Register Time for Project</Typography>
                </Grid>
                <br />
                <Grid container justifyContent="center">
                  <TextField
                    sx={{ m: 1, minWidth: 120 }}
                    id="outlined-basic"
                    label="Horas"
                    variant="outlined"
                  />
                </Grid>
                <br />
                <Grid container justifyContent="center">
                  <Button sx={{ width: 100 }}>Add</Button>
                </Grid>
              </FormControl>
            </Grid>
          </Grid>
        </Card>
      </Box>
    </>
  );
}
