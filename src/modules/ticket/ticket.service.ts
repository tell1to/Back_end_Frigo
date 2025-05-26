import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from './entities/ticket.entity';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { PedidoService } from '../pedido/pedido.service';
import { TecnicoService } from '../tecnico/tecnico.service';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepo: Repository<Ticket>,
    private readonly pedidoService: PedidoService,
    private readonly tecnicoService: TecnicoService,
  ) {}

  async create(dto: CreateTicketDto): Promise<Ticket> {
    const pedido = await this.pedidoService.findOne(dto.id_pedido);
    const tecnico = await this.tecnicoService.findOne(dto.id_tecnico);
    const ticket = this.ticketRepo.create({
      estado: dto.estado,
      pedido,
      tecnico,
    });
    return this.ticketRepo.save(ticket);
  }

  findAll(): Promise<Ticket[]> {
    return this.ticketRepo.find({ relations: ['tecnico', 'pedido', 'reporte'] });
  }

  async findOne(id: number): Promise<Ticket> {
    const ticket = await this.ticketRepo.findOne({ where: { id_ticket: id }, relations: ['tecnico', 'pedido', 'reporte'] });
    if (!ticket) throw new NotFoundException(`Ticket ${id} no encontrado`);
    return ticket;
  }

  async update(id: number, dto: UpdateTicketDto): Promise<Ticket> {
    const ticket = await this.findOne(id);
    Object.assign(ticket, dto);

    if (dto.id_pedido) {
      const pedido = await this.pedidoService.findOne(dto.id_pedido);
      ticket.pedido = pedido;
    }

    if (dto.id_tecnico) {
      const tecnico = await this.tecnicoService.findOne(dto.id_tecnico);
      ticket.tecnico = tecnico;
    }

    return this.ticketRepo.save(ticket);
  }

  async remove(id: number): Promise<void> {
    const result = await this.ticketRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Ticket ${id} no encontrado`);
  }
}
