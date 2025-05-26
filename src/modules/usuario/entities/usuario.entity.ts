// usuario.entity.ts
import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Rol } from '../../rol/entities/rol.entity';
import { Cliente } from '../../cliente/entities/cliente.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Usuario {
  @PrimaryColumn()
  cedula: string;

  @Column()
  nombre: string;

  @Column()
  correo: string;

  @Column()
  telefono: string;

  @Column()
  @Exclude()
  password: string;

  @ManyToOne(() => Rol, (rol) => rol.usuarios)
  @JoinColumn({ name: 'id_rol' })
  rol: Rol;

  @OneToMany(() => Cliente, (cliente) => cliente.usuario)
  clientes: Cliente[];
} 