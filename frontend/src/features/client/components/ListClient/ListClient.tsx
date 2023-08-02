"use client"

import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { IClient } from "../../models/Client";
import ItemClient from "../ItemClient/ItemClient";
import { ListItems } from "@/features/shared/components/listItem/ListItem";

export const ListClient = () => {
  //const { data, error, loading, refetch } = useQuery(
    //ClientServices.QueryClientService.clients
  //);
  const [modalOpen, setModalOpen] = useState(false);

  const handleCloseModal = () => {
    //refetch();
    setModalOpen(false);
  };

  //const clients = data?.findUserBusiness[0]?.client.slice(0, 10);

//   return (
//     <>
//       {!loading && data && data.findUserBusiness ? (
//         <ListItems
//           items={clients}
//           renderItem={(item: IClient) => (
//             <ItemClient client={item} buttonAction={true} />
//           )}
//           handleItemClick={function (item: IClient): IClient {
//             console.log(item);
//             return item;
//             //handleItemDelete(item.id);
//           }}
//         ></ListItems>
//       ) : (
//         <div>spinner</div>
//       )}
//     </>
//   );
};

export default ListClient;
