import { Controller, Logger } from '@nestjs/common';
import {
    Ctx,
    MessagePattern,
    Payload,
    RmqContext,
    Transport,
} from '@nestjs/microservices';
import { ChannelRef } from '../../shared/types/rabbitmq.type';
import { EnviarEmailDto } from './dto/enviar-email.dto';
import { EnviarEmailService } from './enviar-email.service';

@Controller('enviar-email')
export class EnviarEmailController {
  private readonly logger = new Logger(EnviarEmailController.name);
  constructor(private readonly enviarEmailService: EnviarEmailService) {}

  @MessagePattern('enviar-email', Transport.RMQ)
  async enviarEmail(
    @Payload() data: EnviarEmailDto,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef() as ChannelRef;
    const originalMsg = context.getMessage() as unknown;

    try {
      this.logger.log(
        `Mensagem recebida 'enviar-email': ${data.template} - ${data.to}`,
      );

      this.enviarEmailService.enviarWithTemplate(data);
      channel.ack(originalMsg);

      this.logger.log(
        `Mensagem recebida 'enviar-email [OK]': ${data.template} - ${data.to}`,
      );
    } catch (error) {
      this.logger.log(
        `Mensagem recebida 'enviar-email [ERROR]': ${error.message}`,
      );
    }
  }
}
