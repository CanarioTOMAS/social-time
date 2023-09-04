"use client";

import { useQuery } from "@apollo/client";
import { IClient } from "../../models/Client";
import ItemClient from "../ItemClient/ItemClient";
import { ListItems } from "@/features/shared/components/listItem/ListItem";
import { QueryClientService } from "../../services/clientQuery/clientQuery.services";
import { getSessionServices } from "@/auth/services/session.service";
import { Typography } from "@mui/material";

export const ListClientComponent = () => {
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
    <>
      <Typography variant="h5" align="center" gutterBottom>
        Lista de Clientes
      </Typography>
      {!loading && data && data.findUserBusiness ? (
        <ListItems
          items={clients}
          renderItem={(item: IClient) => (
            <ItemClient client={item} buttonAction={true} />
          )}
          handleItemClick={function (item: IClient): IClient {
            console.log(item);
            return item;
            //handleItemDelete(item.id);
          }}
        ></ListItems>
      ) : (
        <>Cargando...</>
      )}
    </>
  );
};

export default ListClientComponent;
