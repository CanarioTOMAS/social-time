import { getSessionServices } from "@/auth/services/session.service";
import { useQuery } from "@apollo/client";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import getUserById from "../../services/userServices/useQuery";

export default function FormControlUser() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const {
    data: userData,
    loading: userLoading,
    error: userError,
  } = useQuery(getUserById, {
    variables: {
      id: getSessionServices("user"),
    },
  });
  console.log("Datos de la consulta de usuario:", userData);

  return (
    <FormControl className="w-1/2 p-2">
      <InputLabel>Ususario</InputLabel>
      <Select
        className="p-1"
        label="Proyecto"
        sx={{ m: 1, width: "41.7ch" }}
        {...(errors.user?.type === "required" && {
          helperText: "Campo Obligatorio",
          error: true,
        })}
        {...register("user")}
      >
        {userData?.findOneBusiness?.user.map((item: any) => (
          <MenuItem key={item.id} value={item.id}>
            {item.name} {item.surname}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
