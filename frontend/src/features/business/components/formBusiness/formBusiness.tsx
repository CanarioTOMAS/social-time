import { Box, Button, Card, Input, TextField, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { useForm, SubmitHandler, set } from "react-hook-form";
import { useMutation, useQuery } from "@apollo/client";
// import { useParams } from "react-router-dom";
// import {
//   getSessionServices,
//   setSessionService,
// } from "../../../../auth/services/session.service";
// import { BusinessMutationServices } from "../../services/businessMutation/businessMutation.service";
import { IBusiness } from "../../model/business";
import { useToast } from "@/features/shared/components/toast/ToastProvider";
import ProfileForm from "@/features/shared/components/avatar/Avatar";

type Props = {
  business: IBusiness | undefined;
  onClose?: () => void;
};

export default function FormBusinessComponent(props: Props) {
  const { toastShow } = useToast();
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
      businessCategory: "",
      email: "",
      image: "",
      phone: "",
      touched: "",
    },
  });

  //   const { id } = useParams();
  //   const [mutateFunction] = useMutation(
  //     id
  //       ? BusinessMutationServices.UpdateBusiness
  //       : BusinessMutationServices.AddBusiness
  //   );

  //   const idBusiness = getSessionServices("business");
  //   console.log(idBusiness);

  const onSubmit = handleSubmit(async (values: any) => {
    console.log(values);
    // const response = await mutateFunction({
    //   variables: {
    //     name: values.name,
    //     address: values.address,
    //     email: values.email,
    //     category: values.businessCategory,
    //     image: values.image,
    //   },
    // });
    reset();
    toastShow({
      message: "La Empresa ha sido creado correctamente",
      severity: "success",
      duration: 5000,
    });

    //     setSessionService("business", response.data.addBusiness._id);
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
    >
      <Card sx={{ textAlign: "center", alignItems: "center", pb: 1 }}>
        <Typography variant="h3">Crear Empresa</Typography>
        <FormControl sx={{ alignItems: "center" }}>
          <ProfileForm
            avatarType="business"
            onChange={function (data: any): void {
              setValue("image", data);
            }}
            defaultImage={props.business?.image ? props.business.image : ""}
          />
          <TextField
            sx={{ m: 1, width: "25ch" }}
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
            sx={{ m: 1, width: "25ch" }}
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
              helperText: "El nombre es demasiado corto",
              error: true,
            })}
          />
          <TextField
            sx={{ m: 1, width: "25ch" }}
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
              helperText: "El nombre es demasiado corto",
              error: true,
            })}
          />
          <TextField
            sx={{ m: 1, width: "25ch" }}
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
              helperText: "El nombre es demasiado corto",
              error: true,
            })}
          />
          <TextField
            sx={{ m: 1, width: "25ch" }}
            label="Business Category"
            variant="outlined"
            type="text"
            {...register("businessCategory", {
              required: true,
              minLength: 2,
            })}
            {...(errors.businessCategory?.type === "required" && {
              helperText: "Campo obligatorio",
              error: true,
            })}
            {...(errors.businessCategory?.type === "minLength" && {
              helperText: "El nombre es demasiado corto",
              error: true,
            })}
          />
          <Button
            sx={{ m: 1, width: "43ch" }}
            onClick={onSubmit}
            variant="contained"
          >
            Enviar
            {/* { {id ? "Editar" : "Crear"}} */}
          </Button>
        </FormControl>
      </Card>
    </Box>
  );
}
