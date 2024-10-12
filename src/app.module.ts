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
import { UserProfile } from './schemas/user_profile.entity';
import { Password } from './schemas/password.entity';
import { Experience } from './schemas/experience.entity';
import { Education } from './schemas/education.entity';
import { Social } from './schemas/social.entity';
import { UserPost } from './schemas/user_post.entity';
import { PostLikes } from './schemas/post_likes.entity';

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
