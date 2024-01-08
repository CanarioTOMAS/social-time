import { Project } from "../entities/project/project";

export abstract class IProjectRepository {
    abstract getById(id:string):Promise<Project | null>;
    abstract getAll(page:number):Promise<Project[]>;
    abstract getByUser():Promise<Project[]>;
    abstract getByNameAndDate(name: string,date: Date):Promise<Project[]>;
    abstract create(project:Project):Promise<Project | null> ;
    abstract update(project:Project):Promise<Project | null> ;
    abstract delete(project:Project):Promise<Project | null> ;

}