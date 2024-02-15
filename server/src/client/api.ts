
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Client, Name } from "./entities.js";
import { getAllClientsOps, postClientOps } from "./schema.js";


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
        // prehandler:async (req:FastifyRequest, reply:FastifyReply) => {  

        // },
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

}






