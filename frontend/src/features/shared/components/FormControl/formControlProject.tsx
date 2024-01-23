import { getSessionServices } from '@/auth/services/session.service';
import { ProjectQueryService } from '@/features/project/projectService/projectQuery/projectQuery.service';
import register from '@/features/user/register';
import { useQuery } from '@apollo/client';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import React from 'react'
import { useForm } from 'react-hook-form';

export default function FormControlProject({
  setSelectedProject,
}: {
  setSelectedProject: React.Dispatch<React.SetStateAction<string>>;
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
          id: getSessionServices("business"), // Asumiendo que esto es válido
          idClient: getSessionServices("client"), // Asumiendo que esto es válido
        },
      });
      console.log("Datos de la consulta de proyectos:", projectData);
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
      }}
    >
      {projectData?.findOneBusiness?.client[0]?.project.map((item: any) => (
        <MenuItem key={item.id} value={item.id}>
          {item.name} {item.surname}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
  )
}
