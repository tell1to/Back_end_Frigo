import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './entities/cliente.entity';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { Usuario } from '../usuario/entities/usuario.entity';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepo: Repository<Cliente>,
  ) {}

  async create(dto: CreateClienteDto): Promise<Cliente> {
    const cliente = this.clienteRepo.create({
      cedula: dto.cedula,
      correo: dto.correo,
      telefono: dto.telefono,
      usuario: { cedula: dto.cedula_usuario } as Usuario,
    });
    return this.clienteRepo.save(cliente);
  }

  findAll(): Promise<Cliente[]> {
    return this.clienteRepo.find({ relations: ['usuario', 'pedidos'] });
  }

  async findOne(cedula: number): Promise<Cliente> {
    const cliente = await this.clienteRepo.findOne({
      where: { cedula },
      relations: ['usuario', 'pedidos'],
    });
    if (!cliente) {
      throw new NotFoundException(`Cliente con cédula ${cedula} no encontrado`);
    }
    return cliente;
  }

  async update(
    cedula: number,
    dto: UpdateClienteDto,
  ): Promise<Cliente> {
    const cliente = await this.findOne(cedula);
    Object.assign(cliente, dto);
    if (dto.cedula_usuario) {
      cliente.usuario = { cedula: dto.cedula_usuario } as Usuario;
    }
    return this.clienteRepo.save(cliente);
  }

  async remove(cedula: number): Promise<void> {
    const result = await this.clienteRepo.delete(cedula);
    if (result.affected === 0) {
      throw new NotFoundException(`Cliente con cédula ${cedula} no encontrado`);
    }
  }
}