import { IsString, IsEmail, MinLength } from 'class-validator';

export class RegisterAuthDto {
  @IsString()
  cedula: string;

  @IsString()
  nombre: string;

  @IsEmail()
  correo: string;

  @IsString()
  telefono: string;

  @IsString()
  @MinLength(6)
  password: string;
}
