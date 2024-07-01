import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { EnviarEmailDto } from './dto/enviar-email.dto';

@Injectable()
export class EnviarEmailService {
  private readonly logger = new Logger(EnviarEmailService.name);

  constructor(private mailerService: MailerService) {}

  async enviarWithTemplate(enviarEmailDto: EnviarEmailDto): Promise<void> {
    try {
      this.logger.log(
        `enviar email: ${enviarEmailDto.to} com o template ${enviarEmailDto.template}`,
      );

      await this.mailerService.sendMail(enviarEmailDto);

      this.logger.log(
        `enviar email [OK]: ${enviarEmailDto.to} com o template ${enviarEmailDto.template}`,
      );
    } catch (error) {
      this.logger.error(`enviar-email [ERROR]: ${error.message}`);
    }
  }
}
