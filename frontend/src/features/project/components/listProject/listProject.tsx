"use client";

import { useQuery } from "@apollo/client";
import { Typography } from "@mui/material";
import { IProject } from "../../model/project";
import { ListItems } from "@/features/shared/components/listItem/ListItem";
import ItemProject from "../itemProject/itemProject";
import { ProjectQueryService } from "../../projectService/projectQuery/projectQuery.service";

export const ListProjectComponent = () => {
  const { data, error, loading, refetch } = useQuery(
    ProjectQueryService.Project
  );

  console.log(data);

  const projects = data?.findUserBusiness[0]?.client[0]?.project;

  return (
    <>
      <Typography variant="h5" align="center" gutterBottom>
        Lista de Proyectos
      </Typography>
      {!loading && data && data.findUserBusiness ? (
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
      ) : (
        <></>
      )}
    </>
  );
};

export default ListProjectComponent;
