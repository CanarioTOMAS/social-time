

import { Client } from "../../domain/entities/client/clietn";
import { Project } from "../../domain/entities/project/project";
import { ClientUseCases } from "./client.use-case";
import { IProjectRepository } from "../../domain/abstracts/project.repository";


export class ProjectUseCases {

    constructor(private clientUseCases:ClientUseCases, private projectRepository:IProjectRepository){

    }

    async createProject(name:string,description:string,client_id:string){

        const client:Client | null = await this.clientUseCases.getClientById(client_id)

        if(!client) throw new Error("Clietn not found.");

        const project = new Project(name,description,client)

        this.projectRepository.create(project)

    }

    async updateProject(project:Project){
        return await this.projectRepository.update(project)
    }
}