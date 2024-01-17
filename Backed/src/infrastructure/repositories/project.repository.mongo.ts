import { Db, Collection, InsertOneResult, Document } from "mongodb";

import mongoose from "mongoose";
import ProjectDB, { IProjectDB } from "../../schema/project";
import { UserInputError } from "apollo-server-core";
import { GraphQLError } from "graphql/error/GraphQLError";
import { IProjectRepository } from "../../domain/abstracts/project.repository";
import { Project } from "../../domain/entities/project/project";
import { User } from "../../domain/entities/user/user";
import { ClientMongoRepository } from "./client.repository";
import { Business } from "../../domain/entities/business/business";

export interface ResponseProject {
  pag: number;
  total: number;
  data: any[];
}

// that class only can be extended
export class ProjectMongoRepository implements IProjectRepository {
  constructor(private clientMongoRepository:ClientMongoRepository) {}
  public async getById(id: string): Promise<Project | null> {

      const projectDB: IProjectDB | null = await ProjectDB.findById(id);

      if (!projectDB) {
        return null;
      }

      const project = this.toEntity(projectDB);
      return project;
  }

  public async getAll(page: number): Promise<Project[]> {
  
      const pageSize = 10;
      const offset = pageSize * (page - 1);

      const projectsDB: IProjectDB [] = await ProjectDB.find().skip(offset).limit(pageSize);

      return  await Promise.all(projectsDB.map((prDb: IProjectDB)=>this.toEntity(prDb)));

  }

  public async getByBusinessUser(user:User, business:Business): Promise<Project[]> {  

      const projectsDB: IProjectDB [] = await ProjectDB.find({
        user: user.id,
        business:business.id       
      });

      return await Promise.all(projectsDB.map((prDb: IProjectDB)=>this.toEntity(prDb)));
     
  }

  public async getByNameAndDate(name: string, date: Date): Promise<Project[]> {
    
      const projectsDB: IProjectDB [] = await ProjectDB.find({
        name: name,
        createdAt: {
          $gte: date,
        },
      });

      const projects = await Promise.all(projectsDB.map((prDb: IProjectDB)=>this.toEntity(prDb)));
      return projects;

  }

  public async create(project: Project): Promise<Project> {
   
    const projectDB = this.toDatabase(project);

    const newProjectDB = projectDB.save().catch((error: any) => {
      
    });

    return this.toEntity(newProjectDB);
  }

  public async update(project: Project): Promise<Project> {
    const { id, ...updates } = project;
    console.log(project);
    const projectDB: IProjectDB | null = await ProjectDB.findByIdAndUpdate(id, updates, {
      new: true,
    });
    return this.toEntity(projectDB);
  }

  public async delete(project: Project): Promise<Project> {
    const projectDB: IProjectDB | null = await ProjectDB.findByIdAndUpdate(project.id, {
      deleted: true,
    });
    if (projectDB) {
      return this.toEntity(projectDB);
    } else {
      throw new UserInputError("Project not found");
    }
  }

  public toDatabase(project: Project): any {

    
    const projectDB = new ProjectDB({
      client: project.client?this.clientMongoRepository.getById(project.client.id):null,
      name: project.name,
      description: project.description,
    });

    return projectDB;
  }

  public toEntity(projectDB: any): Project {

    const client = this.clientMongoRepository.toEntity(projectDB.clientIdDB)
    const project: Project = new Project(projectDB.name,projectDB.description,client);

 

    return project;
  }
}
