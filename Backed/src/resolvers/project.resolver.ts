import { UserInputError } from "apollo-server-core";
import Client from "../schema/client";
import Project from "../schema/project";

module.exports = {
 
  Mutation: {
    //create our mutation:
    createProject: async (_: any, _args: any, context: any) => {
      const client = await Client.findById(_args.client);

      const project = new Project({
        client: client,
        name: _args.name,
      });

      return project.save().catch((error: any) => {
        throw new UserInputError(error.message, {
          invalidArgs: _args,
        });
      });
    },
    updateProject: async (root: any, args: any) => {
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
    deleteProject: async (root: any, args: any) => {
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
