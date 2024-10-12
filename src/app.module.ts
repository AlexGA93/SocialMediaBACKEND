import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// external modules
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { constants } from './utils/constants';

// types
import { OrmModuleConfigType } from './utils/types/database.types';
import { UserModule } from './modules/user/user.module';
import { ProfileModule } from './modules/profile/profile.module';
import { PostModule } from './modules/post/post.module';
import { AuthModule } from './modules/auth/auth.module';

const typeOrmConfig: OrmModuleConfigType = {
      type: "mysql",
      host: constants.DATABASE.CONFIG.host,
      port: constants.DATABASE.CONFIG.port,
      username: constants.DATABASE.CONFIG.username,
      password: constants.DATABASE.CONFIG.password,
      database: constants.DATABASE.CONFIG.database,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: constants.DATABASE.CONFIG.synchronize
    };

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env" , isGlobal: true}),
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    ProfileModule,
    PostModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
