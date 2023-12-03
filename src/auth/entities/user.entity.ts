import { Project } from "src/projects/entities/project.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @Column("text", {
        select: false
    })
    password: string;

    @Column({ default: true })
    isActive: boolean;

    @Column("text", {
        array: true,
        default: ['consumidor']
    })
    roles: string[];

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @OneToMany(() => Project, proyecto => proyecto.usuario, { cascade: true })
    proyectos: Project[];

    @BeforeInsert()
    checkField() {
        this.email = this.email.toLowerCase().trim();
    }

    @BeforeUpdate()
    checkFieldUpdate() {
        this.email = this.email.toLowerCase().trim();
    }
}
