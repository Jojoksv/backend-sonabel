import { IsNotEmpty, IsString } from "class-validator";

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

  @IsNotEmpty()
  @IsString()
  missionId: string;
}
