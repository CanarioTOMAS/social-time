"use client";

import React, { useState } from "react";
import {
  Box,
  Card,
  FormControl,
  TextField,
  Typography,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControlLabel,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  FormGroup,
  DialogActions,
} from "@mui/material";
import { useForm } from "react-hook-form";

const options = [
  { id: "project1", name: "Proyecto 1" },
  { id: "project2", name: "Proyecto 2" },
  { id: "project3", name: "Proyecto 3" },
];

const clients = [
  { id: "client1", name: "Cliente 1" },
  { id: "client2", name: "Cliente 2" },
  { id: "client3", name: "Cliente 3" },
];

const users = [
  { id: "user1", name: "Usuario 1" },
  { id: "user2", name: "Usuario 2" },
  { id: "user3", name: "Usuario 3" },
];

export default function ActivityForm() {
  const [open, setOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  const handleUserToggle = (userId: string) => {
    setSelectedUsers((prevSelectedUsers) => {
      if (prevSelectedUsers.includes(userId)) {
        return prevSelectedUsers.filter((id: string) => id !== userId);
      } else {
        return [...prevSelectedUsers, userId];
      }
    });
  };

  const onSubmit = (data: any) => {
    data.selectedUsers = selectedUsers;
    console.log(data);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        textAlign: "center",
      }}
    >
      <Card>
        <Typography variant="h4">Nuevo Registro de Actividad</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl sx={{ m: 1, width: "100ch" }}>
            <TextField
              label="Nombre de la actividad"
              variant="outlined"
              type="text"
              {...register("activityName", { required: true })}
            />
            {errors.activityName && <span>Este campo es obligatorio</span>}
          </FormControl>
          <FormControl sx={{ m: 1, width: "100ch" }}>
            <TextField
              label="Descripción"
              variant="outlined"
              type="tel"
              {...register("description", { required: true })}
            />
            {errors.description && <span>Este campo es obligatorio</span>}
          </FormControl>
          <FormControl sx={{ m: 1, width: "100ch" }}>
            <TextField
              label="Tiempo total"
              variant="outlined"
              type="text"
              {...register("totalTime", { required: true })}
            />
            {errors.totalTime && <span>Este campo es obligatorio</span>}
          </FormControl>
          <FormControl sx={{ m: 1, width: "100ch" }}>
            <InputLabel>Cliente</InputLabel>
            <Select {...register("clients", { required: true })}>
              {clients.map((clients) => (
                <MenuItem key={clients.id} value={clients.id}>
                  {clients.name}
                </MenuItem>
              ))}
            </Select>
            {errors.project && <span>Este campo es obligatorio</span>}
          </FormControl>
          <FormControl sx={{ m: 1, width: "100ch" }}>
            <InputLabel>Proyecto</InputLabel>
            <Select {...register("project", { required: true })}>
              {options.map((project) => (
                <MenuItem key={project.id} value={project.id}>
                  {project.name}
                </MenuItem>
              ))}
            </Select>
            {errors.project && <span>Este campo es obligatorio</span>}
          </FormControl>
          <FormControl sx={{ m: 1, width: "100ch" }}>
            <Button onClick={handleDialogOpen}>Seleccionar Usuarios</Button>
            <Dialog open={open} onClose={handleDialogClose}>
              <DialogTitle>Seleccionar Usuarios</DialogTitle>
              <DialogContent>
                <FormGroup>
                  {users.map((user) => (
                    <FormControlLabel
                      key={user.id}
                      control={
                        <Checkbox
                          checked={selectedUsers.includes(user.id)}
                          onChange={() => handleUserToggle(user.id)}
                        />
                      }
                      label={user.name}
                    />
                  ))}
                </FormGroup>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleDialogClose} color="primary">
                  Cancelar
                </Button>
                <Button onClick={handleDialogClose} color="primary">
                  Aceptar
                </Button>
              </DialogActions>
            </Dialog>
            {selectedUsers.length > 0 && (
              <div>
                {selectedUsers.map((userId) => (
                  <li key={userId}>{userId}</li>
                ))}
              </div>
            )}
            <Button type="submit">Enviar</Button>
          </FormControl>
        </form>
      </Card>
    </Box>
  );
}
