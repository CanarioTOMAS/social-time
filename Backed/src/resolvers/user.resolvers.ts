import User from "../schema/user";
import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";
import Business from "../schema/business";

module.exports = {
  Query: {
    findUser: async () => {
      return await User.find();
    },
    findOneUser: async (root: any, args: any) => {
      const idUser = args.id;
      const user = await User.findById(idUser);
      return user;
    },
  },
  User: {
    business: async (_: any, _args: any, context: any) => {
      return await Business.find({ user: context.user.id });
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
      console.log(args)
      const user = await User.findOne({
        email: args.email,
        password: args.password,
      });

      if (!user) {
        throw new GraphQLError("wrong credentials");
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
      if (!user) {
        throw new GraphQLError("Invalid token or user not found");
      }
      return "Token Ok";
    },
  },
};
