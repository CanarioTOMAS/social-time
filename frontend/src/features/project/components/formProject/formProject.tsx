"use client";

import {
  Box,
  Button,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { useToast } from "@/features/shared/components/toast/ToastProvider";
import { IProject } from "../../model/project";
import { ProjectMutationServices } from "../../projectService/projectMutation/projectMutation.service";
import { useMutation, useQuery } from "@apollo/client";
import { QueryClientService } from "@/features/client/services/clientQuery/clientQuery.services";
import { getSessionServices } from "@/auth/services/session.service";
import FormControlClient from "@/features/shared/components/FormControl/formControlClient";

type Props = {
  id: any;
  project: IProject | undefined;
  onClose?: () => void;
};

export default function FormProjectComponent(props: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const { toastShow } = useToast();
  const [showAlert, setShowAlert] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IProject>({
    defaultValues: {
      name: "",
      description: "",
      idClient: "",
    },
  });
  const [selectedClient, setSelectedClient] = useState<string>("");
  
  useEffect(() => {
    if (props && props.project) {
      setIsEditing(true);
      setValue("name", props.project.name);
      setValue("description", props.project.description);
      setValue("idClient", props.project.idClient);
    }
  }, [props.project]);

  const [CreateProject] = useMutation(ProjectMutationServices.CreateProject);
  const [UpdateProject] = useMutation(ProjectMutationServices.UpdateProject);


  // useEffect(() => {
  //   // getSessionBusiness();
  //   setIdBusiness(getSessionServices("business"));
  // }, []);

  const onSubmit = handleSubmit(async (values) => {
    console.log(values);
    await CreateProject({
      variables: {
        name: values.name,
        description: values.description,
        client: selectedClient,
      },
    });
    toastShow({
      message: "El proyecto ha sido creado correctamente",
      severity: "success",
    });
    reset();
  });

  const onUpdate = handleSubmit(async (values) => {
    if (!props.project) return;
    await UpdateProject({
      variables: {
        name: values.name,
        description: values.description,
        client: values.idClient,
      }
    });
    if (props.onClose) props.onClose();
    setShowAlert(true);
    toastShow({
      message: "El cliente ha sido editado correctamente",
      severity: "success",
    });
  });

  const [client, setClient] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    console.log(event.target.value);
    setClient(event.target.value as string);
  };

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
      ref={formRef}
      alignContent={"center"}
    >
      <Card sx={{ textAlign: "center", alignItems: "center", pb: 1 }}>
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          className="text-xl text-center mb-4"
        >
          Crear Proyecto
        </Typography>
        <FormControl sx={{ textAlign: "center" }}>
          <FormControlClient  setSelectedClient={setSelectedClient}/>
          <TextField
            className="w-1/2 p-2 "
            label="Project"
            variant="outlined"
            sx={{ m: 1, width: "43ch", }}
            type="text"
            {...register("name", {
              required: true,
              minLength: 2,
            })}
            {...(errors.name?.type === "required" && {
              helperText: "Campo Obligatorio",
              error: true,
            })}
          />
          <TextField
            className="w-1/2 p-2"
            label="Description"
            sx={{ m: 1, width: "43ch" }}
            variant="outlined"
            multiline
            minRows={5}
            type="text"
            {...register("description", {
              required: true,
              minLength: 1,
            })}
            {...(errors.description?.type === "required" && {
              helperText: "Campo Obligatorio",
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
              Register
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
