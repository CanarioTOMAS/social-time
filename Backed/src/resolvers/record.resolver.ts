import { UserInputError } from "apollo-server-core";
import Client from "../schema/client";
import User from "../schema/user";
import Project from "../schema/project";
import Record from "../schema/record";

module.exports = {
  Query: {
    findRecord: async (_: any, _args: any, context: any) => {
      return await Project.find({
        user: context.user.id,
      });
    },
    findOneRecord: async (root: any, args: any) => {
      const idProject = args.id;
      const project = await Project.findById(idProject);
      return project;
    },
  },
  Mutation: {
    //create our mutation:
    createRecord: async (_: any, _args: any, context: any) => {
      const client = await Client.findById(_args.client);
      const user = await User.findById(_args.user);

      const project = new Record({
        client: client,
        user: user,
        name: _args.name,
      });

      return project.save().catch((error: any) => {
        throw new UserInputError(error.message, {
          invalidArgs: _args,
        });
      });
    },
    updateRecord: async (root: any, args: any) => {
      const { _id, ...updates } = args;
      const project = await Project.findByIdAndUpdate(_id, updates, {
        new: true,
      });
      if (!project) {
        throw new UserInputError("Project not found", {
          invalidArgs: args,
        });
      }
      return project;
    },
    deleteRecord: async (root: any, args: any) => {
      const { _id } = args;
      const project = await Project.findByIdAndDelete(_id);
      if (!project) {
        throw new UserInputError("Project not found", {
          invalidArgs: args,
        });
      }
      return "Project deleted successfully";
    },
  },
};
