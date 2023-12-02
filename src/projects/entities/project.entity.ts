import { User } from "src/auth/entities/user.entity";
import { Task } from "src/task/entities/task.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity('projects')
export class Project {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre: string;

    @Column()
    descripcion: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    fechaCreacion: Date;

    @ManyToOne(
        () => User,
        usuario => usuario.proyectos
    )
    usuario: User;

    @OneToMany(
        () => Task,
        tarea => tarea.proyecto,
        { cascade: true }
    )
    tareas: Task[];

}
