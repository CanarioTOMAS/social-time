"use client";

import { IUser } from "@/app/model/user";
import {
  ToastProvider,
  useToast,
} from "@/features/shared/components/toast/ToastProvider";
import { userMutationService } from "@/features/shared/services/userServices/userMutation";
import { useMutation } from "@apollo/client";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import {
  Box,
  Card,
  Typography,
  FormControl,
  TextField,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";

export default function FormRegister() {
  const toastShow = useToast();
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IUser>();

  const [mutateFunction, { loading, error, data }] = useMutation(
    userMutationService.register
  );
  const router = useRouter();
  const onSubmit = handleSubmit(async (values) => {
    const response = await mutateFunction({
      variables: {
        name: values.name,
        surname: values.surname,
        email: values.email,
        password: values.password,
      },
    });
    reset();
    await toastShow("Usuario Creado", "info");
    router.push("/login");
    console.log(values);
  });

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <ToastProvider>
      <Box
        component="form"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          textAlign: "center",
          margin: 5,
        }}
        onSubmit={onSubmit}
      >
        <Card sx={{ pb: 5, alignItems: "center" }}>
          <Typography variant="h1">Registro</Typography>
          <FormControl sx={{ alignItems: "center" }}>
            <TextField
              id="name"
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
              id="surname"
              label="Surname"
              sx={{ m: 1, width: "25ch" }}
              type="text"
              {...register("surname", {
                required: true,
                minLength: 2,
              })}
              {...(errors.surname?.type === "required" && {
                helperText: "Campo obligatorio",
                error: true,
              })}
              {...(errors.surname?.type === "minLenght" && {
                helperText: "El apellido es demasiado corto",
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
            <Link href="/pages/login">
              <Button
                sx={{ m: 1, width: "43ch" }}
                onClick={onSubmit}
                //className={style.submit}
                variant="contained"
              >
                Submit
              </Button>
            </Link>
          </FormControl>
        </Card>
      </Box>
    </ToastProvider>
  );
}
