import { UserInputError } from "apollo-server-core";
import Client from "../schema/client";
import Business from "../schema/business";
import { GraphQLError } from "graphql/error/GraphQLError";

module.exports = {
   
 
  Mutation: {
    //create our mutation:
    createClient: async (_: any, _args: any, context: any) => {
      const business = await Business.findById(_args.business);
    
      const client = new Client({
        business: _args.business,
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
    deleteClient: async (_: any, _args: any, context: any) => {
      const client = await Client.findByIdAndUpdate(_args._id, { deleted: true });
      if (client) {
        return "Cliente Borrado";
      } else {
        throw new GraphQLError("Error eliminando el cliente.", {
          extensions: {
            code: "ERROR_DELETING_CLIENT",
          },
        });
      }
    },
  },
};
