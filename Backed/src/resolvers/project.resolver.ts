import { UserInputError } from "apollo-server-core";
import Client from "../schema/client";
import Project from "../schema/project";
import { GraphQLError } from "graphql/error/GraphQLError";

module.exports = {
 
  Mutation: {
    //create our mutation:
    createProject: async (_: any, _args: any, context: any) => {
      const client = await Client.findById(_args.client);

      const project = new Project({
        client: client,
        name: _args.name,
        description: _args.description,
      });
      console.log(project);
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
    deleteProject: async (_: any, _args: any, context: any) => {
      const project = await Project.findByIdAndUpdate(_args._id, { deleted: true });
      if (project) {
        return "Proyecto Borrado";
      } else {
        throw new GraphQLError("Error eliminando el proyecto.", {
          extensions: {
            code: "ERROR_DELETING_PROJECT",
          },
        });
      }
    },
  },
};
