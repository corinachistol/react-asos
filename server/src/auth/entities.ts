import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { Client } from "../client/entities.js";

@Entity()
export class Client_sessions {
    @PrimaryGeneratedColumn("uuid")
    session_id!: string;

    @OneToOne( () => Client, client => client.id, { onDelete: "CASCADE" })
    @JoinColumn()
    client!: Client;

}