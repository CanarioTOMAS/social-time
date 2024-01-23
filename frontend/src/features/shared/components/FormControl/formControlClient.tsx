import { getSessionServices } from '@/auth/services/session.service';
import { QueryClientService } from '@/features/client/services/clientQuery/clientQuery.services';
import { useQuery } from '@apollo/client';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import React from 'react'
import { useForm } from 'react-hook-form';

export default function FormControlClient({
  setSelectedClient,
}: {
  setSelectedClient: React.Dispatch<React.SetStateAction<string>>;
}) {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
      } = useForm();
      const { data, error, loading, refetch } = useQuery(
        QueryClientService.clients,
        {
          variables: {
            id: getSessionServices("business"),
          },
        }
      );    
  return (
    <FormControl className="w-1/2 p-2">
    <InputLabel>Client</InputLabel>
    <Select
      className="p-1"
      label="Client"
      sx={{ m: 1, width: "41.7ch" }}
      {...(errors.idClient?.type === "required" && {
        helperText: "Campo Obligatorio",
        error: true,
      })}
      {...register("client")}
      onChange={(e) => {
        const selectedValue = e.target.value as string;
        setSelectedClient(selectedValue);
      }}
    >
      {data &&
        data.findOneBusiness.client.map((item: any) => (
          <MenuItem key={item.id} value={item.id}>
            {item.name} {item.surname}
          </MenuItem>
        ))}
    </Select>
  </FormControl>
  )
}
