import { Project } from "src/projects/entities/project.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column("text")
    name: string;

    @Column("text", {
        unique: true
    })
    email: string;

    @Column("text")
    password: string;

    @Column({ default: true })
    isActive: boolean;

    @Column({
        type: 'text',
        default: 'consumidor'
    })
    role: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @OneToMany(() => Project, proyecto => proyecto.usuario, { cascade: true })
    proyectos: Project[];

}
