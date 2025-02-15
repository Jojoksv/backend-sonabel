import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateMissionDto {
  @IsNotEmpty()
  @IsString()
  title: string; // ✅ Ajout du champ title

  @IsNotEmpty()
  @IsString()
  description: string; // ✅ Ajout du champ title

  @IsNotEmpty()
  @IsString()
  responsible: string;

  @IsNotEmpty()
  @IsString()
  destination: string;

  @IsNotEmpty()
  @IsString()
  missionObject: string;

  @IsOptional()
  @IsString()
  priority?: string;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  assignment?: string[]

  @IsOptional()
  @IsString()
  observations?: string;

  @IsNotEmpty()
  @Type(() => Date) // ✅ Convertit automatiquement en `Date`
  @IsDate()
  startDate: Date;

  @IsNotEmpty()
  @Type(() => Date) // ✅ Convertit automatiquement en `Date`
  @IsDate()
  endDate: Date;

  @IsNotEmpty() // ✅ Ajout du champ `userId`
  @IsString()
  @IsOptional()
  userId: string;
}
