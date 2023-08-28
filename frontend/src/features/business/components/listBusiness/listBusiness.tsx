"use client";

import { useQuery } from "@apollo/client";
import { IBusiness } from "../../model/business";
import { ListItems } from "@/features/shared/components/listItem/ListItem";
import ItemBusiness from "../itemBusiness/itemBusiness";
import { businessQueryService } from "../../services/businessQuery";

export const ListBusiness = (props: IBusiness) => {
  const { data, error, loading, refetch } = useQuery(
    businessQueryService.FindUserBusiness,
    {    }
  );

  if (data) console.log(data);
  return (
    <>
      {data && data.findUserBusiness ? (
        <ListItems
          items={data.findUserBusiness}
          renderItem={(item: IBusiness) => (
            <ItemBusiness business={item} buttonAction={true} />
          )}
          handleItemClick={function (item: IBusiness): IBusiness {
            localStorage.setItem("business", item._id);
            window.location.href = "http://localhost:3000/pages/createClient";
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
