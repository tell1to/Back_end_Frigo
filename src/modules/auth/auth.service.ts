import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../usuario/usuario.service';
import * as bcrypt from 'bcrypt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService,
  ) { }

  async login(data: LoginAuthDto) {
    const usuario = await this.usuarioService.findByCorreo(data.correo);
    const isMatch = usuario && await bcrypt.compare(data.password, usuario.password);
    if (!isMatch) return { message: 'Credenciales inválidas' };

    const payload = { sub: usuario.cedula, role: usuario.rol?.nombre_rol };
    const access_token = this.jwtService.sign(payload);
    return { user: usuario, access_token: this.jwtService.sign(payload)  };
  }

  async register(data: RegisterAuthDto) {
    const password = await bcrypt.hash(data.password, 10);
    const newUser = await this.usuarioService.create({
      cedula: data.cedula,
      nombre: data.nombre,
      correo: data.correo,
      telefono: data.telefono,
      password,
      id_rol: 1,
    });
    /*const payload = {
      sub: newUser.cedula,
      role: newUser.rol?.nombre_rol,
    };
    const access_token = this.jwtService.sign(payload);
    return { user: newUser};*/
  }
}

