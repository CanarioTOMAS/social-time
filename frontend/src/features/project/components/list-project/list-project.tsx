import { useMutation, useQuery } from "@apollo/client";

import { ProductService } from "../../productsService/productsService";
import { useEffect, useState } from "react";
import { Box, Card, Grid, Typography } from "@mui/material";

import { IProject } from "../../model/project";
import { ListItems } from "@/features/shared/components/listItem/ListItem";
import ItemProject from "../item-project/itemProject";
import { type } from "os";

export const ListProject = () => {
  const { data, error, loading, refetch } = useQuery(
    ProductService.ProductsQueryService.products
  );

  const projects: IProject[] = [
    {
      id: "1",
      name: "Proyecto A",
      idClient: "cliente1",
      user: "usuario1",
      idProject: "proyecto1",
    },

    {
      id: "2",
      name: "Proyecto B",
      idClient: "cliente2",
      user: "usuario2",
      idProject: "proyecto2",
    },

    {
      id: "3",
      name: "Proyecto C",
      idClient: "cliente3",
      user: "usuario3",
      idProject: "proyecto3",
    },
  ];
  // const projects = data?.findUserBusiness[0]?.project.slice(0, 10);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Card sx={{ width: "500px", padding: "20px", }}>
          <Grid container spacing={2} direction="column" alignItems="center" >
          <Typography variant="h5" align="center" gutterBottom>
            Lista de Proyectos
          </Typography>
            <ListItems
              items={projects}
              renderItem={(item: IProject) => (
                <ItemProject project={item} buttonAction={true} />
              )}
              handleItemClick={function (item: IProject): IProject {
                console.log(item);
                return item;
                //handleItemDelete(item.id);
              }}
            ></ListItems>
          </Grid>
        </Card>
      </Box>
    </>
  );
};
export default ListProject;
