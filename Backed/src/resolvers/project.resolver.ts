import { UserInputError } from "apollo-server-core";
import Client from "../schema/client";
import { GraphQLError } from "graphql/error/GraphQLError";
import { Project } from "../domain/entities/project/project";
import { ClientUseCases } from "../aplication/use-cases/client.use-case";
import {ProjectUseCases} from "../aplication/use-cases/project.use-cases"
import { ProjectMongoRepository } from "../infrastructure/repositories/project.repository";
import { ClientMongoRepository } from "../infrastructure/repositories/client.repository";

const projectUseCases = new ProjectUseCases(new ClientUseCases(new ClientMongoRepository()),new ProjectMongoRepository())


module.exports = {
 
  Mutation: {
    //create our mutation:
    createProject: async (_: any, _args: any, context: any) => {

      return await projectUseCases.createProject(_args.name,_args.description,_args.client)

     

     
    },
    updateProject: async (root: any, _args: any) => {
      

      const project = new Project(_args.name,_args.description,_args.client);
      project.id = _args._id

      return await projectUseCases.updateProject(project)

    },
    deleteProject: async (_: any, _args: any, context: any) => {
      return pRepo.delete({
        _id: _args._id
      });

      

    },
  },
};
