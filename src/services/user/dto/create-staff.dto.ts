import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Le nom est requis.' })
  @IsString({ message: 'Le nom doit être une chaîne de caractères.' })
  name: string;

  @IsNotEmpty({ message: 'Le matricule est requis.' })
  @IsString({ message: 'Le matricule doit être une chaîne de caractères.' })
  matricule: string; // Ajout du matricule

  @IsNotEmpty({ message: 'L\'email est requis.' })
  @IsEmail({}, { message: 'L\'email doit être valide.' })
  email: string;

  @IsNotEmpty({ message: 'Le téléphone est requis.' })
  @IsString({ message: 'Le téléphone doit être une chaîne de caractères.' })
  phone: string;

  @IsNotEmpty({ message: 'Le mot de passe est requis.' })
  @IsString({ message: 'Le mot de passe doit être une chaîne de caractères.' })
  password: string; // Ajout du password

  @IsNotEmpty({ message: 'Le rôle est requis.' })
  @IsString({ message: 'Le rôle doit être une chaîne de caractères.' })
  role: string;

  @IsNotEmpty({ message: 'Le poste est requis.' })
  @IsString({ message: 'Le poste doit être une chaîne de caractères.' })
  position: string;
}
