import {Business} from "../entities/business/business"
import { User } from "../entities/user/user";

export abstract class IBusinessRepository {
    abstract create(business: Business): Promise<Business | null> ;
    abstract update( business: Business): Promise<Business | null>;
    abstract delete (business: Business):Promise<Business | null >;
    abstract getById(id:string): Promise<Business | null>;
    abstract getAll (page: number): Promise<Business []>
    abstract getByEmail(email:string):Promise<Business | null>;
    abstract getByUser(user:User):Promise<Business | null>;
}