import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import {Client} from '../client/entities.js'
import { Client_sessions } from "./entities.js";

export async function authRoutes(fastify:FastifyInstance, options) {
    fastify.post('/signin', async (req:FastifyRequest, reply:FastifyReply) => {

        const {email, password} = req.body

        try {
            const matchClient = await fastify.orm
                    .getRepository(Client)
                    .createQueryBuilder("client")
                    .where("client.email = :email", {email} )
                    .andWhere("client.password = :password", {password})
                    .getOne()
            console.log(matchClient)
    
            if(!matchClient){
                reply.code(401).send({message: "Authorization failed, Wrond Credentials"})
            }else{
                const newSession = new Client_sessions()
                newSession.client = new Client()
                // console.log(newSession)
                newSession.client.id = matchClient.id
    
                // await fastify.orm.manager.transaction(async manager => {
                //     await manager.save(newSession)
                // } )  
                await fastify.orm.manager.save(newSession)
                return reply.code(200).send({status: "success",session_id: newSession.client.id })
            }
        } catch (error) {
            console.log(error)
            return reply.code(500).send({ message: "Internal Server Error" });
        }         
    })

    fastify.delete('/signout', async (req: FastifyRequest,reply:FastifyReply) => {
        const {sessionId} = req.body
        try {
            const res = await fastify.orm
                .getRepository(Client_sessions)
                .createQueryBuilder()
                .delete()
                .from(Client_sessions)
                .where("session_id = :sessionId", { sessionId })
                .execute();
            console.log(`client session ${sessionId} was deleted`)
            return reply.code(200).send({ status: "success",res})

        } catch (error) {
            console.log(error)
            return reply.code(500).send({ message: "Internal Server Error" });
        }
    })
}