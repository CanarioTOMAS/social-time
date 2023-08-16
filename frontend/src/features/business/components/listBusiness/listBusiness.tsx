"use client";

import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { IBusiness } from "../../model/business";
import { ListItems } from "@/features/shared/components/listItem/ListItem";
import ItemClient from "@/features/client/components/ItemClient/ItemClient";
import ItemBusiness from "../itemBusiness/itemBusiness";
import { businessQueryService } from "../../services/businessQuery";
import { setSessionService } from "../../../../auth/services/session.service";

export const ListBusiness = (props: IBusiness) => {
  const { data, error, loading, refetch } = useQuery(
    businessQueryService.FindUserBusiness,
    {
      variables: {
        pageCount: 1,
        perPage: 10,
        searchWord: "",
      },
    }
  );

  return (
    <>
      {!loading && data && data.findUserBusiness ? (
        <ListItems
          items={data.findUserBusiness}
          renderItem={(item: IBusiness) => (
            <ItemBusiness business={item} buttonAction={true} />
          )}
          handleItemClick={function (item: IBusiness): IBusiness {
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
export default ListBusiness;
