import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { IRegisterTime } from "../../model/registerTime";
import { useForm } from "react-hook-form";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ClientServices } from "@/features/client/services/clientServices";
import { IClient } from "@/features/client/models/Client";
import { RegisterTimeMutation } from "../../services/registerTime.services";

export default function FormRegisterTime() {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IRegisterTime>();
  const [mutateFunction, { loading, error, data }] = useMutation(
    RegisterTimeMutation.createRegisterTime
  );

  const [startTimeValue, setStartTimeValue] = React.useState<Dayjs | null>(
    dayjs()
  );

  const [endTimeValue, setEndTimeValue] = React.useState<Dayjs | null>(
    dayjs("")
  );

  const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(
    dayjs() // Inicializa con la fecha actual
  );

  const [totalHours, setTotalHours] = React.useState<number>(0);

  const onSubmit = handleSubmit(async (values) => {
    if (startTimeValue && endTimeValue) {
      const startTime = startTimeValue;
      const endTime = endTimeValue;
  
      // Validación para asegurarse de que la hora final sea posterior a la hora inicial
      if (endTime.isBefore(startTime)) {
        // Muestra un mensaje de error o realiza la lógica adecuada
        console.error("La hora final debe ser posterior a la hora inicial.");
        return; // Detiene la ejecución del onSubmit
      }
  
      const durationHours = endTime.diff(startTime, "hour");
      const durationMinutes = endTime.diff(startTime, "minute") % 60;
  
      if (!isNaN(durationHours) && !isNaN(durationMinutes)) {
        const total = durationHours + durationMinutes / 60;
        setTotalHours(total);
        console.log(values);
        await mutateFunction({
          variables: {
            client: "64dfb911d33d47eb27d40131",
            user: "64dfb76dd33d47eb27d40125",
            name: "Hello",
            date: selectedDate?.format("DD-MM-YYYY") || "",
            startTime: startTime.format("HH:mm:ss"),
            endTime: endTime.format("HH:mm:ss"),
            description:values.description,
            totalHours: total,
          },
        });
      } else {
        // Manejo de error si no se pueden calcular las horas correctamente
        console.error("No se pudo calcular la duración de las horas.");
      }
    } else {
      // Muestra un mensaje de error o realiza la lógica adecuada
      console.error("Debes seleccionar una hora de inicio y una hora de final.");
    }
  });

  const hours = Math.floor(totalHours);
  const minutes = Math.round((totalHours - hours) * 60);
  const itemList = [
    { id: 1, name: "Elemento 1" },
    { id: 2, name: "Elemento 2" },
    { id: 3, name: "Elemento 3" },
  ];
  
  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;
  return (
    <div>
      <Box
        component="form"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "10vh",
          marginTop: 10,
        }}
        onSubmit={onSubmit}
      >
        <Card sx={{ p: 1, minWidth: "20em", textAlign: "center" }}>
          <Typography variant="h3" sx={{ textAlign: "center" }}>
            Register Time
          </Typography>
          <Box>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Activity</InputLabel>
              <Select
                label="Activity"
                // value={activity}
                // onChange={handleSelectChange}
              >
                {itemList.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box>
          <TextField
            label="Descripción"
            sx={{ m: 1 }}
            type="text"
            {...register("description", {
              required: true,
              minLength: 2,
            })}
            {...(errors.description?.type === "required" && {
              helperText: "Campo obligatorio",
              error: true,
            })}
            {...(errors.description?.type === "minLength" && {
              helperText: "El nombre es demasiado corto",
              error: true,
            })}
            />
          </Box>
          <br />
          <Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Fecha"
                value={selectedDate}
                onChange={(newValue) => setSelectedDate(newValue)}
              />
            </LocalizationProvider>
          </Box>
          <br />
          <Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                label="Hora de inicio"
                value={startTimeValue}
                onChange={(newValue) => setStartTimeValue(newValue)}
              />
              <TimePicker
                label="Hora fin"
                value={endTimeValue}
                onChange={(newValue) => setEndTimeValue(newValue)}
              />
            </LocalizationProvider>
          </Box>
          <Box>
            <Typography variant="body1">
              Total Hours: {hours} hours {minutes} minutes
            </Typography>
          </Box>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{ p: "3%" }}
          >
            <Button type="submit" variant="contained" onClick={onSubmit}>
              Enviar Registro
            </Button>
          </Grid>
        </Card>
      </Box>
    </div>
  );
}
