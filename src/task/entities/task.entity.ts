
import { Project } from "src/projects/entities/project.entity";
import { BeforeUpdate, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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

    @Column({
        default: 'pendiente',
    })
    estatus: string;

    @ManyToOne(
        () => Project,
        proyecto => proyecto.tareas
    )
    proyectoId: Project;

    @BeforeUpdate()
    setStatus() {
        this.estatus = this.estatus.toLowerCase()
            .trim()
            .replaceAll(' ', '_');
    }

}
