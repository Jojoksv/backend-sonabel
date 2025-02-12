import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMissionDto } from './dto/create-mission.dto';
import { UpdateMissionDto } from './dto/update-mission.dto';
import { PrismaService } from '../services/prisma.service';

@Injectable()
export class MissionsService {
  constructor(private prisma: PrismaService) {}

  async create(createMissionDto: CreateMissionDto) {
    return await this.prisma.mission.create({
      data: createMissionDto,
    });
  }

  async findAll() {
    return await this.prisma.mission.findMany();
  }

  async findOne(id: string) {
    const mission = await this.prisma.mission.findUnique({ where: { id } });
    if (!mission) throw new NotFoundException(`Mission #${id} not found`);
    return mission;
  }

  async update(id: string, updateMissionDto: UpdateMissionDto) {
    return await this.prisma.mission.update({
      where: { id },
      data: updateMissionDto,
    });
  }

  async updateStatus(id: string, updateMissionStatusDto: any) {
    return await this.prisma.mission.update({
      where: { id },
      data: updateMissionStatusDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.mission.delete({ where: { id } });
  }
}
