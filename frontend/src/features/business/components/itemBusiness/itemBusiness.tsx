import { Delete, Edit } from "@mui/icons-material";
import React, {
  Avatar,
  IconButton,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import { IBusiness } from "../../model/business";


function ItemBusiness(props: IBusiness) {

  return (
    <>
      <ListItemAvatar>
        <Avatar />
      </ListItemAvatar>
      <ListItemText
        primary={props.name}
        secondary={`email: ${props.email},phone: ${props.phone}, address: ${props.address}`}
      />
      <ListItemSecondaryAction>

        <IconButton edge="end" aria-label="editar">
          <Edit />
        </IconButton>
        <IconButton edge="end" aria-label="eliminar">
          <Delete />
        </IconButton>

      </ListItemSecondaryAction>
    </>
  );
}
export default ItemBusiness;