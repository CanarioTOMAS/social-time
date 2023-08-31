"use client";

import { useQuery } from "@apollo/client";
import { useState } from "react";
import { IClient } from "../../models/Client";
import ItemClient from "../ItemClient/ItemClient";
import { ListItems } from "@/features/shared/components/listItem/ListItem";
import { QueryClientService } from "../../services/clientQuery/clientQuery.services";
import { getSessionServices } from "@/auth/services/session.service";

export const ListClientComponent = () => {
  const { data, error, loading, refetch } = useQuery(
    QueryClientService.clients,
    {
      variables: {
        id: getSessionServices("business"),
      },
    }
  );

  const [modalOpen, setModalOpen] = useState(false);
  
  const handleCloseModal = () => {
    refetch();
    setModalOpen(false);
  };

  const clients = data?.findUserBusiness[0]?.client

  return (
    <>
      {!loading && data && data.findUserBusiness? (
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
        <></>
      )}
    </>
  );
};

export default ListClientComponent;
