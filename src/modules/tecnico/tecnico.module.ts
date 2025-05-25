
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TecnicoController } from './tecnico.controller';
import { TecnicoService } from './tecnico.service';
import { Tecnico } from './entities/tecnico.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tecnico])],
  controllers: [TecnicoController],
  providers: [TecnicoService],
})
export class TecnicoModule {}
