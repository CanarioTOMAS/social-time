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

export default function ActivityForm() {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IActivities>();
  const [createActivitie] = useMutation(MutationActivitie.createActivitie);
  const { toastShow } = useToast();

  const onSubmit = handleSubmit(async (values) => {
    await createActivitie({
      variables: {
        name: values.name,
        description: values.description,
        projectId: selectedProject,
        clientId: selectedClient,
        tiempoEsperado: values.tiempoEsperado,
      },
    });
    toastShow({
      message: "Actividad ha sido creado correctamente",
      severity: "success",
    });
    reset();
  });

  const [selectedClient, setSelectedClient] = useState<string>("");
  const [selectedProject, setSelectedProject] = useState<string>("");
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
        <form>
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
            <FormControlProject setSelectedProject={setSelectedProject} />
            <TextField
              className="w-1/2 p-2"
              sx={{ m: 1, width: "100ch" }}
              label="Descripción"
              multiline
              rows={4}
              {...register("description", { required: true })}
            />
            {errors.description && <span>Este campo es obligatorio</span>}

            <TextField
              className="w-1/2 p-2"
              sx={{ m: 1, width: "100ch" }}
              label="Tiempo Esperado"
              variant="outlined"
              type="text"
              {...register("tiempoEsperado", { required: true })}
            />
            {errors.tiempoEsperado && <span>Este campo es obligatorio</span>}
            <Button
              className="bg-blue-500 text-white p-2 mt-4"
              type="submit"
              onClick={onSubmit}
              variant="contained"
            >
              Enviar
            </Button>
          </FormControl>
        </form>
      </Card>
    </Box>
  );
}
