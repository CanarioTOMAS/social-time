import Business from "../schema/business";
import User from "../schema/user";
import Client from "../schema/client";
import Rol from "../schema/rol";
import Project from "../schema/project";
import Activitie from "../schema/activitie";
import { GraphQLError } from "graphql";
import { UserInputError } from "apollo-server-core";

module.exports = {
  Query: {
    findOneBusiness: async (_: any, _args: any, context: any) => {
      const business = await Business.findOne({
        user: context.user.id,
        _id: _args._id,
      }).exec();
      return business;
    },
    findUserBusiness: async (_: any, _args: any, context: any) => {

      const user = await User.findOne({ _id: context.user.id });
      // Verificar si el usuario está marcado como eliminado
      if (user && user.deleted) {
        throw new GraphQLError("El usuario está marcado como eliminado");
      }
    
      const offset = (_args.pageCount - 1) * _args.perPage;

      if (_args._id) {
          const business = await Business.find({
          user: context.user.id,
          _id: _args._id,
          name: new RegExp(_args.searchWord, "i"),
          deleted: { $ne: true },
        })
          .skip(offset)
          .limit(_args.perPage)
          .exec();
        return business;
      } else {
        const business = await Business.find({
          user: context.user.id,
          name: new RegExp(_args.searchWord, "i"),
          deleted: { $ne: true },
        })
          .skip(offset)
          .limit(_args.perPage)
          .exec();
        return business;
      }
    },
  },

  Business: {
    client: async (business: any, _args: any) => {
        if (_args.idClient){
          return await Client.find({ business: business._id, _id: _args.idClient, deleted: { $ne: true } });
        }else{
          return await Client.find({ business: business._id, deleted: { $ne: true }});
        }
        
    }    
  },
  Client: {
    project: async (client: any, _args: any) => {
        return await Project.find({ client: client._id, deleted: { $ne: true } });
    }
  
  },
  Project: {
    activitie: async (project: any, _args: any) => {
      return await Activitie.find ({ project: project._id, user: _args.user, deleted: { $ne: true }})
    }
  },


  Mutation: {
    //create our mutation:
    addBusiness: async (_: any, _args: any, context: any) => {
      const user = context.user.id;
      const business = new Business({
        user: user,
        name: _args.name,
        address: _args.address,
        category: _args.category,
        email: _args.email,
        image: _args.image,
        phone: _args.phone,
      });
  

      let createdbusiness = business.save().catch((error) => {
        throw new GraphQLError("Error creando el negocio. " + error, {
          extensions: {
            code: "ERROR_CREATING_BUSINESS",
          },
        });
      });

      let newrolassigned = new Rol({
        user: user,
        business: (await createdbusiness)._id,
        roltype: "Owner",
      });

      newrolassigned.save().catch((error) => {
        throw new GraphQLError("Error creando algo. " + error, {
          extensions: {
            code: "ERROR_CREATING_SOME",
          },
        });
      });
      return business;
    },
    updateBusiness: async (_: any, _args: any, context: any) => {
      const { _id, ...updates } = _args;
      const business = await Business.findByIdAndUpdate(_id, updates, {
        new: true,
      });
      if (!business) {
        throw new UserInputError("Business not found", {
          invalidArgs: _args,
        });
      }
      return business;
    },
    deleteBusiness: async (_: any, _args: any, context: any) => {
      const business = await Business.findByIdAndUpdate(_args._id, { deleted: true });
      if (business) {
        return "Negocio Borrado";
      } else {
        throw new GraphQLError("Error eliminando el negocio.", {
          extensions: {
            code: "ERROR_DELETING_BUSINESS",
          },
        });
      }
    },
    addUserToBusiness: async (_: any, _args: any, context: any) => {
      const idBusiness = _args.idBussines;
      const idUser = _args.idUser;
      const business = await Business.findById(idBusiness);
      const user = await User.findById(idUser);
      
      if (business && user) {
        let newrol = new Rol({
          user: user,
          business: business,
          roltype: "Employee",
        });

        newrol.save().catch((error) => {
          throw new GraphQLError("Error registando el usuario. " + error, {
            extensions: {
              code: "ERROR_CREATING_ROL",
            },
          });
        });
      }
    },
  },
};
