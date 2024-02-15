var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Product } from "./entities.js";
import { Money } from "../financial/entitites.js";
import { postProductSchema } from "./schema.js";
export function postProduct(fastify, options) {
    return __awaiter(this, void 0, void 0, function* () {
        fastify.route({
            method: "POST",
            url: '/products',
            schema: postProductSchema,
            handler: (request, reply) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const { name, image, priceAmount, priceCurrency } = request.body;
                    const newProduct = new Product();
                    newProduct.name = name;
                    newProduct.image = image;
                    newProduct.price = new Money();
                    newProduct.price.amount = priceAmount;
                    newProduct.price.currency = priceCurrency;
                    yield fastify.orm.manager.save(newProduct);
                    console.log('>>>>> item added');
                    reply.code(201).send(newProduct);
                }
                catch (error) {
                    reply.code(500).send({ error: 'Error adding a new product!' });
                }
            })
        });
    });
}
