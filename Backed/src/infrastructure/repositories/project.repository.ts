import { Db, Collection, InsertOneResult, Document } from "mongodb";

import mongoose from "mongoose";
import ProjectDB from "../../schema/project";
import { UserInputError } from "apollo-server-core";
import { GraphQLError } from "graphql/error/GraphQLError";
import { IProjectRepository } from "../../domain/abstracts/project.repository";
import { Project } from "../../domain/entities/project/project";
import { User } from "../../domain/entities/user/user";

export interface ResponseProject {
  pag: number;
  total: number;
  data: any[];
}

// that class only can be extended
export class ProjectMongoRepository implements IProjectRepository {
  constructor() {}
  public async getById(id: string): Promise<Project | null> {

      const projectDB = await ProjectDB.findById(id);

      if (!projectDB) {
        return null;
      }

      const project = this.toEntity(projectDB);
      return project;
  }

  public async getAll(page: number): Promise<Project[]> {
  
      const pageSize = 10;
      const offset = pageSize * (page - 1);

      const projectsDB = await ProjectDB.find().skip(offset).limit(pageSize);

      const projects = projectsDB.map(this.toEntity);
      return projects;

  }

  public async getByUser(): Promise<Project[]> {
      const projectsDB = await ProjectDB.find({
        owner: User,
      });

      const projects = projectsDB.map(this.toEntity);
      return projects;
  }

  public async getByNameAndDate(name: string, date: Date): Promise<Project[]> {
    
      const projectsDB = await ProjectDB.find({
        name: name,
        createdAt: {
          $gte: date,
        },
      });

      const projects = projectsDB.map(this.toEntity);
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
    const projectDB = await ProjectDB.findByIdAndUpdate(id, updates, {
      new: true,
    });
    return this.toEntity(projectDB);
  }

  public async delete(project: Project): Promise<Project> {
    const projectDB = await ProjectDB.findByIdAndUpdate(project.id, {
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
      client: project.client,
      name: project.name,
      description: project.description,
    });

    return projectDB;
  }

  public toEntity(projectDB: any): Project {

    const client = this.clientMongoRepository.toEntity(projectDB.clientDB)

    const project: Project = new Project(projectDB.name,projectDB.description,client);

 

    return project;
  }
}
