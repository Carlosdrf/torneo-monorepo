import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateCombatDto {
  @IsUUID()
  @IsNotEmpty()
  winnerId!: string;

  @IsUUID()
  @IsNotEmpty()
  loserId!: string;
}
