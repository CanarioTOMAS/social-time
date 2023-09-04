"use client";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { Card, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { useMutation } from "@apollo/client";
import { IClient } from "../../models/Client";
import ProfileForm from "@/features/shared/components/avatar/Avatar";
import { getSessionServices } from "@/auth/services/session.service";
import { ClientMutationServices } from "../../services/clientMutation/clientMutation";
import { useToast } from "@/features/shared/components/toast/ToastProvider";

type Props = {
  client: IClient | undefined;
  onClose?: () => void;
};

export default function FormClientComponent(props: Props) {
  const [idBusiness, setIdBusiness] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [selectedDocumentType, setSelectedDocumentType] = useState("");
  const { toastShow } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IClient>({
    defaultValues: {
      name: "",
      image: "",
      city: "",
      address: "",
      email: "",
      phone: "",
      business: "",
      postCode: "",
      documentType: "",
      documentNumber: "",
      surname: "",
    },
  });

  useEffect(() => {
    if (props && props.client) {
      setIsEditing(true);
      setValue("name", props.client.name);
      setValue("surname", props.client.surname);
      setValue("city", props.client.city);
      setValue("address", props.client.address);
      setValue("email", props.client.email);
      setValue("phone", props.client.phone);
      setValue("postCode", props.client.postCode);
      setValue("documentType", props.client.documentType);
      setValue("documentNumber", props.client.documentNumber);
      setValue("image", props.client.image);
    }
  }, [props.client]);

  const [createClient] = useMutation(ClientMutationServices.CreateClient);
  const [updateClient] = useMutation(ClientMutationServices.UpdateClient);

  useEffect(() => {
    if (getSessionServices("business") == null) {
      console.log("no hay business");
    } else {
      const business_id = getSessionServices("business");
      if (business_id !== null) {
        setIdBusiness(business_id);
      }
    }
  }, []);

  const onSubmit = handleSubmit(async (values) => {
    await createClient({
      variables: {
        name: values.name,
        surname: values.surname,
        email: values.email,
        city: values.city,
        business: idBusiness,
        documentNumber: values.documentNumber,
        documentType: selectedDocumentType,
        postCode: values.postCode,
        address: values.address,
        phone: values.phone,
        image: values.image,
      },
    });
    toastShow({
      message: "El cliente ha sido creado correctamente",
      severity: "success",
    });
    reset();
  });

  const [showAlert, setShowAlert] = useState(false);
  const onUpdate = handleSubmit(async (values) => {
    if (!props.client) return;
    console.log(values);
    await updateClient({
      variables: {
        id: props.client?.id,
        name: values.name,
        surname: values.surname,
        email: values.email,
        city: values.city,
        business: idBusiness,
        documentNumber: values.documentNumber,
        documentType: selectedDocumentType,
        postcode: values.postCode,
        address: values.address,
        phone: values.phone,
        image: values.image,
      },
    });
    if (props.onClose) props.onClose();
    setShowAlert(true);
    toastShow({
      message: "El cliente ha sido editado correctamente",
      severity: "success",
    });
  });

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
      ref={formRef}
      alignContent={"center"}
    >
      <Card sx={{ pb: 1 }}>
        <Typography variant="h5" sx={{ textAlign: "center" }}>
          Client
        </Typography>
        <FormControl>
          <ProfileForm
            avatarType="client"
            onChange={function (data: any): void {
              setValue("image", data);
            }}
            defaultImage={props.client?.image ? props.client.image : ""}
            resetKey={undefined}
          />
          <TextField
            id="Name"
            label="Name"
            sx={{ m: 1 }}
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
            id="Surname"
            label="Surname"
            sx={{ m: 1 }}
            type="text"
            {...register("surname", {
              required: true,
              minLength: 2,
            })}
            {...(errors.surname?.type === "required" && {
              helperText: "Campo obligatorio",
              error: true,
            })}
            {...(errors.surname?.type === "minLength" && {
              helperText: "El nombre es demasiado corto",
              error: true,
            })}
          />
          <FormControl {...register("documentType")}>
            <InputLabel>Document Type</InputLabel>
            <Select
              type="text"
              label="documentType"
              sx={{ m: 1, width: "37.7ch" }}
              value={
                props.client ? props.client.documentType : selectedDocumentType
              }
              onChange={(e) => setSelectedDocumentType(e.target.value)}
            >
              <MenuItem value="cuit">CUIT</MenuItem>
              <MenuItem value="cuil">CUIL</MenuItem>
              <MenuItem value="dni">DNI</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id="N°"
            label="N°"
            sx={{ m: 1 }}
            type="text"
            {...register("documentNumber", {
              required: true,
              minLength: 2,
            })}
            {...(errors.documentNumber?.type === "required" && {
              helperText: "Campo obligatorio",
              error: true,
            })}
            {...(errors.documentNumber?.type === "minLength" && {
              helperText: "El nombre es demasiado corto",
              error: true,
            })}
          />
          <TextField
            id="Adress"
            label="Address"
            sx={{ m: 1 }}
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
              helperText: "El nombre es demasiado corto",
              error: true,
            })}
          />
          <TextField
            id="Email"
            label="Email"
            sx={{ m: 1 }}
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
              helperText: "El nombre es demasiado corto",
              error: true,
            })}
          />
          <TextField
            id="Phone"
            label="Phone"
            sx={{ m: 1 }}
            type="phone"
            {...register("phone", {
              required: true,
              minLength: 9,
            })}
            {...(errors.phone?.type === "required" && {
              helperText: "Campo Obligatorio",
              error: true,
            })}
            {...(errors.phone?.type === "minLength" && {
              helperText: "El nombre es demasiado corto",
              error: true,
            })}
          />
          <TextField
            id="City"
            label="City"
            sx={{ m: 1 }}
            type="text"
            {...register("city", {
              required: true,
              minLength: 2,
            })}
            {...(errors.city?.type === "required" && {
              helperText: "Campo obligatorio",
              error: true,
            })}
            {...(errors.city?.type === "minLength" && {
              helperText: "El nombre es demasiado corto",
              error: true,
            })}
          />
          <TextField
            id="Post Code"
            label="Post Code"
            sx={{ m: 1 }}
            type="text"
            {...register("postCode", {
              required: true,
              minLength: 2,
            })}
            {...(errors.postCode?.type === "required" && {
              helperText: "Campo obligatorio",
              error: true,
            })}
            {...(errors.postCode?.type === "minLength" && {
              helperText: "El nombre es demasiado corto",
              error: true,
            })}
          />
          {!isEditing ? (
            <Button
              sx={{ m: 1, width: "43ch" }}
              type="submit"
              onClick={onSubmit}
              variant="contained"
            >
              Register
            </Button>
          ) : (
            <Button
              sx={{ m: 1, width: "43ch" }}
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
