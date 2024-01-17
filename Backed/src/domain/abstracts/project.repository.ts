import { Business } from "../entities/business/business";
import { Project } from "../entities/project/project";
import { User } from "../entities/user/user";

export abstract class IProjectRepository {
    abstract getById(id:string):Promise<Project | null>;
    abstract getAll(page:number):Promise<Project[]>;
    abstract getByBusinessUser(user: User, business: Business):Promise<Project[]>;
    abstract getByNameAndDate(name: string,date: Date):Promise<Project[]>;
    abstract create(project:Project):Promise<Project | null> ;
    abstract update(project:Project):Promise<Project | null> ;
    abstract delete(project:Project):Promise<Project | null> ;

}