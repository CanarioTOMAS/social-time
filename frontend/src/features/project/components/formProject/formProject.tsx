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
import { getLocalStorageValue } from "@/auth/services/session.service";

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

  const { data, error, loading, refetch } = useQuery(
    QueryClientService.clients,
    {
      variables: {
        id: getLocalStorageValue("business"),
      },
    }
  );

  // useEffect(() => {
  //   // getSessionBusiness();
  //   setIdBusiness(getLocalStorageValue("business"));
  // }, []);

  const onSubmit = handleSubmit(async (values) => {
    console.log(values);
    await CreateProject({
      variables: {
        name: values.name,
        description: values.description,
        client: values.idClient,
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
          <FormControl  className="w-1/2 p-2">
            <InputLabel>Client</InputLabel>
            <Select
              className="p-1"
              label="Client"
              sx={{ m: 1, width: "41.7ch" }}
              {...(errors.idClient?.type === "required" && {
                helperText: "Campo Obligatorio",
                error: true,
              })}
              {...register("idClient")}
            >
              {data &&
                data.findUserBusiness[0].client.map((item: any) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
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
