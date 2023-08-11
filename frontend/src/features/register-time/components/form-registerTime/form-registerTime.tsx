import { Box, Card, Typography, TextField, Button, Grid, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { IRegisterTime } from "../../model/registerTime";
import { useForm } from "react-hook-form";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import React from "react";

export default function FormRegisterTime() {
  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };
  const [value, setValue] = React.useState<Dayjs | null>(
    dayjs("2022-04-17T15:30")
  );

  const [endTimeValue, setEndTimeValue] = React.useState<Dayjs | null>(
    dayjs("2022-04-17T16:30")
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterTime>();

  const onSubmit = handleSubmit((values) => {
    const formData = {
      activity: values.activity,
      startTime: value?.format(),
      endTime: endTimeValue?.format(),
      totalHours: values.totalHours,
    };

    console.log(formData); // Aquí puedes ver los valores antes de enviarlos
  });

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
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Age"
                onChange={handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker label="Fecha" />
            </LocalizationProvider>
          </Box>
          <br />
          <Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                label="Hora de inicio"
                defaultValue={dayjs("2022-04-17T15:30")}
              />
              <TimePicker
                label="Hora fin"
                value={endTimeValue}
                onChange={(newValue) => setEndTimeValue(newValue)}
              />
            </LocalizationProvider>
          </Box>
          <Box>
            <TextField
              InputProps={{}}
              InputLabelProps={{
                shrink: true,
              }}
              label="Horas Totales"
              sx={{ m: 1, width: "25ch" }}
              type="text"
              {...register("totalHours", {
                required: true,
              })}
            />
          </Box>

          <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{ p: "3%" }}
          >
            <Button type="submit" variant="contained">
              Enviar Registro
            </Button>
          </Grid>
        </Card>
      </Box>
    </div>
  );
}
