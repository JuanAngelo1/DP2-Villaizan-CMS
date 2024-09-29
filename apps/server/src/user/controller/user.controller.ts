import { Controller, Post, Body, Get, Param, Delete, Put } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { Observable } from 'rxjs';
import {User} from '../models/user.interface';

@Controller('user')
export class UserController {

    constructor(private userService: UserService){}

    @Post()
    create(@Body()user: User): Observable<User>{
        return this.userService.create(user);

    }

    @Get(':id')
    findOne(@Param()params): Observable<User>{
        return this.userService.findOne(params.id);

    }

    @Get()
    findALl(): Observable<User[]>{
        return this.userService.findAll();
        
    }

    @Delete(':id')
    deleteOne(@Param('id') id: string): Observable<User>{
        return this.userService.deleteOne(Number(id));
    
    }

    @Put(':id')
    updateOne(@Param('id') id: number, @Body() user: User): Observable<any>{
        return this.userService.updateOne(id, user);
    }

}
