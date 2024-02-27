import { UserInputError } from "apollo-server-core";
import Client from "../schema/client";
import User from "../schema/user";
import Business from "../schema/business";
import Project from "../schema/project";
import Activities from "../schema/activitie";
import Record from "../schema/record";
const convertToISO8601 = require("../../src/metodos/dateconverter");

module.exports = {
  Mutation: {
    createRecord: async (_: any, _args: any, context: any) => {
      const user = await User.findById(_args.user);
      const client = await Client.findById(_args.client);
      const business = await Business.findById(_args.business);
      const project = await Project.findById(_args.proyect);
      const activities = await Activities.findById(_args.activities);
      const record = new Record({
        user: user,
        business: business,
        client: client,
        project: project,
        activities: activities,
        totalHours: _args.totalHours,
        name: _args.name,
        inicio: convertToISO8601(_args.inicio),
        fin: convertToISO8601(_args.fin),
        descriptions: _args.descriptions,
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
