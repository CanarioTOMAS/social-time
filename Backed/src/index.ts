import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import jwt from "jwt-simple";
import mongoose from "mongoose";
import "dotenv/config";
import typesDefs from "./typeDefs";
import resolvers from "./Resolvers";
import { GraphQLError } from "graphql/error/GraphQLError";

mongoose.set("strictQuery", true);

// Objeto de opciones para la conexión a MongoDB
const dbOptions: mongoose.ConnectOptions = {
  
};

 console.log(process.env.DB_TDB +"://" + process.env.DB_USER +":" + process.env.DB_PWD +"@" + process.env.DB_HOST +":" + process.env.DB_PORT +"/" + process.env.DB_NAME);
mongoose.connect(
  process.env.DB_TDB +
    "://" +
    process.env.DB_USER +
    ":" +
    process.env.DB_PWD +
    "@" +
    process.env.DB_HOST +
    ":" +
    process.env.DB_PORT +
    "/" +
    process.env.DB_NAME,
  dbOptions // Pasa el objeto de opciones aquí
)
  .then(() => {
    console.log("La base de datos esta corriendo correctamente");
  })
  .catch((error) => {
    console.error("Error al conectar a la base de datos:", error);
  });

interface UserInterface {
  id: string;
  email: string;
}

interface MyContext {
  // we'd define the properties a user should have
  // in a separate user interface (e.g., email, id, url, etc.)
  user: UserInterface;
}


async function startApolloServer() {
  
  const server = new ApolloServer<any>({
    typeDefs: typesDefs,
    resolvers: resolvers,
    /*   formatError: (error) => {
      // Si el error es una instancia de ApolloError, se envía al cliente con el código de estado HTTP correcto
      if (error instanceof ApolloError) {
        return error;
      }

      // Si el error es "Invalid token", se responde con un error de autenticación (401)
      if (error.message === "Invalid token") {
        return new ApolloError("Invalid token", "UNAUTHENTICATED");
      }

      // En otros casos, se responde con un error genérico (500)
      return new ApolloError("Internal server error", "INTERNAL_SERVER_ERROR");
    },*/
  });

  const { url } = await startStandaloneServer<any>(server, {
    context: async ({ req, res }: { req: any; res: any }) => {
      if (req.body.query.match("login")) {
        return;
      }
      if (req.body.query.match("CreateUser")) {
        return;
      }

      const token = req.headers.authorization || "";

      try {
        const decodedToken = jwt.decode(token, "SOCIALUP");
        return { user: decodedToken };
      } catch (e) {
        throw new GraphQLError("User is not authenticated", {
          extensions: {
            code: "UNAUTHENTICATED",
            http: { status: 401 },
          },
        });
      }
    },
  });

  console.log(`🚀 Server listening at: ${url}`);
}

//in the end, run the server and pass in our Schema and Resolver.
startApolloServer();