"use client"

import { Delete, Edit } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { MouseEventHandler, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { IClient } from "../../models/Client";
import { useToast } from "@/features/shared/components/toast/ToastProvider";
import DeleteDialog from "@/features/shared/components/dialog/DelectDialog";
import FormClient from "../FormClient/FormClient";

type Props = {
  client: IClient;
  buttonAction?: boolean;
};

function ItemClient(props: Props) {
  //const { data, error, loading, refetch } = useQuery(
    //ClientServices.QueryClientService.clients
  //);
  const [showAlert, setShowAlert] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  //const [DeleteClient] = useMutation(
    //ClientServices.ClientMutationServices.DeleteClient
  //);
  //refetch();
  const handleEdit = async () => {
    setIsEditDialogOpen(true);
  };

  const handleDelete: MouseEventHandler<HTMLButtonElement> = () => {
    setIsDeleteDialogOpen(true);
  };

  const { toastShow } = useToast();

  const handleDeleteConfirmed: MouseEventHandler<
    HTMLButtonElement
  > = async () => {
    setIsDeleteDialogOpen(false);
    setShowAlert(true);
    console.log(props);
    //await DeleteClient({ variables: { id: props.client.id } });
    toastShow({
      message: "El cliente ha sido eliminado correctamente",
      severity: "success",
      duration: 5000,
    });
    //refetch();
  };

  const handleCloseEditDialog = async () => {
    console.log(props);
    setIsEditDialogOpen(false);
  };

  return (
    <>
      {" "}
      <>
        <ListItemAvatar>
          <Avatar src={props.client.image} alt={props.client.name} />
        </ListItemAvatar>

        <ListItemText
          primary={props.client.name}
          secondary={`email: ${props.client.email}, phone: ${props.client.phone}`}
        />
        {props.buttonAction == true ? (
          <>
            {" "}
            <IconButton
              edge="end"
              aria-label="editar"
              onClick={() => handleEdit()}
            >
              <Edit />
            </IconButton>
            <IconButton edge="end" aria-label="eliminar" onClick={handleDelete}>
              <Delete />
            </IconButton>
          </>
        ) : null}
      </>
      <DeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirmed}
        title="¿Está seguro que desea eliminar este producto?"
        message="Se eliminará de forma permanente "
        confirmText="Eliminar"
        cancelText="Cancelar"
      />
      <Dialog open={isEditDialogOpen} onClose={handleCloseEditDialog}>
        <DialogContent>
          <FormClient
            client={props.client}
            onClose={() => {
              setIsEditDialogOpen(false);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
export default ItemClient;