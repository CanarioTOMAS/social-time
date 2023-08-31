"use client";

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
import { QueryClientService } from "../../services/clientQuery/clientQuery.services";
import { ClientMutationServices } from "../../services/clientMutation/clientMutation";

type Props = {
  client: IClient;
  buttonAction?: boolean;
};

function ItemClient(props: Props) {
  const { data, error, loading, refetch } = useQuery(
    QueryClientService.clients
  );
  const [showAlert, setShowAlert] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [deleteClient] = useMutation(
    ClientMutationServices.DeleteClient
  );
  refetch();
  const handleEdit = async () => {
    setIsEditDialogOpen(true);
  };

  const handleDelete: MouseEventHandler<HTMLButtonElement> = () => {
    setIsDeleteDialogOpen(true);
  };

  const toastShow = useToast();
  console.log(props);
  console.log(data);
  const handleDeleteConfirmed: MouseEventHandler<
    HTMLButtonElement
  > = async () => {
    setIsDeleteDialogOpen(false);
    setShowAlert(true);
    console.log(props);
    await deleteClient({ variables: { id: props.client.id } });
    toastShow({
      message: "El cliente ha sido eliminado correctamente",
      severity: "success",
    });
    refetch();
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
          primary={`Name: ${props.client.name} ${props.client.surname}`}
          secondary={`Email: ${props.client.email}, Phone: ${props.client.phone}`}
          primaryTypographyProps={{ sx: { color: "#000" } }}
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
