import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUsuarioDto {
  @IsNumber()
  cedula: number;

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsEmail()
  correo: string;

  @IsNumber()
  telefono: number;

  @IsNumber()
  id_rol: number;
}
