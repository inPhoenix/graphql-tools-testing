import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"
import { schemaFromExecutor, wrapSchema } from "@graphql-tools/wrap"
import { buildHTTPExecutor } from "@graphql-tools/executor-http"
import { mergeSchemas } from "@graphql-tools/schema" // this version don't merge the schemas

// import { mergeSchemas } from "graphql-tools" // graphql-tools ^2.9.7 (It merge the schemas)

async function mergedSchema() {
  const starwars = "https://swapi-graphql.netlify.app/.netlify/functions/index"
  const rickandmorty = "https://rickandmortyapi.com/graphql"

  // starwars schema
  const remoteExecutor1 = buildHTTPExecutor({
    endpoint: starwars,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
  const schema1 = await schemaFromExecutor(remoteExecutor1)
  const executableSchema1 = wrapSchema({
    schema: schema1,
    executor: remoteExecutor1,
  })

  // rickandmorty schema
  const remoteExecutor2 = buildHTTPExecutor({
    endpoint: rickandmorty,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
  const schema2 = await schemaFromExecutor(remoteExecutor2)
  const executableSchema2 = wrapSchema({
    schema: schema2,
    executor: remoteExecutor2,
  })

  // Merge the schemas
  const mergedSchema = mergeSchemas({
    /* executableSchema1 will be overwritten by executableSchema2
    This will happen using @graphql-tools v10 but not with the v4
    * */
    schemas: [executableSchema1, executableSchema2],
  })

  return mergedSchema
}

const runServer = async () => {
  const server = new ApolloServer({
    schema: await mergedSchema(),
  })

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  })
  console.log(`🚀  Server ready at ${url}`)
}

try {
  runServer()
} catch (error) {
  console.error(error)
}
