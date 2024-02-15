var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { Client } from "../client/entities.js";
let Client_sessions = class Client_sessions {
};
__decorate([
    PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], Client_sessions.prototype, "session_id", void 0);
__decorate([
    OneToOne(() => Client, client => client.id, { onDelete: "CASCADE" }),
    JoinColumn(),
    __metadata("design:type", Client)
], Client_sessions.prototype, "client", void 0);
Client_sessions = __decorate([
    Entity()
], Client_sessions);
export { Client_sessions };
