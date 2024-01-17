import { IClientRepository } from "../../domain/abstracts/client.repository";
import { Client } from "../../domain/entities/client/clietn";
import  {IClientDB} from "../../schema/client"
import  ClientDB from "../../schema/client"

export class ClientMongoRepository implements IClientRepository {
    
    getById(id: string): Promise<Client | null> {
        throw new Error("Method not implemented.");
    }
    getAll(page: number): Promise<Client[]> {
        throw new Error("Method not implemented.");
    }
    getByUser(): Promise<Client[]> {
        throw new Error("Method not implemented.");
    }
    getByNameAndDate(name: string, date: Date): Promise<Client[]> {
        throw new Error("Method not implemented.");
    }
    create(client: Client): Promise<Client | null> {
        throw new Error("Method not implemented.");
    }
    update(client: Client): Promise<Client | null> {
        throw new Error("Method not implemented.");
    }
    delete(client: Client): Promise<Client | null> {
        throw new Error("Method not implemented.");
    }

    toDatabase(client:Client):any{
        const clientDB:any = new ClientDB({
            name: client.name,
            
          });
      
          return clientDB;
    }

    toEntity(clientDB:IClientDB):Client{

        const client = new Client("")

        client.name = clientDB.name;

        return client;
    }

}