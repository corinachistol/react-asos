var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Client } from '../client/entities.js';
import { Client_sessions } from "./entities.js";
export function authRoutes(fastify, options) {
    return __awaiter(this, void 0, void 0, function* () {
        fastify.post('/signup', (req, reply) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const matchClient = yield fastify.orm
                    .getRepository(Client)
                    .createQueryBuilder("client")
                    .where("client.email = :email", { email })
                    .andWhere("client.password = :password", { password })
                    .getOne();
                console.log(matchClient);
                if (!matchClient) {
                    reply.code(401).send({ message: "Authorization failed, Wrond Credentials" });
                }
                else {
                    const newSession = new Client_sessions();
                    newSession.client = new Client();
                    newSession.client.id = matchClient.id;
                    yield fastify.orm.manager.save(newSession);
                    return reply.code(200).send({ status: "success", session_id: newSession.client.id });
                }
            }
            catch (error) {
                console.log(error);
                return reply.code(500).send({ message: "Internal Server Error" });
            }
        }));
        fastify.delete('/signout', (req, reply) => __awaiter(this, void 0, void 0, function* () {
            const { sessionId } = req.body;
            try {
                const res = yield fastify.orm
                    .getRepository(Client_sessions)
                    .createQueryBuilder()
                    .delete()
                    .from(Client_sessions)
                    .where("session_id = :sessionId", { sessionId })
                    .execute();
                console.log(`client session ${sessionId} was deleted`);
                return reply.code(200).send({ status: "success", res });
            }
            catch (error) {
                console.log(error);
                return reply.code(500).send({ message: "Internal Server Error" });
            }
        }));
    });
}
