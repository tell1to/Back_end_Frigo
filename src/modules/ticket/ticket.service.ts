import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from './entities/ticket.entity';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Tecnico } from '../tecnico/entities/tecnico.entity';
import { Pedido } from '../pedido/entities/pedido.entity';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepo: Repository<Ticket>,
  ) {}

  create(dto: CreateTicketDto): Promise<Ticket> {
    const ticket = this.ticketRepo.create({
      tecnico: { id_tecnico: dto.id_tecnico } as Tecnico,
      pedido: { id_pedido: dto.id_pedido } as Pedido,
      estado: dto.estado,
    });
    return this.ticketRepo.save(ticket);
  }

  findAll(): Promise<Ticket[]> {
    return this.ticketRepo.find({ relations: ['tecnico', 'pedido', 'reporte'] });
  }

  async findOne(id: number): Promise<Ticket> {
    const ticket = await this.ticketRepo.findOne({
      where: { id_ticket: id },
      relations: ['tecnico', 'pedido', 'reporte'],
    });
    if (!ticket) {
      throw new NotFoundException(`Ticket con id ${id} no encontrado`);
    }
    return ticket;
  }

  async update(id: number, dto: UpdateTicketDto): Promise<Ticket> {
    const ticket = await this.findOne(id);
    Object.assign(ticket, dto);
    if (dto.id_tecnico) {
      ticket.tecnico = { id_tecnico: dto.id_tecnico } as Tecnico;
    }
    if (dto.id_pedido) {
      ticket.pedido = { id_pedido: dto.id_pedido } as Pedido;
    }
    return this.ticketRepo.save(ticket);
  }

  async remove(id: number): Promise<void> {
    const result = await this.ticketRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Ticket con id ${id} no encontrado`);
    }
  }
}