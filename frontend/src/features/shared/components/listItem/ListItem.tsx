import { Divider, List, ListItem } from "@mui/material";
import React from "react";

interface IProps {
  items: any[]; // Cambiar el tipo según tu estructura de datos
  renderItem: (item: any) => React.ReactNode;
  handleItemClick: (item: any) => void;
}

export const ListItems = ({ items, renderItem, handleItemClick }: IProps) => {
  return (
    <div>
      <List
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          textAlign: "center",
          margin: "auto",
        }}
      >
        {items.map((item: any, i) => {
          return (
            <div key={item._id}> {/* Usar el campo _id como clave */}
              <ListItem onClick={() => handleItemClick(item)}>
                {renderItem(item)}
              </ListItem>
              <Divider />
            </div>
          );
        })}
      </List>
    </div>
  );
};