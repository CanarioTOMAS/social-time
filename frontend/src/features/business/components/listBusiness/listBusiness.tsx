"use client";

import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { IBusiness } from "../../model/business";
import { ListItems } from "@/features/shared/components/listItem/ListItem";
import ItemClient from "@/features/client/components/ItemClient/ItemClient";
import ItemBusiness from "../itemBusiness/itemBusiness";
//import { BusinessServices } from "../../services/businessServices";
//import { setSessionService } from "../../../../auth/services/session.service";

export const ListBusiness = (props: IBusiness) => {
  //   const { data, error, loading, refetch } = useQuery(
  //     BusinessServices.BusinessQueryServices.FindUserBusiness,
  //     {
  //       variables: {
  //         pageCount: 1,
  //         perPage: 10,
  //         searchWord: "",
  //       },
  //     }
  //   );

  const arrayBusiness: IBusiness[] = [
    {
      name: "ABC Electronics",
      phone: "123-456-7890",
      email: "info@abc-electronics.com",
      address: "456 Tech Street",
      businessCategory: "Electronics",
      image: "business-image-1.jpg",
      touched: "2023-07-31",
    },
    {
      name: "Fresh Mart",
      phone: "987-654-3210",
      email: "contact@fresh-mart.com",
      address: "123 Market Avenue",
      businessCategory: "Groceries",
      image: "business-image-2.jpg",
      touched: "2023-07-31",
    },
    {
      name: "Fashion Boutique",
      phone: "555-123-4567",
      email: "info@fashion-boutique.com",
      address: "789 Style Lane",
      businessCategory: "Fashion",
      image: "business-image-3.jpg",
      touched: "2023-07-31",
    },
  ];

  return (
    <>
      <ListItems
        items={arrayBusiness}
        renderItem={(item: IBusiness) => (
          <ItemBusiness business={item} buttonAction={true} />
        )}
        handleItemClick={function (item: IBusiness): IBusiness {
          console.log(item);
          return item;
          //handleItemDelete(item.id);
        }}
      ></ListItems>
    </>
  );
};
export default ListBusiness;
