"use client";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import {
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
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
  const [createClient] = useMutation(ClientMutationServices.CreateClient);
  const [updateClient] = useMutation(ClientMutationServices.UpdateClient);
  const [showAlert, setShowAlert] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const {toastShow} = useToast();
  
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

  // useEffect(() => {
  //   alert("Please enter");
  //   toastShow({
  //     message: "El cliente ha sido creado correctamente",
  //     severity: "success",
  //   });
  //   },[]);

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

  useEffect(() => {
    if (getSessionServices("business") == null) {
      console.log("no hay business");
    } else {
      const business_id = getSessionServices("business");
      console.log(business_id)
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
      message: "El Cliente ha sido creado correctamente",
      severity: "success",
    });
    reset();
   
  });

  const onUpdate = handleSubmit(async (values) => {
    if (!props.client) return;
    console.log(values);
    await updateClient({
      variables: {
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
      className="bg-blue-500 text-white p-4"
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
      <Card sx={{ textAlign: "center", alignItems: "center", pb: 1 }}>
        {!isEditing ? (
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            className="text-xl text-center mb-4"
          >
            Crear Cliente
          </Typography>
        ) : (
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            className="text-xl text-center mb-4"
          >
            Editar Cliente
          </Typography>
        )}
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
            className="w-43 p-2"
            id="Name"
            label="Name"
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
            id="Surname"
            label="Surname"
            sx={{ width: "43ch", m: 1 }}
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
          <FormControl {...register("documentType")} className="w-1/2 p-2">
            <InputLabel>Document Type</InputLabel>
            <Select
              type="text"
              label="documentType"
              sx={{ width: "41.7ch", m: 1 }}
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
            className="w-1/2 p-2"
            id="N°"
            label="N°"
            sx={{ width: "43ch", m: 1 }}
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
            className="w-1/2 p-2"
            id="Adress"
            label="Address"
            sx={{ width: "43ch", m: 1 }}
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
            className="w-1/2 p-2"
            id="Email"
            label="Email"
            sx={{ width: "43ch", m: 1 }}
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
            className="w-1/2 p-2"
            id="Phone"
            label="Phone"
            sx={{ width: "43ch", m: 1 }}
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
            className="w-1/2 p-2"
            id="City"
            label="City"
            sx={{ width: "43ch", m: 1 }}
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
            className="w-1/2 p-2"
            id="Post Code"
            label="Post Code"
            sx={{ width: "43ch", m: 1 }}
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
              className="bg-blue-500 text-white p-2 mt-4"
              type="submit"
              onClick={onSubmit}
              variant="contained"
            >
              Register
            </Button>
          ) : (
            <Button
              className="bg-blue-500 text-white p-2 mt-4"
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
