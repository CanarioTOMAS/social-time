import { getSessionServices } from "@/auth/services/session.service";
import { ProjectQueryService } from "@/features/project/projectService/projectQuery/projectQuery.service";
import { useQuery } from "@apollo/client";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";

export default function FormControlProject({
  setSelectedProject,
  onProjectChange, // Prop recibida del componente padre
}: {
  setSelectedProject: React.Dispatch<React.SetStateAction<string>>;
  onProjectChange: (projectId: string) => void; // Prop recibida del componente padre
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const {
    data: projectData,
    loading: projectLoading,
    error: projectError,
  } = useQuery(ProjectQueryService.Project, {
    variables: {
      id: getSessionServices("business"),
      idClient: getSessionServices("client"),
    },
  });

  const projects = projectData?.findOneBusiness?.client[0]?.project || [];

  return (
    <FormControl className="w-1/2 p-2">
      <InputLabel>Proyecto</InputLabel>
      <Select
        className="p-1"
        label="Proyecto"
        sx={{ m: 1, width: "41.7ch" }}
        {...(errors.project?.type === "required" && {
          helperText: "Campo Obligatorio",
          error: true,
        })}
        {...register("project")}
        onChange={(e) => {
          const selectedValue = e.target.value as string;
          setSelectedProject(selectedValue);
          onProjectChange(selectedValue); // Llamando a la prop recibida
        }}
      >
        {projects.map((item: any) => (
          <MenuItem key={item.id} value={item.id}>
            {item.name} {item.surname}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
