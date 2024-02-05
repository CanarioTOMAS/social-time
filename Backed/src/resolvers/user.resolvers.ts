import User from "../schema/user";
import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";
import Business from "../schema/business";

module.exports = {
 
  User: {
    business: async (_: any, _args: any, context: any) => {
      return await Business.find({ user: context.user.id });
    },
  },
  Query: {
    getLoggedInUserId: async (_: any, _args: any, context: any) => {
      // Verifica si el usuario está autenticado en el contexto
      if (!context.user || !context.user.id) {
        throw new GraphQLError("Usuario no autenticado");
      }
      return context.user.id;
    },
    getLoggedInUserInfo: async (_: any, _args: any, context: any) => {
      // Verifica si el usuario está autenticado en el contexto
      if (!context.user || !context.user.id) {
        throw new GraphQLError("Usuario no autenticado");
      }
      // Utiliza el ID del usuario en el contexto para buscar la información completa del usuario
      const userInfo = await User.findById(context.user.id);
      return userInfo;
    },
  },
  Mutation: {
    //create our mutation:
    createUser: async (root: any, args: any) => {
      const user = new User({
        name: args.name,
        surname: args.surname,
        email: args.email,
        password: args.password,
        role: args.role,
        image: args.image,
        address: args.address,
        gender: args.gender,
        phone: args.phone,
        deleted: false,
      });

      return await user.save().catch((error) => {
        throw new GraphQLError("Error creando el usuario. " + error, {
          extensions: {
            code: "ERROR_CREATING_USER",
          },
        });
      });
    },
    login: async (root: any, args: any) => {
      const user = await User.findOne({
        email: args.email,
        password: args.password,
      });
      if (!user) {
        throw new GraphQLError("wrong credentials");
      }
      if (user.deleted){
        throw new GraphQLError("User Deleted");
      }

      const userForToken = {
        email: user.email,
        id: user._id,
      };

      return {
        value: jwt.sign(userForToken, "SOCIALUP"),
        id: user._id,
      };
    },
    validateToken: async (root: any, args: any) => {
      const decodedToken = jwt.decode(args.token);

      if (!decodedToken || typeof decodedToken !== "object") {
        throw new GraphQLError("Invalid token");
      }
      const user = await User.findOne({
        email: decodedToken.email,
        id: decodedToken.id,
      });
      if (!user || user.deleted) {
        throw new GraphQLError("Invalid token or user not found");
      }
      
      return "Token Ok";
    },
    deleteUser: async (_: any, _args: any, context: any) => {
      const user = await User.findByIdAndUpdate(_args.id, { deleted: true });
      return user;
    }

  },
};
