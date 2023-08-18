"use client";
import {
  Box,
  Button,
  Card,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useToast } from "@/features/shared/components/toast/ToastProvider";
import { IProject } from "../../model/project";
import { ProjectMutationServices } from "../../projectService/projectMutation/projectMutation.service";
import { useMutation } from "@apollo/client";

type Props = {
  id: any;
  project: IProject | undefined;
  // onEdit: () => void;
  // onAdd: () => void;
};

export default function FormProjectComponent(props: Props) {
  const [isEditing, setIsEditing] = useState(false);
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

  const [mutateFunction] = useMutation(
    props.project?.id
      ? ProjectMutationServices.UpdateProject
      : ProjectMutationServices.CreateProject
  );

  const { toastShow } = useToast();

  // useEffect(() => {
  //   // getSessionBusiness();
  //   setIdBusiness(getSessionServices("business"));
  // }, []);
  const onSubmit = handleSubmit(async (values: any) => {
    console.log(props.project?.id);
    try {
      if (props.project?.id) {
        await handleEditSubmit(values);
      } else {
        await handleAddSubmit(values);
      }
      toastShow({
        message: isEditing
          ? "El proyecto se edito correctamente"
          : "El proyecto se cargó correctamente",
        severity: "success",
        duration: 5000,
      });
    } catch (error) {
      toastShow({
        message: "Error al realizar la operación",
        severity: "error",
        duration: 5000,
      });
    }
    reset();
  });

  const handleAddSubmit = handleSubmit(async (values: any) => {
    console.log(values);
    await mutateFunction({
      variables: {
        name: values.name,
        idClient: values.idClient,
        idProject: values.idProject,
        user: values.user,
      },
    });
    // props.onAdd();
    reset();
  });
  const handleEditSubmit = handleSubmit(async (values: any) => {
    console.log(values);
    await mutateFunction({
      variables: {
        name: values.name,
        idClient: values.idClient,
        idProject: values.idProject,
        user: values.user,
      },
    });
    // props.onEdit();
    setIsEditing(false);
  });

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
      onSubmit={onSubmit}
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
          <TextField
            label="Client"
            sx={{ m: 1, width: "90%", textAlign: "center" }}
            type="text"
            {...register("idClient", {
              required: true,
              minLength: 2,
            })}
            {...(errors.idClient?.type === "required" && {
              helperText: "Campo Obligatorio",
              error: true,
            })}
          />
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
          <Button
            sx={{ m: 1, width: "43ch" }}
            onClick={onSubmit}
            variant="contained"
          >
            Submit
          </Button>
        </FormControl>
      </Card>
    </Box>
  );
}

