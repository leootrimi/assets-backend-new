import { Module } from '@nestjs/common';
import { HolidaysController } from './holidays.controller';
import { HolidaysService } from './holidays.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Holiday, HolidaySchema } from './schema/holidays.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Holiday.name, schema: HolidaySchema}
  ])],
  controllers: [HolidaysController],
  providers: [HolidaysService]
})
export class HolidaysModule {}
