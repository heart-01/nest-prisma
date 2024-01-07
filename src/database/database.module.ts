import { Global, Module } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Global() // set this module as global so that it can be used in other modules without importing it in
@Module({
  imports: [],
  controllers: [],
  providers: [DatabaseService],
  exports: [DatabaseService], // for use DI in other modules
})
export class DatabaseModule {}
