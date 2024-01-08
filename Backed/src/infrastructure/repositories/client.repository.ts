import { IClientRepository } from "../../domain/abstracts/client.repository";
import { Client } from "../../domain/entities/client/clietn";
import { ClientDB } from "../../schema/client";

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

    toDatabase(client:Client):Promise<ClientDB>{
        const clientDB = new ClientDB({
            
          });
      
          return clientDB;
    }

    toEntity(clientDb:ClientDB):Client{

        const client = new Client("")

        client.name = clientDb.name;

        return client;
    }

}