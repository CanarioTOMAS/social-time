"use client";

import ListProject from "@/features/project/components/list-project/list-project";
import { type } from "os";

type Props = {
  id: string;
  name: string;
  idClient: string;
  user: string;
  idProject: string;

}
export default function listItem() {
  return (
 <ListProject
      />)}
