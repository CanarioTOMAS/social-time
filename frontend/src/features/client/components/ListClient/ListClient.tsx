"use client";

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

  const arrayClient:IClient[] =[
    {
      id: "1",
      name: "John Doe",
      image: "image-url-1.jpg",
      city: "New York",
      address: "123 Main St",
      email: "john@example.com",
      phone: "123-456-7890",
      idBusiness: "business-123",
      postCode: "10001",
      documentType: "ID",
      documentNumber: "123456789",
      surname: "Doe",
    },
    {
      id: "2",
      name: "Jane Smith",
      image: "image-url-2.jpg",
      city: "Los Angeles",
      address: "456 Elm St",
      email: "jane@example.com",
      phone: "987-654-3210",
      idBusiness: "business-456",
      postCode: "90001",
      documentType: "Passport",
      documentNumber: "987654321",
      surname: "Smith",
    },
    {
      name: "Alice Johnson",
      image: "image-url-3.jpg",
      email: "alice@example.com",
      idBusiness: "business-789",
    },
  ];

  //const clients = data?.findUserBusiness[0]?.client.slice(0, 10);

  return (
    <>
      <ListItems
        items={arrayClient}
        renderItem={(item: IClient) => (
          <ItemClient client={item} buttonAction={true} />
        )}
        handleItemClick={function (item: IClient): IClient {
          console.log(item);
          return item;
          //handleItemDelete(item.id);
        }}
      ></ListItems>
    </>
  );
};

export default ListClient;
