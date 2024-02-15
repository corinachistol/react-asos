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
import { postProduct } from "./product/api.js";
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
fastify.register(postProduct);
fastify.register(clientRoutes, { prefix: '/clients' });
fastify.register(authRoutes);
fastify.decorate('testMiddleware', (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(">>>TEST");
    fastify.log.info(">>>TEST");
}));
fastify.get('/', (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    return { status: "active" };
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
