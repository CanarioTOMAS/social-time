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
import { useEffect, useState } from "react";
import router from "next/router";
import { getSessionServices } from "@/auth/services/session.service";
import { IClient } from "@/features/client/models/Client";

export const ListProjectComponent = () => {
  const [searchQuery, setSearchQuery] = useState(""); // Manejo de búsqueda
  const [projects, setProjects] = useState<IProject[]>([]);
  const [clientId, setClientId] = useState<string | null>(null);

  // Función para manejar cambios en el ID del cliente en el localStorage
  const handleClientIdChange = () => {
    const newClientId = getSessionServices("clients"); // Obtiene el ID del cliente del localStorage
    console.log("New client ID:", newClientId);
    setClientId(newClientId); // Actualiza el estado local de clientId
  };

  useEffect(() => {
    // Agrega un event listener para manejar los cambios en el ID del cliente
    if (typeof window !== "undefined") {
      window.addEventListener("storage", handleClientIdChange);
      const initialClientId = getSessionServices("clients"); // Obtiene el ID del cliente al cargar la página
      setClientId(initialClientId); // Establece el ID del cliente al cargar la página
    }

    // Remueve el event listener cuando el componente se desmonta
    return () => {
      window.removeEventListener("storage", handleClientIdChange);
    };
  }, []);

  // Consulta para obtener los proyectos del cliente
  const { data, error, loading, refetch } = useQuery(
    ProjectQueryService.Project,
    {
      variables: {
        idClient: clientId, // Utiliza el ID del cliente para la consulta
      },
    }
  );

  // Actualiza los proyectos cuando cambia la data
  useEffect(() => {
    if (data && data.findUserBusiness) {
      const clientData = data.findUserBusiness[0]?.client[0];
      if (clientData && clientData.id === clientId) {
        // Verifica si el cliente es el mismo del estado local
        setProjects(clientData.project); // Actualiza la lista de proyectos
      } else {
        setProjects([]); // Limpia la lista de proyectos si el cliente cambia
      }
    }
  }, [data, clientId]);
  console.log(data);

  // Vuelve a ejecutar la consulta cuando cambia el ID del cliente
  useEffect(() => {
    if (clientId) {
      refetch({ variables: { idClient: clientId } }); // Refresca los datos cuando cambia el cliente
    }
  }, [clientId]);

  // Función para manejar cambios en la búsqueda
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value); // Actualiza la búsqueda
  };

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
        <SearchAppBar handleSearchChange={handleSearchChange} />
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          className="text-xl text-center mb-4"
        >
          Lista de Proyectos
        </Typography>
        <FormControl sx={{ alignItems: "center" }}>
          {loading ? (
            <CircularProgress /> // Muestra indicador de carga mientras se obtienen los datos
          ) : data ? (
            <ListItems
              items={
                data?.findUserBusiness?.[0]?.client
                  ?.find((client: IClient) => client.id === clientId)
                  ?.project?.filter((item: IProject) =>
                    item.name.toLowerCase().includes(searchQuery.toLowerCase())
                  ) || []
              }
              renderItem={(item: IProject) => (
                <ItemProject project={item} buttonAction={true} />
              )}
              handleItemClick={(item: IProject) => {
                if (typeof window !== "undefined" && clientId) {
                  localStorage.setItem("projects", item.id); // Guarda el ID del proyecto en el localStorage
                  // router.push("/pages/createClient"); // Redirecciona al dashboard
                }
                return item;
              }}
            />
          ) : (
            <p>Error al obtener proyectos...</p> // Maneja posibles errores
          )}
        </FormControl>
      </Card>
    </Box>
  );
};

export default ListProjectComponent;
