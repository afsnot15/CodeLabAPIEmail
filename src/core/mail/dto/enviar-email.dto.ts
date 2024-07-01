import {
  IsArray,
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import Mail from 'nodemailer/lib/mailer';
import { IEmailAttachment } from '../../../shared/interfaces/email-attachment.interface';

export class EnviarEmailDto {
  @IsNotEmpty()
  @IsDefined()
  @IsEmail()
  to: string | string[];

  @IsNotEmpty()
  @IsDefined()
  subject: any;

  @IsNotEmpty()
  @IsDefined()
  context: any;

  @IsNotEmpty()
  @IsDefined()
  template: string;

  @IsOptional()
  @IsArray()
  attachments: IEmailAttachment[] | Mail.Attachment[];
}
