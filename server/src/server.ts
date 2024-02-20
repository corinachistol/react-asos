import Fastify, { FastifyInstance,FastifyRequest, FastifyReply } from "fastify";
import { productRoutes } from "./product/api.js";
import { Product } from "./product/entities.js";
import { clientRoutes} from "./client/api.js";
import { Client } from "./client/entities.js";
import { authRoutes } from "./auth/api.js";
import { Client_sessions } from "./auth/entities.js";


const fastify: FastifyInstance = Fastify({logger:true})

fastify.register(import('fastify-typeorm-plugin'),{
  type: 'postgres',
  host:'localhost',
  port: 5432,
  database: 'asos_ff_orm',
  username: 'postgres',
  password: 'postsql123',
  logging: true,
  synchronize: true,
  entities: [Product,Client,Client_sessions],
})

fastify.register(productRoutes, {prefix:'/products'})
fastify.register(clientRoutes, {prefix: '/clients'})
fastify.register(authRoutes)

fastify.decorate('testMiddleware', async (request:FastifyRequest,reply:FastifyReply) => {
  console.log(">>>TEST")
  fastify.log.info(">>>TEST")
})

fastify.get('/', async (request,reply)=>{
    return {status:"active"}
})

fastify.addHook('preHandler', async(request:FastifyRequest,reply:FastifyReply) => {
  if(request.method === "PATCH" || request.method === "DELETE"){
      console.log("Update/Delete check")
      const {sessionId} = request.query
      const {id} = request.params

      // const queryClient = await fastify.orm
      //     .getRepository(Client)
      //     .createQueryBuilder("client")
      //     .where("client.id = :id", {id} )
      //     .getOne()
      // console.log(queryClient)

      if(!sessionId){
          console.log("First")
          reply.code(401).send("Client not authorized!!!")

      }else{
          const clientSession = await fastify.orm
            .getRepository(Client_sessions)
            .createQueryBuilder("session")
            .leftJoinAndSelect("session.client", "client.id")
            .where("session.session_id = :sessionId", {sessionId} )
            .getOne()
            console.log(clientSession)
            

          if(clientSession !== undefined){
              if(clientSession?.client.id == id){
                  console.log("SECOND!You are trying to update/delete your own data")
              }else if(clientSession?.client.id !== id){
                  console.log("THIRD!You are not authorized to update/delete another user")
                  reply.code(401).send("You are not authorized to update/delete another user")
              }
          }
      }
  }
})

const start = async () =>{
    try {
        await fastify.listen({ port: 3000 })
      } catch (err) {
        fastify.log.error(err)
        process.exit(1)
      }
}

start()