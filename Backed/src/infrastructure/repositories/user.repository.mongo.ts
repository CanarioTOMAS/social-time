import { IUserRepository } from "../../domain/abstracts/user.repository";
import { User } from "../../domain/entities/user/user";
import user, { IUserDB } from "../../schema/user";
import UserDB from "../../schema/user";

export class UserMongoRepository implements IUserRepository {
  public async getById(id: string): Promise<User | null> {
    const userDB: IUserDB | null = await UserDB.findById(id);

    if (!userDB) {
      return null;
    }

    const user = this.toEntity(userDB);
    return user;
  }
  public async getAll(page: number): Promise<User[]> {
    const pageSize = 10;
    const offset = pageSize * (page - 1);

    const userDB: IUserDB[] = await UserDB.find().skip(offset).limit(pageSize);

    const user = await Promise.all(
      userDB.map((usDb: IUserDB) => this.toEntity(usDb))
    );

    return user;
  }
  public async getByEmail(email: string): Promise<User | null> {
    const userDB: IUserDB | null = await UserDB.findOne({ email });
    if (!userDB) {
      return null;
    }
    return this.toEntity(userDB);
  }
  public async create(user: User): Promise<User | null> {
    const userDB = this.toDatabase(user);

    const newUserDB = userDB.save().catch((error: any) => {
      console.log("Erro al crear usuário", error);
    });

    return this.toEntity(newUserDB);
  }
  public async update(user: User): Promise<User | null> {
    const { id, ...updates } = user;
    console.log(user);
    const userDB: IUserDB | null = await UserDB.findByIdAndUpdate(id, updates, {
      new: true, //retorna un nuevo documento atualizado
    });
    if (userDB) {
      return this.toEntity(userDB);
    } else {
      return null;
    }
  }

  public async delete(user: User): Promise<User | null> {
    const userDB: IUserDB | null = await UserDB.findByIdAndUpdate(user.id, {
      delete: true,
    });
    if (userDB) {
      return this.toEntity(userDB);
    } else {
      return null;
    }
  }

  public toEntity(userDB: IUserDB): User {
    const user: User = new User();
    user.id = userDB._id;
    user.name = userDB.name;
    user.surname = userDB.surname;
    user.address = userDB.address;
    user.email = userDB.email;
    user.gender = userDB.gender;
    user.password = userDB.password;
    user.role = userDB.role;
    user.image = userDB.image;
    user.phone = userDB.phone;
    return user;
  }

  public toDatabase(user: User): any {
    const userDB: any = new UserDB({
      name: user.name,
      surname: user.surname,
      address: user.address,
      email: user.email,
      password: user.password,
      role: user.role,
      image: user.image,
      phone: user.phone,
    });
    return userDB;
  }
}
