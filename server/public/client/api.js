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
import { Client_sessions } from "../auth/entities.js";
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
            preHandler: (req, reply) => __awaiter(this, void 0, void 0, function* () {
                const { sessionId } = req.query;
                const { id } = req.params;
                const queryClient = yield fastify.orm
                    .getRepository(Client)
                    .createQueryBuilder("client")
                    .where("client.id = :id", { id })
                    .getOne();
                if (!sessionId) {
                    if (!queryClient) {
                        console.log("First");
                        reply.send(`Client with id ${id} is missing in the database!!!`);
                    }
                    else {
                        console.log("Second");
                        reply.send({
                            id: queryClient.id,
                            name: queryClient.name
                        });
                    }
                }
                else {
                    const clientSession = yield fastify.orm
                        .getRepository(Client_sessions)
                        .createQueryBuilder("session")
                        .leftJoinAndSelect("session.client", "client.id")
                        .where("session.session_id = :sessionId", { sessionId })
                        .getOne();
                    console.log(clientSession);
                    if (clientSession !== undefined) {
                        if (id == (clientSession === null || clientSession === void 0 ? void 0 : clientSession.client.id)) {
                            console.log("Third");
                            reply.send({ queryClient });
                        }
                        else {
                            console.log("Forth");
                            reply.send({
                                id: queryClient === null || queryClient === void 0 ? void 0 : queryClient.id,
                                name: queryClient === null || queryClient === void 0 ? void 0 : queryClient.name
                            });
                        }
                    }
                }
            }),
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
        fastify.patch('/:id', (req, reply) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { first_name, last_name, address, phone, email, password } = req.body;
                const new_client = yield fastify.orm
                    .createQueryBuilder()
                    .update(Client)
                    .set({
                    name: {
                        first: first_name,
                        last: last_name
                    },
                    address: address,
                    phone: phone,
                    password: password,
                    email: email
                })
                    .where("id = :id", { id })
                    .execute();
                return reply.send({ new_client });
            }
            catch (error) {
                console.log(error);
            }
        }));
        fastify.delete('/:id', (req, reply) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const res = yield fastify.orm
                    .getRepository(Client)
                    .createQueryBuilder('client')
                    .delete()
                    .from(Client)
                    .where("client.id = :id", { id })
                    .execute();
                console.log(`client id: ${id} was deleted`);
                return reply.code(200).send({ status: "success", res });
            }
            catch (error) {
                console.log(error);
                return reply.code(500).send({ message: "Internal Server Error" });
            }
        }));
    });
}
