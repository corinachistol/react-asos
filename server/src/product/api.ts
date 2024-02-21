import  { FastifyInstance,FastifyRequest, FastifyReply } from "fastify";
import { Product } from "./entities.js";
import { Money } from "../financial/entitites.js";
import { postProductSchema } from "./schema.js";


// const fastify: FastifyInstance = Fastify({logger:true})

export async function productRoutes(fastify:FastifyInstance, options: object) {
    fastify.route({
        method: "POST",
        url: '/',
        schema:postProductSchema,
        handler: async (request:FastifyRequest, reply:FastifyReply ) => {
            try {
                const {name, image, priceId, priceAmount, priceCurrency} = request.body
                // console.log(name, amount, currency)

                const newProduct = new Product()
                newProduct.name = name;
                // newProduct.id = id;
                newProduct.image = image;
                newProduct.price = new Money();
                newProduct.price.id = priceId;
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

    fastify.get('/', async (req:FastifyRequest,reply:FastifyReply) =>{
        try {
            const products = await fastify.orm
                .getRepository(Product)
                .createQueryBuilder("products")
                .getMany()
            
            reply.code(200).send({products})
        } catch (error) {
            reply.code(500).send({error: 'Products cannot be loaded!'})
        }
    })

    fastify.get('/:id', async (req:FastifyRequest,reply:FastifyReply) =>{
        try {
            const {id} = req.params

            const product = await fastify.orm
                .getRepository(Product)
                .createQueryBuilder("products")
                .where("product.id = :id", {id} )
                .getOne()
            
            reply.code(200).send({product})
        } catch (error) {
            reply.code(500).send({error: 'Product cannot be loaded!'})
        }
    })


}


