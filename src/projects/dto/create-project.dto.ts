import { IsString } from 'class-validator'

export class CreateProjectDto {

    @IsString()
    nombre: string;
}
