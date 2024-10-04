import { Controller,Post,Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthPayLoad } from './dto/auth.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post()
    login(@Body() payload: AuthPayLoad) {
        return this.authService.login(payload);
    }
}
