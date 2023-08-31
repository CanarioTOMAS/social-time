import { Delete, Edit } from "@mui/icons-material";
import {
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

function ItemProject(props: Props) {
  const { data, error, loading, refetch } = useQuery(
    ProjectQueryService.Project
  );
  const [showAlert, setShowAlert] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const [DeleteProject] = useMutation(ProjectMutationServices.DeleteProject);
  refetch();
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
    await DeleteProject({ variables: { id: props.project.id } });
    toastShow({
      message: "El cliente ha sido eliminado correctamente",
      severity: "success",
      duration: 5000,
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
          {/* <Avatar src={image} alt={props.project.Image} /> */}
        </ListItemAvatar>

        <ListItemText
          primary={props.project?.name}
          secondary={`user: ${props.project?.user}, `}
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
          <FormProjectComponent
            project={props.project}
            id={undefined} /*onClose={() => {
              setIsEditDialogOpen(false);
            }}*/
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
