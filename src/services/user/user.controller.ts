import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-staff.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  getUser({ userId }: { userId: string }) {
    return this.userService.getUser({ userId });
  }

  @Post()
  create(@Body() createStaffDto: CreateUserDto) {
    return this.userService.create(createStaffDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateStaffDto: CreateUserDto) {
    return this.userService.update(id, updateStaffDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
