import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { Pedido } from '../../pedido/entities/pedido.entity';

@Entity()
export class Cliente {
  @PrimaryColumn()
  cedula: number;

  @Column()
  nombre: string;

  @Column()
  correo: string;

  @Column()
  telefono: number;

@ManyToOne(() => Usuario, { nullable: false })
@JoinColumn({ name: 'cedula_usuario' })
usuario: Usuario;


  @OneToMany(() => Pedido, (pedido) => pedido.cliente)
  pedidos: Pedido[];
}
