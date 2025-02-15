import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-staff.dto';

export class UpdateStaffDto extends PartialType(CreateUserDto) {}
