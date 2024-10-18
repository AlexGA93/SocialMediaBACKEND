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
import { User } from './schemas/users.entity';
import { Password } from './schemas/password.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env" , isGlobal: true}),
    TypeOrmModule.forRoot(constants.DATABASE.CONFIG),
    TypeOrmModule.forFeature([User, Password]),
    AuthModule,
    UserModule,
    ProfileModule,
    PostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
