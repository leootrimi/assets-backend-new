import { Module } from '@nestjs/common';
import { EquipmentsController } from './equipments.controller';
import { EquipmentsService } from './equipments.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Equipments, EquipmentsSchema } from './schema/equipments.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Equipments.name, schema: EquipmentsSchema}
  ]),
  ClientsModule.register([{
        name: 'EQUIPMENTS_SERVICE',
        transport: Transport.REDIS,
        options: { host: 'redis', port: 6379 },
      
  }])
],
  controllers: [EquipmentsController],
  providers: [EquipmentsService]
})
export class EquipmentsModule {}
