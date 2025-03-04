import { Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { PrismaService } from '../services/prisma.service';

@Injectable()
export class ReportService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateReportDto) {
    return this.prisma.report.create({ data });
  }

  async findAll() {
    return this.prisma.report.findMany({ include: { author: true, mission: true } });
  }

  async findOne(id: string) {
    return this.prisma.report.findUnique({ where: { id }, include: { author: true, mission: true } });
  }

  async update(id: string, updateReportDto: UpdateReportDto) {
    return this.prisma.report.update({
      where: { id },
      data: updateReportDto, // Mise à jour des champs envoyés
    });
  }

  async remove(id: string) {
    return this.prisma.report.delete({ where: { id } });
  }
}
