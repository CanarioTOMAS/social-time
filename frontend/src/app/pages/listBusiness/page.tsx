"use client";

import ListBusiness from "@/features/business/components/listBusiness/listBusiness";



export default function listItem() {
  return (
    <div>
      <ListBusiness name={""} phone={""} email={""} address={""} businessCategory={""} image={""} touched={""} />
    </div>
  );
}
