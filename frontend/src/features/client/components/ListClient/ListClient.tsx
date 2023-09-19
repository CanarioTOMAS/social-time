"use client";

import { useQuery } from "@apollo/client";
import { IClient } from "../../models/Client";
import ItemClient from "../ItemClient/ItemClient";
import { ListItems } from "@/features/shared/components/listItem/ListItem";
import { QueryClientService } from "../../services/clientQuery/clientQuery.services";
import { getLocalStorageValue } from "@/auth/services/session.service";
import { Box, Card, CircularProgress, FormControl, Typography } from "@mui/material";

export const ListClientComponent = () => {
  const { data, error, loading, refetch } = useQuery(
    QueryClientService.clients,
    {
      variables: {
        id: getLocalStorageValue("business"),
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
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          className="text-xl text-center mb-4"
        >
          Lista de Clientes
        </Typography>
        <FormControl sx={{ alignItems: "center" }}>
          {!loading && data && data.findUserBusiness ? (
            <ListItems
              items={clients}
              renderItem={(item: IClient) => (
                <div key={item.id}>
                  <ItemClient client={item} buttonAction={true} />
                </div>
              )}
              handleItemClick={function (item: IClient): IClient {
                localStorage.setItem("client", item.name);
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

export default ListClientComponent;
