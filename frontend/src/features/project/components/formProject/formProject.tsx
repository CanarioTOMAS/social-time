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

type Props = {
  id: any;
  project: IProject | undefined;
  onClose?: () => void;
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


  // const [mutateFunction] = useMutation(
  // props.project?.id
  // ? ProductService.ProductMutationServices.UpdateProduct
  // : ProductService.ProductMutationServices.AddProduct
  // );

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
          ? "El producto se edito correctamente"
          : "El producto se cargó correctamente",
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
    reset()
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
      className="bg-blue-500 text-white p-4"
      component="form"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
      onSubmit={onSubmit}
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
        <FormControl sx={{textAlign:"center"}}>
          <TextField
            label="User"
            sx={{ m: 1, width: "90%", textAlign:"center" }}
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
            sx={{m: 1, width: "90%", textAlign:"center" }}
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
            sx={{m: 1, width: "90%", textAlign:"center" }}
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
            sx={{m: 1, width: "90%", textAlign:"center" }}
            type="price"
            {...register("name", {
              required: true,
              minLength: 2,
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
function mutateFunction(arg0: { variables: { name: any; idClient: any; idProject: any; user: any; }; }) {
  throw new Error("Function not implemented.");
}

