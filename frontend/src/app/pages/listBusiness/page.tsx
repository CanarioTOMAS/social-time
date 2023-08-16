"use client";

import ListBusiness from "@/features/business/components/listBusiness/listBusiness";
import { type } from "os";


export default function listBusiness() {
  return (
    <div>
      <ListBusiness props={undefined} name={""} phone={""} email={""} address={""} businessCategory={""} image={""} touched={""}  />
    </div>
  );
}
