import { Business } from "../business/business";
import { User } from "../user/user";
import { EnumRolType } from "./enum.rol";

 export class Rol{
    user: User
    business: Business
    type: EnumRolType
 }