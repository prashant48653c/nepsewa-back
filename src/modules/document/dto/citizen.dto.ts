// src/user/dto/create-user.dto.ts
import { IsString, IsInt, IsDateString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsInt()
  age: number;

  @IsString()
  placeOfBirth: string;

  @IsDateString()
  dob: string;

  @IsString()
  address: string;

  @IsString()
  fatherName: string;

  @IsString()
  motherName: string;

  @IsString()
  contact: string;
  

  
}
