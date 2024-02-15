import {BaseEntity, 
        Column,
        Entity,
        PrimaryGeneratedColumn} from 'typeorm'

export class Name{
    @Column()
    first!:string

    @Column()
    last!:string
}


@Entity()
export class Client extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!:string

    @Column(()=>Name)
    name!:Name

    
    // @Column({ type: 'timestamp', nullable: true })
    // dateOfBirth!: Date;

    @Column()
    address!:string

    @Column()
    phone!: number

    @Column({unique: true})
    email!: string

    @Column({length:8})
    password!:string

}