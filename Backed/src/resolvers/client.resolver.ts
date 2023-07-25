import { UserInputError } from "apollo-server-core";
import Client from "../schema/client";
import Business from "../schema/business";

module.exports = {
  // Query: {
  //   findClient: async (_: any, _args: any, context: any) => {
  //     console.log("user", context.user.id);
  //     return await Client.find({
  //       user: context.user.id,
  //     });
  //   },
  //   findOneClient: async (root: any, args: any) => {
  //     const idClient = args.id;
  //     const client = await Client.findById(idClient);
  //     return client;
  //   },
  // },
  Mutation: {
    //create our mutation:
    createClient: async (_: any, _args: any, context: any) => {
      const business = await Business.findById(_args.business);

      const client = new Client({
        business: business,
        name: _args.name,
        image: _args.image,
        city: _args.city,
        address: _args.address,
        email: _args.email,
        phone: _args.phone,
        postCode: _args.postCode,
        documentType: _args.documentType,
        documentNumber: _args.documentNumber,
        surname: _args.surname,
      });

      return client.save().catch((error: any) => {
        throw new UserInputError(error.message, {
          invalidArgs: _args,
        });
      });
    },
    updateClient: async (root: any, args: any) => {
      const { _id, ...updates } = args;
      const client = await Client.findByIdAndUpdate(_id, updates, {
        new: true,
      });
      if (!client) {
        throw new UserInputError("Client not found", {
          invalidArgs: args,
        });
      }
      return client;
    },
    deleteClient: async (root: any, args: any) => {
      const { _id } = args;
      const client = await Client.findByIdAndDelete(_id);
      if (!client) {
        throw new UserInputError("Client not found", {
          invalidArgs: args,
        });
      }
      return "Client deleted successfully";
    },
  },
};
