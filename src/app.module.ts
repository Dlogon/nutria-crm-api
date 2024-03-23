import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LeadsModule } from './leads/leads.module';
import { AccountsModule } from './accounts/accounts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './config/database.config';
import { IndexModule } from './index/index.module';
@Module({
  imports: [
    AuthModule,
    UserModule,
    LeadsModule,
    AccountsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useClass: TypeOrmConfigService,
    }),
    IndexModule,
  ],
})
export class AppModule {}
