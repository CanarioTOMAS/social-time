"use client";

import { useQuery } from "@apollo/client";
import { IClient } from "../../models/Client";
import ItemClient from "../ItemClient/ItemClient";
import { ListItems } from "@/features/shared/components/listItem/ListItem";
import { QueryClientService } from "../../services/clientQuery/clientQuery.services";
import { getSessionServices } from "@/auth/services/session.service";
import {
  Box,
  Card,
  CircularProgress,
  FormControl,
  Typography,
} from "@mui/material";
import router from "next/router";
import SearchAppBar from "@/features/shared/components/search/search";

export const ListClientComponent = (props: IClient) => {
  const { data, error, loading, refetch } = useQuery(
    QueryClientService.clients,
    {
      variables: {
        id: getSessionServices("business"),
      },
    }
  );

  const clients = data?.findUserBusiness[0]?.client;

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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          {/* <SearchAppBar /> */}
        </Box>
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          className="text-xl text-center mb-4"
        >
          Lista de Clientes
        </Typography>
        <FormControl sx={{ alignItems: "center" }}>
          {data ? (
            console.log(data),
            <ListItems
              items={clients}
              renderItem={(item: IClient) => (
                
                  <ItemClient client={item} buttonAction={true} />
                
              )}
              handleItemClick={function (item: IClient): IClient {
                if (typeof window !== "undefined")
                
                  localStorage.setItem("clients", item._id);
                // router.push("/pages/createClient"); //redireccionar al dashboard
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

export default ListClientComponent;
