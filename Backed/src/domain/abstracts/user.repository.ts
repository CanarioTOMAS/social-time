import { User } from "../entities/user/user";

export abstract class IUserRepository {
  abstract getById(id: string): Promise<User | null>;
  abstract getAll(page: number): Promise<User[]>;
  abstract getByEmail(email:string):Promise<User | null>;
  abstract create(user: User): Promise<User | null>;
  abstract update(user: User): Promise<User | null>;
  abstract delete(user: User): Promise<User | null>;
}
