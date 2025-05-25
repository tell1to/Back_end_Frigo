import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  create(@Body() dto: CreateUsuarioDto) {
    return this.usuarioService.create(dto);
  }

  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }

  @Get(':cedula')
  findOne(@Param('cedula') cedula: number) {
    return this.usuarioService.findOne(cedula);
  }

  @Put(':cedula')
  update(@Param('cedula') cedula: number, @Body() dto: UpdateUsuarioDto) {
    return this.usuarioService.update(cedula, dto);
  }

  @Delete(':cedula')
  remove(@Param('cedula') cedula: number) {
    return this.usuarioService.remove(cedula);
  }
}
