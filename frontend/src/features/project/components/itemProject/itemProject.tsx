"use client";

import { Delete, Edit } from "@mui/icons-material";
import {
  Avatar,
  Box,
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
import { IProject } from "../../model/project";
import { useToast } from "@/features/shared/components/toast/ToastProvider";
import DeleteDialog from "@/features/shared/components/dialog/DelectDialog";
import FormProjectComponent from "../formProject/formProject";
import { ProjectQueryService } from "../../projectService/projectQuery/projectQuery.service";
import { ProjectMutationServices } from "../../projectService/projectMutation/projectMutation.service";

type Props = {
  project: IProject;
  buttonAction?: boolean;
};

function ItemProject({ project, buttonAction }: Props) {
  const { data, error, loading, refetch } = useQuery(
    ProjectQueryService.Project,
    {
      variables: {
        idClient: project.clientId,
      },
    }
  );
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [DeleteProject] = useMutation(ProjectMutationServices.DeleteProject);
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
    toastShow({
      message: "El proyecto ha sido eliminado correctamente",
      severity: "success",
    });
    await DeleteProject({ variables: { id: project.id } });
    refetch();
  };

  const handleCloseEditDialog = async () => {
    setIsEditDialogOpen(false);
  };

  const clientDetails = data?.findUserBusiness[0]?.client[0];

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <ListItemAvatar>
          <Avatar src={project?.Image} />
        </ListItemAvatar>
        <ListItemText
          primary={`Name: ${project?.name}`}
          secondary={
            <>
              <span>
                Cliente: {clientDetails?.name} {clientDetails?.surname}
              </span>
              <br />
              <span>Description: {project?.description}</span>
            </>
          }
          primaryTypographyProps={{ sx: { color: "#000" } }}
        />
        {buttonAction ? (
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}
          >
            <IconButton edge="end" aria-label="editar" onClick={handleEdit}>
              <Edit />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="eliminar"
              onClick={handleDelete}
            >
              <Delete />
            </IconButton>
          </Box>
        ) : null}
      </Box>
      <DeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirmed}
        title="¿Está seguro que desea eliminar este proyecto?"
        message="Se eliminará de forma permanente "
        confirmText="Eliminar"
        cancelText="Cancelar"
      />
      <Dialog open={isEditDialogOpen} onClose={handleCloseEditDialog}>
        <DialogContent>
          <FormProjectComponent
            project={project}
            client={clientDetails}
            id={undefined}
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

export default ItemProject;
