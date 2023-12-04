"use client";

import { useQuery } from "@apollo/client";
import {
  Box,
  Card,
  CircularProgress,
  FormControl,
  Typography,
} from "@mui/material";
import { IProject } from "../../model/project";
import { ListItems } from "@/features/shared/components/listItem/ListItem";
import ItemProject from "../itemProject/itemProject";
import { ProjectQueryService } from "../../projectService/projectQuery/projectQuery.service";
import SearchAppBar from "@/features/shared/components/search/search";
import { ChangeEvent, useState } from "react";

export const ListProjectComponent = () => {
  const [searchQuery, setSearchQuery] = useState(""); //manejo de busqueda
  const [Project, setProject] = useState<IProject[]>([]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
 
    if (event.target.value == "") {
      let business = data.findUserBusiness[0]
      setProject(business.Project);
      return;
    }

    setProject(
      Project.filter((item: IProject) => {
        if (item.name.toLowerCase().includes(searchQuery.toLowerCase()))
          return item;
      })
    );
  };
  const { data, error, loading, refetch } = useQuery(
    ProjectQueryService.Project
  );

  //const projects = data?.findUserBusiness[0]?.client[0]?.project;



  return (
    <Box
      className="bg-blue-500 text-white p-4"
      component="form"
      sx={{
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        margin: "auto",
      }}
    >

      <Card
        sx={{
          textAlign: "center",
          alignItems: "center",
          width: "80vh",
          margin: "auto",
        }}
      >
                        <SearchAppBar
            handleSearchChange={handleSearchChange}
          />
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          className="text-xl text-center mb-4"
        >
          Lista de Proyectos
        </Typography>
        <FormControl sx={{ alignItems: "center" }}>
          {!loading && data && data.findUserBusiness? (
            <ListItems
              items={Project}
              renderItem={(item: IProject) => (
                <div key={item.id}>
                  <ItemProject project={item} buttonAction={true} />
                </div>
              )}
              handleItemClick={function (item: IProject): IProject {
                console.log(item);
                return item;
                //handleItemDelete(item.id);
              }}
            ></ListItems>
          ) : (
            <CircularProgress />
          )}
        </FormControl>
      </Card>
    </Box>
  );
};

export default ListProjectComponent;
