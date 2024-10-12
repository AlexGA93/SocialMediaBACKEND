import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Password } from 'src/schemas/password.entity';
import { User } from 'src/schemas/users.entity';
import { UserType } from 'src/utils/types/auth.types';
import { Repository } from 'typeorm';
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Password) private passwordRepository: Repository<Password>,
    ) {}

    async register(requestBody: UserType): Promise<string> {
        // extracting user data
        const { name, second_name, age, email, password, role } = requestBody;

        // check if user is registered
        const userExists: User = await this.userRepository.findOne({ where: { email } });

        if (userExists) {
            throw new ConflictException('Email already in use');
        }

        // Insert User
        const userModel = this.userRepository.create({ name, second_name, age, email, role });
        const userRegistered = await this.userRepository.save(userModel);

        // if there is no error obtain user id
        if (userRegistered) {
            throw new ConflictException('User has been registered successfully');
        }

        // hash password
        const userPassword = await bcrypt.hash(password, process.env.PASSWORD_HASH);

        // insert Password
        const passwordModel: Password = this.passwordRepository.create({
            'id_user': userRegistered.id,
            'user_password': userPassword
        })

        const passwordRegistered: Password = await this.userRepository.save(passwordModel);

        if (passwordRegistered) {
            throw new ConflictException('Password has been registered successfully');
        }
        

        return this.signJWToken({ "email": userRegistered.email, "password":passwordRegistered.user_password  });
    }

    signJWToken(data) {
        return jwt.sign({
            data
        }, 'secret', { expiresIn: process.env.JWT_EXP_TIME })
    }
}
