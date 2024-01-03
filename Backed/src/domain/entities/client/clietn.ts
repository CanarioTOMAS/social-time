import { Business } from "../business/business"
import { User } from "../user/user"

export class Client {
  id: string
  name: string
  surname: string
  city: string
  address: string
  email: string
  phone: string
  postCode: string
  documentType: string
  documentNumber: string
  image: string
  user: User
  busness: Business
 constructor(
  ){}
}
