import { Module } from '@nestjs/common';
import { EquipmentsController } from './equipments.controller';
import { EquipmentsService } from './equipments.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Equipments, EquipmentsSchema } from './schema/equipments.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Equipments.name, schema: EquipmentsSchema}
  ])],
  controllers: [EquipmentsController],
  providers: [EquipmentsService]
})
export class EquipmentsModule {}
