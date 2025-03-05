import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateReportDto {
    @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  authorId: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsNotEmpty()
  @IsString()
  missionId: string;
}
