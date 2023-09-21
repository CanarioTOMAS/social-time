"use client";

import { useQuery } from "@apollo/client";
import { IBusiness } from "../../model/business";
import { ListItems } from "@/features/shared/components/listItem/ListItem";
import ItemBusiness from "../itemBusiness/itemBusiness";
import { businessQueryService } from "../../services/businessQuery";
import { setSessionService } from "../../../../auth/services/session.service";
import { useRouter } from "next/navigation";
import {
  Box,
  Card,
  CircularProgress,
  FormControl,
  Typography,
} from "@mui/material";

export const ListBusiness = (props: IBusiness) => {
  const { data, error, loading, refetch } = useQuery(
    businessQueryService.FindUserBusiness,
    {
      variables: {
        findOneUserId: localStorage.getItem("authToken"),
      },
    }
  );
  const router = useRouter();

  return (
    <Box
      className="bg-blue-500 text-white p-4"
      component="form"
      sx={{
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        margin: "auto",
      }}
    >
      <Card
        sx={{
          textAlign: "center",
          alignItems: "center",
          width: "80vh",
          margin: "auto",
        }}
      >
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          className="text-xl text-center mb-4"
        >
          Lista de Empresas
        </Typography>
        <FormControl sx={{ alignItems: "center" }}>
          {data ? (
            <ListItems
              items={data.findUserBusiness}
              renderItem={(item: IBusiness) => (
                <ItemBusiness business={item} buttonAction={true} />
              )}
              handleItemClick={function (item: IBusiness): IBusiness {
                if (typeof window !== "undefined")
                  localStorage.setItem("business", item._id);
                router.push("/pages/createClient"); //redireccionar al dashboard
                return item;
                //handleItemDelete(item.id);
              }}
            ></ListItems>
          ) : (
            <CircularProgress />
          )}
        </FormControl>
      </Card>
    </Box>
  );
};

export default ListBusiness;
