import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Cliente } from '../../cliente/entities/cliente.entity';

@Entity()
export class Pedido {
  @PrimaryGeneratedColumn()
  id_pedido: number;

  @Column()
  detalle: string;

  @Column()
  provincia: string;

  @Column()
  ciudad: string;

  @Column()
  callePrincipal: string;

  @Column()
  calleSecundaria: string;

  @Column()
  codigo_postal: number;

  @ManyToOne(() => Cliente, (cliente) => cliente.pedidos)
  @JoinColumn({ name: 'cedula_cliente' })
  cliente: Cliente;
}
