import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserType } from 'src/utils/types/auth.types';

@Controller('auth')
export class AuthController {
    
    // Inject authentication service
    constructor(private authService: AuthService) {}

    // HTTP Requests
    @Post("/register")
    async register(@Body() requestBody: UserType) {
        return this.authService.register(requestBody)
    }
}
