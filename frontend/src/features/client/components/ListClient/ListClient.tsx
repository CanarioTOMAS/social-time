"use client";

import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { IClient } from "../../models/Client";
import ItemClient from "../ItemClient/ItemClient";
import { ListItems } from "@/features/shared/components/listItem/ListItem";
import { QueryClientService } from "../../services/clientQuery/clientQuery.services";

export const ListClient = () => {
  const { data, error, loading, refetch } = useQuery(
  QueryClientService.clients
  );
  const [modalOpen, setModalOpen] = useState(false);
    const [clients, setClients]=useState<IClient[]>([])
  const handleCloseModal = () => {
    //refetch();
    setModalOpen(false);
  };
  
  useEffect(()=>{
    if(data && data.findClient){
      setClients (data.findClient) ; 
   console.log(clients)
   }
  },[data.findClient])
  
  return (
    <>
     {!loading && data && data.findClient ? (
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

export default ListClient;
