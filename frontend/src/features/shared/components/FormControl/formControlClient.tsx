import { getSessionServices } from '@/auth/services/session.service';
import { QueryClientService } from '@/features/client/services/clientQuery/clientQuery.services';
import { useQuery } from '@apollo/client';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';

interface FormControlClientProps {
  setSelectedClient: React.Dispatch<React.SetStateAction<string>>;
}

export default function FormControlClient({ setSelectedClient }: FormControlClientProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { data:clietnData, error:clientError, loading:clientLoading, refetch } = useQuery(QueryClientService.clients, {
    variables: {
      id: getSessionServices("business"),
    },
  });

  const clients = clietnData?.findOneBusiness?.client || [];

  return (
    <FormControl className="w-1/2 p-2">
      <InputLabel>Cliente</InputLabel>
      <Select
        className="p-1"
        label="Cliente"
        sx={{ m: 1, width: "41.7ch" }}
        {...(errors.client?.type === "required" && {
          helperText: "Campo Obligatorio",
          error: true,
        })}
        {...register("client")}
        onChange={(e) => {
          const selectedValue = e.target.value as string;
          setSelectedClient(selectedValue);
        }}
      >
        {clients.map((item: any) => (
          <MenuItem key={item.id} value={item.id}>
            {item.name} {item.surname}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
