var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Client, Name } from "./entities.js";
import { postClientOps } from "./schema.js";
export function clientRoutes(fastify, options) {
    return __awaiter(this, void 0, void 0, function* () {
        fastify.get('/', (request, reply) => __awaiter(this, void 0, void 0, function* () {
            const clients = yield fastify.orm
                .getRepository(Client)
                .createQueryBuilder('clients')
                .getMany();
            let result = clients.map(client => {
                return {
                    id: client.id,
                    name: `${client.name.first} ${client.name.last}`
                };
            });
            reply.code(200).send({ result });
        }));
        fastify.post('/add', postClientOps, (request, reply) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { first_name, last_name, address, phone, email, password } = request.body;
                const newClient = new Client();
                newClient.name = new Name();
                newClient.name.first = first_name,
                    newClient.name.last = last_name,
                    newClient.phone = phone,
                    newClient.email = email,
                    newClient.address = address,
                    newClient.password = password,
                    console.log(newClient);
                yield fastify.orm.manager.save(newClient);
                return reply.code(201).send({ newClient });
            }
            catch (error) {
                return reply.code(500).send({ error: 'Error adding a new client!' });
            }
        }));
        fastify.route({
            method: "GET",
            url: "/:id",
            handler: (req, reply) => __awaiter(this, void 0, void 0, function* () {
                const { id } = req.params;
                const res = yield fastify.orm
                    .getRepository(Client)
                    .createQueryBuilder("client")
                    .where("client.id = :id", { id })
                    .getOne();
                console.log(res);
            })
        });
    });
}
