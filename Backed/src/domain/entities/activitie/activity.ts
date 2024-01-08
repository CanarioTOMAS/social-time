import { Business } from "../business/business"
import { Client } from "../client/clietn"
import { Project } from "../project/project"
import { User } from "../user/user"

export class Activity{
    id: string
    name: string
    description:string
    tiempoEstimado: string
    colaborador: string
    user: User
    business: Business
    client: Client
    project: Project
    constructor(
    ){
    }
}