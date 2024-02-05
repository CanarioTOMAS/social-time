"use client";

import React, { useState } from "react";
import {
  Box,
  Card,
  FormControl,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { useForm } from "react-hook-form";
import FormControlClient from "@/features/shared/components/FormControl/formControlClient";
import FormControlProject from "@/features/shared/components/FormControl/formControlProject";
import { IActivities } from "../../model/Activitie";
import { useMutation } from "@apollo/client";
import { MutationActivitie } from "../../service/ActivitiesMutation/MutationActivities";
import { useToast } from "@/features/shared/components/toast/ToastProvider";
import FormControlUser from "@/features/shared/components/FormControl/formControlUser";

export default function ActivityForm() {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IActivities>();
  const [createActivitie, { error }] = useMutation(
    MutationActivitie.createActivitie
  );
  const { toastShow } = useToast();

  const onSubmit = handleSubmit(async (values) => {
    try {
      console.log("Datos a enviar:", {
        name: values.name,
        description: values.description,
        project: selectedProject,
        client: selectedClient,
        user: selectedUser,
        tiempoEstimado: values.tiempoEstimado,
      });
      
      await createActivitie({
        variables: {
          name: values.name,
          description: values.description,
          project: selectedProject.toString(),
          client: selectedClient.toString(),
          user: selectedUser.toString(),
          tiempoEstimado: values.tiempoEstimado,
        },
      });
  
      toastShow({
        message: "Actividad ha sido creado correctamente",
        severity: "success",
      });
      reset();
    } catch (error: any) {
      console.error("Error during mutation:", error);
  
      // Añade esta parte para identificar errores específicos
      if (error.graphQLErrors) {
        error.graphQLErrors.forEach((graphQLError: { message: any; extensions: any; }) => {
          console.error("GraphQL Error:", graphQLError.message);
          if (graphQLError.extensions) {
            console.error("Extensions:", graphQLError.extensions);
          }
        });
      }
  
      toastShow({
        message: "Error al crear la actividad",
        severity: "error",
      });
    }
  });
  
  const [selectedClient, setSelectedClient] = useState<string>("");
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<string>("");

  const handleProjectChange = (projectId: string) => {
    // Puedes realizar acciones adicionales al cambiar el proyecto, si es necesario
    console.log("Proyecto seleccionado:", projectId);
    setSelectedProject(projectId);
  };
  return (
    <Box
      className="bg-blue-500 text-white p-4"
      component="form"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Card sx={{ textAlign: "center", alignItems: "center", pb: 1 }}>
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          className="text-xl text-center mb-4"
        >
          Nueva Actividad
        </Typography>

        <FormControl sx={{ m: 1, width: "100ch" }}>
          <TextField
            className="w-1/2 p-2"
            sx={{ m: 1, width: "100ch" }}
            label="Nombre de la actividad"
            variant="outlined"
            type="text"
            {...register("name", { required: true })}
          />
          {errors.name && <span>Este campo es obligatorio</span>}
          <FormControlClient setSelectedClient={setSelectedClient} />
          <FormControlProject
            setSelectedProject={setSelectedProject}
            onProjectChange={handleProjectChange} // Pasa la función como prop
          />
          <FormControlUser setSelectedUser={setSelectedUser} />
          <TextField
            className="w-1/2 p-2"
            sx={{ m: 1, width: "100ch" }}
            label="Descripción"
            multiline
            rows={4}
            {...register("description", { required: true })}
            {...(errors.description?.type === "required" && {
              helperText: "Campo Obligatorio",
              error: true,
            })}
          />
          <TextField
            className="w-1/2 p-2"
            sx={{ m: 1, width: "100ch" }}
            label="Tiempo Estimaddo"
            variant="outlined"
            type="text"
            {...register("tiempoEstimado", { required: true })}
            {...(errors.tiempoEstimado?.type === "required" && {
              helperText: "Campo Obligatorio",
              error: true,
            })}
          />
          
          <Button
            className="bg-blue-500 text-white p-2 mt-4"
            type="submit"
            onClick={onSubmit}
            variant="contained"
          >
            Enviar
          </Button>
        </FormControl>
      </Card>
    </Box>
  );
}
