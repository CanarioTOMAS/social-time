import { UserInputError } from "apollo-server-core";
import Activitie from "../schema/activitie";

module.exports = {
 
  Mutation: {
    //create our mutation:
    createActivitie: async (_: any, _args: any, context: any) => {
      const activitie = new Activitie({
        user: context.user.id,
        project: _args.project,
        name: _args.name,
        tiempoEstimado: _args.tiempoEstimado,
        costoHora: _args.costoHora,
        periocidad: _args.periocidad,
        colaboradores: _args.colaboradores
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
