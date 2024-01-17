import { IBusinessRepository } from "../../domain/abstracts/business.repositori";
import { Business } from "../../domain/entities/business/business";
import { Client } from "../../domain/entities/client/clietn";
import { User } from "../../domain/entities/user/user";
import { IBusinessDB } from "../../schema/business";
import BusinessDB from "../../schema/business";
import { IUserDB } from "../../schema/user";
import { ClientMongoRepository } from "./client.repository";
import { UserMongoRepository } from "./user.repository.mongo";

export class BusinessMongoRepository implements IBusinessRepository {
  constructor(
    private userMongoRepository: UserMongoRepository,
    private clientMongoRepository: ClientMongoRepository
  ) {}

  public async create(business: Business): Promise<Business | null> {
    const businessDB = this.toDatabase(business);

    const newBusinessDB = businessDB.save().catch((error: any) => {
      console.log("Error al crear Empresa", error);
    });
    return this.toEntity(newBusinessDB);
  }
  public async update(business: Business): Promise<Business | null> {
    const { id, ...update } = business;
    console.log(business);
    const businessDB: IBusinessDB | null = await BusinessDB.findByIdAndUpdate(
      id,
      update,
      {
        new: true,
      }
    );
    if (businessDB) {
      return this.toEntity(businessDB);
    } else {
      return null;
    }
  }
  public async delete(business: Business): Promise<Business | null> {
    const businessDB: IBusinessDB | null = await BusinessDB.findByIdAndUpdate(
      business.id,
      {
        delete: true,
      }
    );
    if (businessDB) {
      return this.toEntity(businessDB);
    } else {
      return null;
    }
  }
  public async getById(id: string): Promise<Business | null> {
    const businessDB: IBusinessDB | null = await BusinessDB.findById(id);
    if (!businessDB) {
      return null;
    }
    const business = this.toEntity(businessDB);
    return business;
  }
  public async getAll(page: number): Promise<Business[]> {
    const pageSize = 10;
    const offset = pageSize * (page - 1);
    const businessDB: IBusinessDB[] = await (
      await BusinessDB.find()
    ).map((doc) => ({
      ...doc.toObject(),
      _id: doc._id.toString(),
    }));
    const business = await Promise.all(
      businessDB.map((bnsDb: IBusinessDB) => this.toEntity(bnsDb))
    );
    return business;
  }
  getByEmail(email: string): Promise<Business> {
    throw new Error("Method not implemented.");
  }
  getByUser(user: User): Promise<Business> {
    throw new Error("Method not implemented.");
  }

  async toEntity(businessDB: IBusinessDB): Promise<Business> {
    const business: Business = new Business();

    business.id = businessDB._id;
    business.name = businessDB.name;
    business.address = businessDB.address;
    business.category = businessDB.category;
    business.email = businessDB.email;
    business.image = businessDB.image;
    business.phone = businessDB.phone;

    console.log(businessDB);

    if (businessDB.userIdDB) {
      const user: User | null = await this.userMongoRepository.getById(
        businessDB.userIdDB
      );
      if (user) {
        business.user = user;
      }
    }

    if (businessDB.clientIdDB) {
      const client: Client | null = await this.clientMongoRepository.getById(
        businessDB.clientIdDB
      );
      if (client) {
        business.client = client;
      }
    }
    return business;
  }
  public toDatabase(business: Business): any {
    const businessDB: any = new BusinessDB({
      name: business.name,
      address: business.address,
      category: business.category,
      email: business.email,
      image: business.image,
      phone: business.phone,
      userIdDB: business.user.id,
      clientIdDB: business.client._id,
    });
    return businessDB;
  }
}
