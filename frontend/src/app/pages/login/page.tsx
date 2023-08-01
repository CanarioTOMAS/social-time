"use client";

import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import style from "./styleFormLogin.module.css";
import { Card } from "@mui/material";
import { useForm } from "react-hook-form";

interface FormData {
  Email: string;
  Password: string;
}
export default function FormLogin() {
  const [showPassword, setShowPassword] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };
  const onSubmit = handleSubmit((values) => {
    alert(JSON.stringify(values));
  });

  return (
    <div className={style.Body}>
      <Card sx={{ p: 5 }}>
        <img
          className={style.logoSocial}
          src="https://socialup.com.ar/wp-content/uploads/2021/11/logo-blanco-135x71.png"
          alt=""
        />
        <Box>
          <TextField
            id="email"
            label="Email"
            sx={{ m: 1, width: "25ch" }}
            {...register("Email", {
              required: true,
              pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              minLength: 2,
            })}
            {...(errors.Email?.type === "required" && {
              helperText: "Campo obligatorio",
              error: true,
            })}
            {...(errors.Email?.type === "pattern" && {
              helperText: "Ingrese un email válido",
              error: true,
            })}
          />
        </Box>
        <Box>
          <TextField
            id="password"
            sx={{ m: 1, width: "25ch" }}
            type={showPassword ? "text" : "password"}
            label="Password"
            {...register("Password", {
              required: true,

              minLength: 2,
            })}
            {...(errors.Password?.type === "required" && {
              helperText: "Campo obligatorio",
              error: true,
            })}
            {...(errors.Password?.type === "minLength" && {
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
        </Box>
        <Box>
          <Button
            sx={{ m: 1 }}
            variant="contained"
            endIcon={<SendIcon />}
            onClick={onSubmit}
          >
            Sign In
          </Button>
        </Box>
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Grid>
          <Link
            sx={{ m: 1 }}
            className={style.forgotPassword}
            href="/forgotPassword"
            variant="body2"
            color="#6b0040"
          >
            Forgot password?
          </Link>
        </Grid>
        <Grid item>
          <Link
            sx={{ m: 1 }}
            href="/register"
            variant="body2"
            underline="none"
            color="#6b0040"
          >
            Don't have an account?
          </Link>
          <Link
            href="/register"
            variant="subtitle1"
            color="#92213c"
            underline="hover"
          >
            {"Sign Up"}
          </Link>
        </Grid>
      </Card>
    </div>
  );
}
