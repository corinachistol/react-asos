//class Money
import { Column } from 'typeorm';

export class Money {
    @Column ()
    id!:number;

    @Column({type:"numeric"})
    amount!: number; 

    @Column()
    currency!: string;
}
