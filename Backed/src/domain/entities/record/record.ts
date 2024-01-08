import { Activity } from "../activitie/activity"
import { Business } from "../business/business"
import { Client } from "../client/clietn"
import { Project } from "../project/project"
import { User } from "../user/user"

export class Record{
    id: string
    inicio: Date
    fin: Date
    description: string
    user: User
    business: Business
    client: Client
    project: Project
    avtivity: Activity
   
    

    constructor(
      ){}
}