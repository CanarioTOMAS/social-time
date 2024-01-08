import { Client } from "../entities/client/clietn";

export abstract class IClientRepository {
    abstract getById(id:string):Promise<Client | null>;
    abstract getAll(page:number):Promise<Client[]>;
    abstract getByUser():Promise<Client[]>;
    abstract getByNameAndDate(name: string,date: Date):Promise<Client[]>;
    abstract create(client:Client):Promise<Client | null> ;
    abstract update(client:Client):Promise<Client | null> ;
    abstract delete(client:Client):Promise<Client | null> ;

}