import Fastify, { FastifyInstance,FastifyRequest, FastifyReply } from "fastify";
import { postProduct } from "./product/api.js";
import { Product } from "./product/entities.js";
import { clientRoutes, getAllClients, postClient } from "./client/api.js";
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

fastify.register(postProduct)
fastify.register(clientRoutes, {prefix: '/clients'})
fastify.register(authRoutes)

fastify.decorate('testMiddleware', async (request:FastifyRequest,reply:FastifyReply) => {
  console.log(">>>TEST")
  fastify.log.info(">>>TEST")
})

fastify.get('/', async (request,reply)=>{
    return {status:"active"}
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