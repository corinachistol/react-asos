import  { FastifyInstance,FastifyRequest, FastifyReply } from "fastify";
import { Product } from "./entities.js";
import { Money } from "../financial/entitites.js";
import { postProductSchema } from "./schema.js";


// const fastify: FastifyInstance = Fastify({logger:true})

export async function postProduct(fastify:FastifyInstance, options: object) {
    fastify.route({
        method: "POST",
        url: '/products',
        schema:postProductSchema,
        handler: async (request:FastifyRequest, reply:FastifyReply ) => {
            try {
                const {name, image, priceAmount, priceCurrency} = request.body
                // console.log(name, amount, currency)

                const newProduct = new Product()
                newProduct.name = name;
                // newProduct.id = id;
                newProduct.image = image;
                newProduct.price = new Money();
                newProduct.price.amount = priceAmount;
                newProduct.price.currency = priceCurrency;
                
                await fastify.orm.manager.save(newProduct)
                    
                console.log('>>>>> item added')
                
                reply.code(201).send(newProduct)
      
    
            } catch (error) {
                reply.code(500).send({error: 'Error adding a new product!'})
            }      
    
        }
    })  
}


