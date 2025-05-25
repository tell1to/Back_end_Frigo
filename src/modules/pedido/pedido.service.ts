import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido } from './entities/pedido.entity';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { Cliente } from '../cliente/entities/cliente.entity';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(Pedido)
    private readonly pedidoRepo: Repository<Pedido>,
  ) {}

  create(dto: CreatePedidoDto): Promise<Pedido> {
    const pedido = this.pedidoRepo.create({
      detalle: dto.detalle,
      ciudad: dto.ciudad,
      callePrincipal: dto.callePrincipal,
      calleSecundaria: dto.calleSecundaria,
      codigo_postal: dto.codigo_postal,
      cliente: { cedula: dto.cedula_cliente } as Cliente,
    });
    return this.pedidoRepo.save(pedido);
  }

  findAll(): Promise<Pedido[]> {
    return this.pedidoRepo.find({ relations: ['cliente'] });
  }

  async findOne(id: number): Promise<Pedido> {
    const pedido = await this.pedidoRepo.findOne({
      where: { id_pedido: id },
      relations: ['cliente'],
    });
    if (!pedido) throw new NotFoundException(`Pedido con id ${id} no encontrado`);
    return pedido;
  }

  async update(id: number, dto: UpdatePedidoDto): Promise<Pedido> {
    const pedido = await this.findOne(id);
    Object.assign(pedido, dto);
    if (dto.cedula_cliente) {
      pedido.cliente = { cedula: dto.cedula_cliente } as Cliente;
    }
    return this.pedidoRepo.save(pedido);
  }

  async remove(id: number): Promise<void> {
    const result = await this.pedidoRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Pedido con id ${id} no encontrado`);
    }
  }
}