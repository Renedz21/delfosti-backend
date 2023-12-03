import { IsNotEmpty, IsString } from 'class-validator'

export class CreateTaskDto {

    @IsString()
    @IsNotEmpty({
        message: 'El nombre es requerido'
    })
    nombre: string

    @IsString()
    descripcion: string
}
