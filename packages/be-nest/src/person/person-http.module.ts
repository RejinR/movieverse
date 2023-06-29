import { Module } from '@nestjs/common';
import { PersonModule } from './person.module';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';

@Module({
  imports: [PersonModule],
  providers: [PersonService],
  controllers: [PersonController],
})
export class PersonHttpModule {}
