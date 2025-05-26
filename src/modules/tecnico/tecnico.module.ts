import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tecnico } from './entities/tecnico.entity';
import { TecnicoService } from './tecnico.service';
import { TecnicoController } from './tecnico.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Tecnico])],
  controllers: [TecnicoController],
  providers: [TecnicoService],
  exports: [TecnicoService], // ✅ EXPORTAR para que TicketModule lo use
})
export class TecnicoModule {}


