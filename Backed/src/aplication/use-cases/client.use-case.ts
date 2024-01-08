import { IClientRepository } from "../../domain/abstracts/client.repository";

export class ClientUseCases {

    constructor(private clientRepository:IClientRepository){
        
    }

    async getClientById(clientId:string){
        return await this.clientRepository.getById(clientId)
    }
}
