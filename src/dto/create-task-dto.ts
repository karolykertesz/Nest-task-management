import { IsNotEmpty, IsString } from 'class-validator';
export class CreatetaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;
  description: string;
}
