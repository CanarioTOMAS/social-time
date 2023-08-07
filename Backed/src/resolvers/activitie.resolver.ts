import { UserInputError } from "apollo-server-core";
import Project from "../schema/project";
import Activitie from "../schema/activitie";

module.exports = {
  Query: {
    findActivitie: async (_: any, _args: any, context: any) => {
      return await Activitie.find({
        user: context.user.id,
      });
    },
    findOneActivitie: async (root: any, args: any) => {
      const idActivitie = args.id;
      const activitie = await Activitie.findById(idActivitie);
      return activitie;
    },
  },
  Mutation: {
    //create our mutation:
    createActivitie: async (_: any, _args: any, context: any) => {
      const project = await Project.findById(_args.project);
      const activitie = new Activitie({
        project: project,
        name: _args.name,
        tiempoEstimado: _args.tiempoEstimado,
        costoHora: _args.costoHora,
        periocidad: _args.periocidad
      });

      return activitie.save().catch((error: any) => {
        throw new UserInputError(error.message, {
          invalidArgs: _args,
        });
      });
    },
    updateActivitie: async (root: any, args: any) => {
      const { _id, ...updates } = args;
      const activitie = await Activitie.findByIdAndUpdate(_id, updates, {
        new: true,
      });
      if (!activitie) {
        throw new UserInputError("Activitie not found", {
          invalidArgs: args,
        });
      }
      return activitie;
    },
    deleteActivitie: async (root: any, args: any) => {
      const { _id } = args;
      const activitie = await Activitie.findByIdAndDelete(_id);
      if (!activitie) {
        throw new UserInputError("Activitie not found", {
          invalidArgs: args,
        });
      }
      return "Activitie deleted successfully";
    },
  },
};
