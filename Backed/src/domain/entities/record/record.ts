import { Activity } from "../activitie/activity"
import { Business } from "../business/business"
import { Project } from "../project/project"
import { User } from "../user/user"

export class Record{
    id: string
    inicio: Date
    fin: Date
    description: string
    project: Project
    user: User
    avtivity: Activity
    business: Business

    constructor(
      ){}
}