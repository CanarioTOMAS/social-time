"use client"

import { IUser } from "@/app/model/user";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { Box, Card, Typography, FormControl, TextField, InputAdornment, IconButton, Button } from "@mui/material";
import React, {  } from "react";
import { useForm } from "react-hook-form";



export default function  FormRegister () {

    
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<IUser>();

  

  const onSubmit = handleSubmit((values) => {
   
  });

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <div>
    <Box
      component="form"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        textAlign:"center",
        margin:5
      }}
      onSubmit={onSubmit}
    >
      <Card sx={{ pb: 5,alignItems: "center", }}>
        <Typography variant="h1">Registro</Typography>
        <FormControl sx={{alignItems: "center"}}>
          
        <TextField
        id="Name"
            label="Name"
            sx={{ m: 1, width: "25ch" }}
            type="text"
            {...register("name", {
              required: true,
              minLength: 2,
            })}
            {...(errors.name?.type === "required" && {
              helperText: "Campo obligatorio",
              error: true,
            })}
            {...(errors.name?.type === "minLength" && {
              helperText: "El nombre es demasiado corto",
              error: true,
            })}
          />
          <TextField
            id="phone"
            label="Phone"
            sx={{ m: 1, width: "25ch" }}
            type="tel"
            {...register("phone", {
              required: true,

              minLength: 2,
            })}
            {...(errors.phone?.type === "required" && {
              helperText: "Campo obligatorio",
              error: true,
            })}
            {...(errors.phone?.type === "minLenght" && {
              helperText: "Campo obligatorio",
              error: true,
            })}
          />
          <TextField
          id="address"
            label="Home address"
            sx={{ m: 1, width: "25ch" }}
            type="text"
            {...register("homeAddress", {
              required: true,

              minLength: 2,
            })}
            {...(errors.homeAddress?.type === "required" && {
              helperText: "Campo obligatorio",
              error: true,
            })}
            {...(errors.homeAddress?.type === "minLength" && {
              helperText: "La dirección es demasiado corta",
              error: true,
            })}
          />
          <TextField
          id="email"
            label="Email"
            sx={{ m: 1, width: "25ch" }}
            type="email"
            {...register("email", {
              required: true,
              pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              minLength: 2,
            })}
            {...(errors.email?.type === "required" && {
              helperText: "Campo obligatorio",
              error: true,
            })}
            {...(errors.email?.type === "pattern" && {
              helperText: "Ingrese un email válido",
              error: true,
            })}
          />
          <TextField
          id="password"
            sx={{ m: 1, width: "25ch" }}
            type={showPassword ? "text" : "password"}
            label="Password"
            {...register("password", {
              required: true,

              minLength: 2,
            })}
            {...(errors.password?.type === "required" && {
              helperText: "Campo obligatorio",
              error: true,
            })}
            {...(errors.password?.type === "minLength" && {
              helperText: "La contraseña es demasiado corta",
              error: true,
            })}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
          id="confirmPassword"
            sx={{ m: 1, width: "25ch" }}
            type={showPassword ? "text" : "password"}
            label="Confirm Password"
            {...register("confirmPassword", {
              required: true,
              minLength: 2,
              validate: (value) => value === getValues("password"),
            })}
            {...(errors.confirmPassword?.type === "required" && {
              helperText: "Campo obligatorio",
              error: true,
            })}
            {...(errors.confirmPassword?.type === "validate" && {
              helperText: "Las contraseñas deben coincidir",
              error: true,
            })}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          /> 
          <Button
            sx={{ m: 1, width: "43ch" }}
            onClick={onSubmit}
            // className={style.submit}
            variant="contained"
          >
            Submit
          </Button>
       
        </FormControl>
      </Card>
    </Box>
    </div>
  );
};


