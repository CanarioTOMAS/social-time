import Business from "../schema/business";
import Client from "../schema/client";
import { GraphQLError } from "graphql";
import { UserInputError } from "apollo-server-core";

module.exports = {
  Query: {
    findOneBusiness: async (_: any, _args: any, context: any) => {
      console.log("user: ", context.user.id);
      console.log("business: ", _args._id);
      const business = await Business.findOne({
        user: context.user.id,
        _id: _args._id,
      }).exec();
      return business;
    },
    findUserBusiness: async (_: any, _args: any, context: any) => {
      const offset = (_args.pageCount - 1) * _args.perPage;
      if (_args._id) {
        const business = await Business.find({
          user: context.user.id,
          _id: _args._id,
          name: new RegExp(_args.searchWord, "i"),
        })
          .skip(offset)
          .limit(_args.perPage)
          .exec();
        return business;
      } else {
        const business = await Business.find({
          user: context.user.id,
          name: new RegExp(_args.searchWord, "i"),
        })
          .skip(offset)
          .limit(_args.perPage)
          .exec();
        return business;
      }
    },
  },
  Business: {
    client: async (business: any) => {
      return await Client.find({ business: business._id });
    },
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

      return business.save().catch((error) => {
        throw new GraphQLError("Error creando el negocio. " + error, {
          extensions: {
            code: "ERROR_CREATING_BUSINESS",
          },
        });
      });
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
      const idBusiness = _args._id;
      const business = await Business.findById(idBusiness);
      if (business) {
        await Client.deleteMany({ business: business._id });
        await Business.findByIdAndDelete(business._id);
        return "Negocio Borrado";
      } else {
        throw new GraphQLError("Error eliminando el negocio.", {
          extensions: {
            code: "ERROR_DELETING_BUSINESS",
          },
        });
      }
    },
  },
};
