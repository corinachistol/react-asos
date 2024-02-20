var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Fastify from "fastify";
import { productRoutes } from "./product/api.js";
import { Product } from "./product/entities.js";
import { clientRoutes } from "./client/api.js";
import { Client } from "./client/entities.js";
import { authRoutes } from "./auth/api.js";
import { Client_sessions } from "./auth/entities.js";
const fastify = Fastify({ logger: true });
fastify.register(import('fastify-typeorm-plugin'), {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'asos_ff_orm',
    username: 'postgres',
    password: 'postsql123',
    logging: true,
    synchronize: true,
    entities: [Product, Client, Client_sessions],
});
fastify.register(productRoutes, { prefix: '/products' });
fastify.register(clientRoutes, { prefix: '/clients' });
fastify.register(authRoutes);
fastify.decorate('testMiddleware', (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(">>>TEST");
    fastify.log.info(">>>TEST");
}));
fastify.get('/', (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    return { status: "active" };
}));
fastify.addHook('preHandler', (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    if (request.method === "PATCH" || request.method === "DELETE") {
        console.log("Update/Delete check");
        const { sessionId } = request.query;
        const { id } = request.params;
        if (!sessionId) {
            console.log("First");
            reply.code(401).send("Client not authorized!!!");
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
                if ((clientSession === null || clientSession === void 0 ? void 0 : clientSession.client.id) == id) {
                    console.log("SECOND!You are trying to update/delete your own data");
                }
                else if ((clientSession === null || clientSession === void 0 ? void 0 : clientSession.client.id) !== id) {
                    console.log("THIRD!You are not authorized to update/delete another user");
                    reply.code(401).send("You are not authorized to update/delete another user");
                }
            }
        }
    }
}));
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield fastify.listen({ port: 3000 });
    }
    catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
});
start();
