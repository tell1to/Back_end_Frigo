import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Rol } from '../../rol/entities/rol.entity'; 


@Entity()
export class Usuario {
  @PrimaryColumn()
  cedula: number;

  @Column()
  nombre: string;

  @Column()
  correo: string;

  @Column()
  telefono: number;

  @ManyToOne(() => Rol, (rol) => rol.usuarios)
  @JoinColumn({ name: 'id_rol' })
  rol: Rol;
}
