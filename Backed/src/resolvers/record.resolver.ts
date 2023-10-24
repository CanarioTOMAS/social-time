import { UserInputError } from "apollo-server-core";
import Client from "../schema/client";
import User from "../schema/user";
import Record from "../schema/record";
const convertToISO8601 = require('../../src/metodos/dateconverter');

module.exports = {

  
  Mutation: {
    createRecord: async (_: any, _args: any, context: any) => {
      const client = await Client.findById(_args.client);
      const user = await User.findById(_args.user);
      const record = new Record({
        client: client,
        user: user,
        name: _args.name,
        inicio: convertToISO8601(_args.inicio),
        fin: convertToISO8601(_args.fin),
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
