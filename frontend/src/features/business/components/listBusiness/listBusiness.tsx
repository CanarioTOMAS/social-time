"use client";

import { useQuery } from "@apollo/client";
import { IBusiness } from "../../model/business";
import { ListItems } from "@/features/shared/components/listItem/ListItem";
import ItemBusiness from "../itemBusiness/itemBusiness";
import { businessQueryService } from "../../services/businessQuery";
import { Box, Card, FormControl, Typography } from "@mui/material";

export const ListBusiness = (props: IBusiness) => {
  const { data, error, loading, refetch } = useQuery(
    businessQueryService.FindUserBusiness,
    {}
  );

  if (data) console.log(data);

  return (
    <Box
      className="bg-blue-500 text-white p-4"
      component="form"
      sx={{
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Card sx={{ textAlign: "center", alignItems: "center", pb: 1 }}>
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          className="text-xl text-center mb-4"
        >
          Lista de Empresas
        </Typography>
        <FormControl sx={{ alignItems: "center" }}>
          {!loading && data && data.findUserBusiness ? (
            <ListItems
              items={data.findUserBusiness}
              renderItem={(item: IBusiness) => (
                <div key={item._id}>
                  <ItemBusiness business={item} buttonAction={true} />
                </div>
              )}
              handleItemClick={function (item: IBusiness): IBusiness {
                localStorage.setItem("business", item._id);
                return item;
                //handleItemDelete(item.id);
              }}
            ></ListItems>
          ) : (
            <div className="text-center">Cargando...</div>
          )}
        </FormControl>
      </Card>
    </Box>
  );
};

export default ListBusiness;
