"use client";

import { useQuery } from "@apollo/client";
import { IBusiness } from "../../model/business";
import { ListItems } from "@/features/shared/components/listItem/ListItem";
import ItemBusiness from "../itemBusiness/itemBusiness";
import { businessQueryService } from "../../services/businessQuery";
import { setSessionService } from "../../../../auth/services/session.service";
import { useRouter } from "next/navigation";

export const ListBusiness = (props: IBusiness) => {
    const { data, error, loading, refetch } = useQuery(
      businessQueryService.FindUserBusiness,
      {
        variables: {
          findOneUserId : localStorage.getItem ("authToken"),
        },
      }
    );
    const router = useRouter();

  if (data) console.log(data);

  return (
    <>

    {data ?
      <ListItems
        items={data.findUserBusiness}
        renderItem={(item: IBusiness) => (
          <ItemBusiness business={item} buttonAction={true} />
        )}
        handleItemClick={function (item: IBusiness): IBusiness {
          localStorage.setItem ("business",item._id)
          router.push("/pages/createClient");//redireccionar al dashboard
          return item;
          //handleItemDelete(item.id);
        }}
      ></ListItems>
      :
      <>Cargando...</>
}
    </>
  );
};

export default ListBusiness;
