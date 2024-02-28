import  { FastifyInstance,FastifyRequest, FastifyReply } from "fastify";
import { Product } from "./entities.js";
import { Money } from "../financial/entitites.js";
import { postProductSchema, productSchema } from "./schema.js";


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
                .where("products.id = :id", {id} )
                .getOne()
            
            reply.code(200).send({product})
        } catch (error) {
            reply.code(500).send({error: 'Product is missing in the database'})
        }
    })

    fastify.delete('/:id', async (req:FastifyRequest, reply:FastifyReply) => {
        const {id} = req.params
        try {
            const res = await fastify.orm
                .getRepository(Product)
                .createQueryBuilder('products')
                .delete()
                .from(Product)
                .where("product.id = :id", { id })
                .execute();
            console.log(`Products id: ${id} was deleted`)
            return reply.code(200).send({ status: "success",res})

        } catch (error) {
            console.log(error)
            return reply.code(500).send({ message: "Internal Server Error" });
        }
    })

     fastify.patch('/:id',async (req:FastifyRequest,reply:FastifyReply) => {
        try {
            const {id} = req.params
            const { name, image, priceId, priceAmount, priceCurrency } = req.body
           
            const new_product = await fastify.orm
                .createQueryBuilder()
                .update(Product)
                .set({ 
                    name: name,
                    image: image,
                    price : {
                        id:priceId,
                        amount: priceAmount,
                        currency: priceCurrency
                    }

                })
                .where("id = :id", { id })
                .execute()
                
            return reply.send({new_product})

            
            
        } catch (error) {
            console.log(error)
            return reply.code(500).send({ message: "Internal Server Error" });
        }
    })




}
// https://images.asos-media.com/products/asos-design-bust-cup-maxi-sundress-with-ruched-strap-detail-in-black/205628836-2?$n_240w$&wid=238&fit=constrain
// ASOS DESIGN bust cup maxi sundress with ruched strap detail in black
// 35
// https://images.asos-media.com/products/glamorous-v-neck-midi-tea-dress-in-red-daisy-print/205531025-2?$n_240w$&wid=238&fit=constrain
// Glamorous v neck midi tea dress in red daisy print
// 241
// https://images.asos-media.com/products/new-look-chevron-crochet-maxi-dress-in-black-and-white/205867768-2?$n_240w$&wid=238&fit=constrain
// New Look chevron crochet maxi dress in black and white
// 132


