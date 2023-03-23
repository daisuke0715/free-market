import { Module } from '@nestjs/common';
import { ItemsModule } from './features/items/items.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './features/auth/auth.module';

@Module({
  imports: [ItemsModule, DatabaseModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
