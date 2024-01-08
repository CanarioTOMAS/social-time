import { Business } from "../business/business"
import { Client } from "../client/clietn"
import { User } from "../user/user"

export class Project{
    id: string
    name: string
    description: string
    client: Client
    business: Business
    user: User
    constructor(
        
        name: string,
        description:string,
        client:Client
    ){
        this.name = name,
        this.description = description
        this.client = client
    }
}