"use client";

import {
  Box,
  Button,
  Card,
  FormControl,
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

type Props = {
  id: any;
  project: IProject | undefined;
  onClose?: () => void;
};

export default function FormProjectComponent(props: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const { toastShow } = useToast();
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
      idClient: "",
      user: "",
      idProject: "",
    },
  });

  useEffect(() => {
    if (props && props.project) {
      setIsEditing(true);
      setValue("name", props.project.name);
      setValue("idClient", props.project.idClient);
      setValue("user", props.project.user);
      setValue("idProject", props.project.idProject);
    }
  }, [props.project]);

  const [CreateProject] = useMutation(ProjectMutationServices.CreateProject);
  const [UpdateProject] = useMutation(ProjectMutationServices.UpdateProject);

  const { data, error, loading, refetch } = useQuery(
    QueryClientService.clients,
    {
      variables: {
        id: getSessionServices("business"),
      },
    }
  );

  // useEffect(() => {
  //   // getSessionBusiness();
  //   setIdBusiness(getSessionServices("business"));
  // }, []);

  const onSubmit = handleSubmit(async (values) => {
    console.log(values);
    await CreateProject({
      variables: {
        name: values.name,
        client: values.idClient,
        description: values.idProject,
      },
    });
    toastShow({
      message: "El proyecto ha sido creado correctamente",
      severity: "success",
    });
    reset();
  });

  const [showAlert, setShowAlert] = useState(false);
  const onUpdate = handleSubmit(async (values) => {
    if (!props.project) return;
    console.log(values);
    await UpdateProject({
      variables: {
        name: values.name,
        idClient: values.idClient,
        user: values.user,
        idProject: values.idProject,
      },
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
    setClient(event.target.value as string);
  };

  return (
    <Box
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
      <Card sx={{ pb: 1 }}>
        <Typography variant="h5" sx={{ textAlign: "center" }}>
          Project
        </Typography>
        <FormControl sx={{ textAlign: "center" }}>
          <TextField
            label="User"
            sx={{ m: 1, width: "90%", textAlign: "center" }}
            type="text"
            {...register("user", {
              required: true,
              minLength: 2,
            })}
            {...(errors.user?.type === "required" && {
              helperText: "Campo Obligatorio",
              error: true,
            })}
          />
          <Select
            label="Client"
            id="demo-simple-select"
            sx={{ m: 1, width: "90%", textAlign: "center" }}
            {...register("idClient", {
              required: true,
              minLength: 2,
            })}
            {...(errors.idClient?.type === "required" && {
              helperText: "Campo Obligatorio",
              error: true,
            })}
            onChange={handleChange}
            value={client}
          >
            {data &&
              data.findUserBusiness[0].client.map((item: any) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
          </Select>
          <TextField
            label="Project"
            sx={{ m: 1, width: "90%", textAlign: "center" }}
            type="text"
            {...register("idProject", {
              required: true,
              minLength: 2,
            })}
            {...(errors.idProject?.type === "required" && {
              helperText: "Campo Obligatorio",
              error: true,
            })}
          />
          <TextField
            label="Name"
            sx={{ m: 1, width: "90%", textAlign: "center" }}
            type="price"
            {...register("name", {
              required: true,
              minLength: 1,
            })}
            {...(errors.name?.type === "required" && {
              helperText: "Campo Obligatorio",
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
