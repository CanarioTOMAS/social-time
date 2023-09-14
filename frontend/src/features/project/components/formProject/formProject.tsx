"use client";
import {
  Box,
  Button,
  Card,
  FormControl,
<<<<<<< HEAD
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
=======
>>>>>>> 6908c53edbcce83ea00fde1a84085cadb6ce33be
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
  // onEdit: () => void;
  // onAdd: () => void;
};

export default function FormProjectComponent(props: Props) {
  const [isEditing, setIsEditing] = useState(false);
<<<<<<< HEAD
  const { toastShow } = useToast();
  const [showAlert, setShowAlert] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
=======
>>>>>>> 6908c53edbcce83ea00fde1a84085cadb6ce33be
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
<<<<<<< HEAD

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
=======
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
>>>>>>> 6908c53edbcce83ea00fde1a84085cadb6ce33be
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
<<<<<<< HEAD

  const [client, setClient] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    console.log(event.target.value);
    setClient(event.target.value as string);
  };
=======
>>>>>>> 6908c53edbcce83ea00fde1a84085cadb6ce33be

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
<<<<<<< HEAD
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
=======
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
>>>>>>> 6908c53edbcce83ea00fde1a84085cadb6ce33be
            {...register("name", {
              required: true,
              minLength: 2,
            })}
            {...(errors.name?.type === "required" && {
              helperText: "Campo Obligatorio",
              error: true,
            })}
          />
<<<<<<< HEAD
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
=======
          <Button
            sx={{ m: 1, width: "43ch" }}
            onClick={onSubmit}
            variant="contained"
          >
            Submit
          </Button>
>>>>>>> 6908c53edbcce83ea00fde1a84085cadb6ce33be
        </FormControl>
      </Card>
    </Box>
  );
}
function mutateFunction(arg0: { variables: { name: any; idClient: any; idProject: any; user: any; }; }) {
  throw new Error("Function not implemented.");
}

