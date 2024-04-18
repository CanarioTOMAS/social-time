import { UserInputError } from "apollo-server-core";
import RolType from "../schema/roltype";

module.exports = {

  Mutation: {
    //create our mutation:
    createRolType: async (_: any, _args: any, context: any) => {
     
      const roltype = new RolType({
        name: _args.name,
        description: _args.description
      });

      return RolType.save().catch((error: any) => {
        throw new UserInputError(error.message, {
          invalidArgs: _args,
        });
      });
    },
    updateRolType: async (root: any, args: any) => {
      const { _id, ...updates } = args;
      const roltype = await RolType.findByIdAndUpdate(_id, updates, {
        new: true,
      });
      if (!roltype) {
        throw new UserInputError("Rol Type not found", {
          invalidArgs: args,
        });
      }
      return roltype;
    },
    deleteRolType: async (root: any, args: any) => {
      const { _id } = args;
      const roltype = await RolType.findByIdAndDelete(_id);
      if (!roltype) {
        throw new UserInputError("Rol Type not found", {
          invalidArgs: args,
        });
      }
      return "RolType deleted successfully";
    },
  },
};
