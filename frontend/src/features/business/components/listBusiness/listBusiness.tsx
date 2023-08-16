"use client";

import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { IBusiness } from "../../model/business";
import { ListItems } from "@/features/shared/components/listItem/ListItem";
import ItemClient from "@/features/client/components/ItemClient/ItemClient";
import ItemBusiness from "../itemBusiness/itemBusiness";
import { businessQueryService } from "../../services/businessQuery";
import { type } from "os";

//import { setSessionService } from "../../../../auth/services/session.service";

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
  // const handleSelectBusiness = (item: any) => {
  //   setSessionService("business", item._id)
  // };
  return (
    <>
      {!loading && data && data.findUserBusiness ? (
        <div>
          <ListItems
            items={data.findUserBusiness}
            
            renderItem={(item: IBusiness) => <ItemBusiness {...item} /> }
            // handleItemClick={handleSelectBusiness}
    
          ></ListItems>
        
        </div>
      ) : (
        <div>spinner</div>
      )}
    </>
  );
};
export default ListBusiness;
