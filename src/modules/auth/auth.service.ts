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

    // async register(requestBody: UserType): Promise<string> {
    //     // extracting user data
    //     const { first_name, second_name, age, email, password, role } = requestBody;

    //      // Verificar si el usuario ya está registrado
    //     const userExists: User = await this.userRepository.findOne({ where: { email } });

    //     if (userExists) {
    //         throw new ConflictException('Email already in use');
    //     }

    //     // Insertar el usuario
    //     const userModel = this.userRepository.create({ name, second_name, age, email, role });
    //     const userRegistered = await this.userRepository.save(userModel);

    //     // Hash de la contraseña
    //     const userPassword = await bcrypt.hash(password, parseInt(process.env.PASSWORD_HASH));

    //     // Insertar contraseña
    //     const passwordModel: Password = this.passwordRepository.create({
    //         id_user: userRegistered.id,
    //         user_password: userPassword
    //     });

    //     await this.passwordRepository.save(passwordModel);
        
    //     return this.signJWToken({ "email": userRegistered.email, "password":passwordModel.user_password  });
    // }

    signJWToken(data) {
        return jwt.sign({
            data
        }, 'secret', { expiresIn: process.env.JWT_EXP_TIME })
    }
}
