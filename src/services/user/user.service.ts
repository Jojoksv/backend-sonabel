import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/create-staff.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getUser({ userId }: { userId: string }) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        matricule: true,
        name: true,
      },
    });

    return user;
  }

  async create(createStaffDto: CreateUserDto) {
    const data = {
      ...createStaffDto,
      role: 'STAFF',
    }
    return this.prisma.user.create({ data: data });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: string) {
    const staff = await this.prisma.user.findUnique({ where: { id } });
    if (!staff) throw new NotFoundException(`Staff #${id} not found`);
    return staff;
  }

  async update(id: string, updateStaffDto: CreateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: updateStaffDto,
    });
  }

  async remove(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }
}
