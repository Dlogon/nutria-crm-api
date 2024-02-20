import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private config: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.config.get('DB_HOST'),
      port: +this.config.get('FORWARD_DB_PORT'),
      username: this.config.get('DB_USERNAME'),
      password: this.config.get('DB_PASSWORD'),
      database: this.config.get('DB_DATABASE'),
      autoLoadEntities: true,
      synchronize: true,
      migrationsTableName: 'migrations',
    };
  }
}
