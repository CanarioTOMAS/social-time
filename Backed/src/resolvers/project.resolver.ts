import { UserInputError } from "apollo-server-core";
import Client from "../schema/client";
import Project from "../schema/project";
import { GraphQLError } from "graphql/error/GraphQLError";

import { ProjectRepository } from "../repositories/project-repository";
let pRepo = new ProjectRepository()

module.exports = {
 
  Mutation: {
    //create our mutation:
    createProject: async (_: any, _args: any, context: any) => {

       return pRepo.create({
        client:_args.client,
        name:_args.name,
        description:_args.description
      });

     
    },
    updateProject: async (root: any, _args: any) => {
      return pRepo.update({
        _id: _args._id,
        client:_args.client,
        name:_args.name,
        description:_args.description
      });
    },
    deleteProject: async (_: any, _args: any, context: any) => {
      return pRepo.delete({
        _id: _args._id
      });
    },
  },
};
