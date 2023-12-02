
import { Project } from "src/projects/entities/project.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('tasks')
export class Task {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column("text")
    nombre: string;

    @Column("text")
    descripcion: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    fechaCreacion: Date;

    @Column({ default: false })
    enProgreso: boolean;

    @Column({ default: false })
    completada: boolean;

    @ManyToOne(
        () => Project,
        proyecto => proyecto.tareas
    )
    proyecto: Project;

}
