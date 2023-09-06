"use client";

import { Box, Button, Card, Input, TextField, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import { IBusiness } from "../../model/business";
import { useToast } from "@/features/shared/components/toast/ToastProvider";
import ProfileForm from "@/features/shared/components/avatar/Avatar";
import { businessMutationService } from "../../services/businessMutation";
import {
  getSessionServices,
  setSessionService,
} from "@/auth/services/session.service";
import { useEffect, useState } from "react";

type Props = {
  business: IBusiness | undefined;
  onClose?: () => void;
};

export default function FormBusinessComponent(props: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const idBusiness = getSessionServices("business");
  const [resetKey, setResetKey] = useState(0);
  const { id } = useParams();
  const [createBusiness] = useMutation(businessMutationService.createBusiness);
  const [updateBusiness] = useMutation(businessMutationService.updateBusiness);
  const { toastShow } = useToast();
  const [showAlert, setShowAlert] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IBusiness>({
    defaultValues: {
      name: "",
      address: "",
      category: "",
      email: "",
      image: "",
      phone: "",
      touched: "",
    },
  });

  useEffect(() => {
    if (props && props.business) {
      setIsEditing(true);
      setValue("name", props.business.name);
      setValue("address", props.business.address);
      setValue("category", props.business.category);
      setValue("email", props.business.email);
      setValue("image", props.business.image);
      setValue("phone", props.business.phone);
      setValue("touched", props.business.touched);
    }
  }, [props.business]);

  const onSubmit = handleSubmit(async (values) => {
    const response = await createBusiness({
      variables: {
        name: values.name,
        address: values.address,
        email: values.email,
        category: values.category,
        image: values.image,
        phone: values.phone,
      },
    });
    toastShow({
      message: "La empresa ha sido creado correctamente",
      severity: "success",
    });
    setSessionService("business", response.data.addBusiness._id);
    reset({
      name: "",
      phone: "",
      email: "",
      address: "",
      category: "",
      image: "",
    });
    setResetKey((prevKey) => prevKey + 1);
  });

  const onUpdate = handleSubmit(async (values) => {
    if (!props.business) return;
    console.log(values);
    await updateBusiness({
      variables: {
        id: props.business._id,
        name: values.name,
        address: values.address,
        email: values.email,
        category: values.category,
        image: values.image,
        phone: values.phone,
      },
    });
    if (props.onClose) props.onClose();
    setShowAlert(true);
    toastShow({
      message: "La empresa ha sido editada correctamente",
      severity: "success",
    });
  });

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
          Crear Empresa
        </Typography>
        <FormControl sx={{ alignItems: "center" }}>
          <ProfileForm
            avatarType="business"
            onChange={function (data: any): void {
              setValue("image", data);
            }}
            defaultImage={props.business?.image ? props.business.image : ""}
            resetKey={resetKey}
          />
          <TextField
            className="w-1/2 p-2"
            sx={{ m: 1, width: "43ch" }}
            label="Business Name"
            variant="outlined"
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
            className="w-1/2 p-2"
            sx={{ m: 1, width: "43ch" }}
            label="Phone"
            variant="outlined"
            type="tel"
            {...register("phone", {
              required: true,
              minLength: 2,
            })}
            {...(errors.phone?.type === "required" && {
              helperText: "Campo obligatorio",
              error: true,
            })}
            {...(errors.phone?.type === "minLength" && {
              helperText: "El teléfono es demasiado corto",
              error: true,
            })}
          />
          <TextField
            className="w-1/2 p-2"
            sx={{ m: 1, width: "43ch" }}
            label="Email"
            variant="outlined"
            type="email"
            {...register("email", {
              required: true,
              minLength: 2,
            })}
            {...(errors.email?.type === "required" && {
              helperText: "Campo obligatorio",
              error: true,
            })}
            {...(errors.email?.type === "minLength" && {
              helperText: "El email es demasiado corto",
              error: true,
            })}
          />
          <TextField
            className="w-1/2 p-2"
            sx={{ m: 1, width: "43ch" }}
            label="Address"
            variant="outlined"
            type="text"
            {...register("address", {
              required: true,
              minLength: 2,
            })}
            {...(errors.address?.type === "required" && {
              helperText: "Campo obligatorio",
              error: true,
            })}
            {...(errors.address?.type === "minLength" && {
              helperText: "El dirección es demasiado corto",
              error: true,
            })}
          />
          <TextField
            className="w-1/2 p-2"
            sx={{ m: 1, width: "43ch" }}
            label="Business Category"
            variant="outlined"
            type="text"
            {...register("category", {
              required: true,
              minLength: 2,
            })}
            {...(errors.category?.type === "required" && {
              helperText: "Campo obligatorio",
              error: true,
            })}
            {...(errors.category?.type === "minLength" && {
              helperText: "El nombre es demasiado corto",
              error: true,
            })}
          />
          {!isEditing ? (
            <Button
              className="bg-blue-500 text-white p-2 mt-4"
              sx={{ width: "47.7ch", m: 1 }}
              type="submit"
              onClick={onSubmit}
              variant="contained"
            >
              Crear
            </Button>
          ) : (
            <Button
              className="bg-blue-500 text-white p-2 mt-4"
              sx={{ width: "47.7ch", m: 1 }}
              type="submit"
              onClick={onUpdate}
              variant="contained"
            >
              Guardar
            </Button>
          )}
        </FormControl>
      </Card>
    </Box>
  );
}
