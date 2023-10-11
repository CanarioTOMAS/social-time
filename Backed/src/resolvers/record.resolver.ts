import { UserInputError } from "apollo-server-core";
import Client from "../schema/client";
import User from "../schema/user";
import Project from "../schema/project";
import Record from "../schema/record";

module.exports = {

  Mutation: {
    //create our mutation:
    createRecord: async (_: any, _args: any, context: any) => {
      const client = await Client.findById(_args.client);
      const user = await User.findById(_args.user);

        console.log (_args)
      const record = new Record({
        client: client,
        user: user,
        name: _args.name,
        inicio: _args.inicio,
        fin: _args.fin,
        activities: _args.activities
      });

      return record.save().catch((error: any) => {
        throw new UserInputError(error.message, {
          invalidArgs: _args,
        });
      });
    },
    updateRecord: async (root: any, args: any) => {
      const { _id, ...updates } = args;
      const record = await Record.findByIdAndUpdate(_id, updates, {
        new: true,
      });
      if (!record) {
        throw new UserInputError("Record not found", {
          invalidArgs: args,
        });
      }
      return record;
    },
    deleteRecord: async (root: any, args: any) => {
      const { _id } = args;
      const record = await Record.findByIdAndDelete(_id);
      if (!record) {
        throw new UserInputError("Record not found", {
          invalidArgs: args,
        });
      }
      return "Record deleted successfully";
    },
  },
};
