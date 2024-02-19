
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Client, Name } from "./entities.js";
import { postClientOps } from "./schema.js";
import { Client_sessions } from "../auth/entities.js";


// const fastify: FastifyInstance = Fastify({logger:true})

export async function clientRoutes(fastify:FastifyInstance,options){
    fastify.get('/',  async (request:FastifyRequest, reply:FastifyReply) => {
           const clients = await fastify.orm
               .getRepository(Client)
               .createQueryBuilder('clients')
               .getMany()
            
            let result = clients.map(client => {
                return {
                    id: client.id,
                    name: `${client.name.first} ${client.name.last}`
                }
               });
   
           reply.code(200).send({result})
    })

    fastify.post('/add', postClientOps, async (request:FastifyRequest, reply:FastifyReply) => {
        try {
            const { first_name, last_name, address, phone, email, password } = request.body
            const newClient = new Client()
            newClient.name = new Name();

            newClient.name.first = first_name,
            newClient.name.last = last_name,
            newClient.phone = phone,
            // newClient.dateOfBirth = dateOfBirth,
            newClient.email = email,
            newClient.address =  address,
            newClient.password = password,
            console.log(newClient)
            
            await fastify.orm.manager.save(newClient)
            return reply.code(201).send({newClient})
        } catch (error) {
            return reply.code(500).send({error: 'Error adding a new client!'})
        }              
    })

    fastify.route({
        method: "GET",
        url: "/:id",
        preHandler:async (req:FastifyRequest,reply:FastifyReply) => {
            const {sessionId} = req.query
            const { id } = req.params

            const queryClient = await fastify.orm
                .getRepository(Client)
                .createQueryBuilder("client")
                .where("client.id = :id", {id} )
                .getOne()
            
            if(!sessionId){
                if(!queryClient){
                    console.log("First")
                    reply.send(`Client with id ${id} is missing in the database!!!`)
                }else{
                    console.log("Second")
                    reply.send({
                        id: queryClient.id,
                        name:queryClient.name
                    })
                }
            }else{
                const clientSession = await fastify.orm
                    .getRepository(Client_sessions)
                    .createQueryBuilder("session")
                    .leftJoinAndSelect("session.client", "client.id")
                    .where("session.session_id = :sessionId", {sessionId} )
                    .getOne()
                console.log(clientSession)

                if(clientSession !== undefined){
                    if(id == clientSession?.client.id ){
                        console.log("Third")
                        reply.send({queryClient})
                    }else {
                        console.log("Forth")
                        reply.send({
                            id: queryClient?.id,
                            name:queryClient?.name
                        })
                    }
                }
            }
        },
        handler:async (req:FastifyRequest, reply:FastifyReply) => {
            const { id } = req.params
            // console.log(req)
            const res = await fastify.orm
                .getRepository(Client)
                .createQueryBuilder("client")
                .where("client.id = :id", {id} )
                .getOne()
            console.log(res)
        }
    })

    fastify.patch('/:id',async (req:FastifyRequest,reply:FastifyReply) => {
        try {
            const {id} = req.params
            const { first_name, last_name, address, phone, email, password } = req.body
           
            const new_client = await fastify.orm
                .createQueryBuilder()
                .update(Client)
                .set({ 
                    name : {
                        first: first_name,
                        last: last_name
                    }, 
                    address: address,
                    phone: phone,
                    password: password,
                    email: email

                })
                .where("id = :id", { id })
                .execute()
                
            return reply.send({new_client})

            
            
        } catch (error) {
            console.log(error)
        }
    })

    fastify.delete('/:id', async (req,reply) => {
        const {id} = req.params
        try {
            const res = await fastify.orm
                .getRepository(Client)
                .createQueryBuilder('client')
                .delete()
                .from(Client)
                .where("client.id = :id", { id })
                .execute();
            console.log(`client id: ${id} was deleted`)
            return reply.code(200).send({ status: "success",res})

        } catch (error) {
            console.log(error)
            return reply.code(500).send({ message: "Internal Server Error" });
        }
    })

}






