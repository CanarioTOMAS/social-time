import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Box, Card, Grid, Typography } from "@mui/material";
import { IProject } from "../../model/project";
import { ListItems } from "@/features/shared/components/listItem/ListItem";
import ItemProject from "../itemProject/itemProject";
import { type } from "os";
import { ProjectQueryService } from "../../projectService/projectQuery/projectQuery.service";

export const ListProjectComponent = () => {
  const { data, error, loading, refetch } = useQuery(
    ProjectQueryService.Project,
  );

  const projects = data;
  console.log(projects);

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
        <Card sx={{ width: "500px", padding: "20px" }}>
          <Grid container spacing={2} direction="column" alignItems="center">
            <Typography variant="h5" align="center" gutterBottom>
              Lista de Proyectos
            </Typography>
            <ListItems
              items={projects}
              renderItem={(item) => (
                <ItemProject project={item} buttonAction={true} />
              )}
              handleItemClick={(item) => {
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
export default ListProjectComponent;
