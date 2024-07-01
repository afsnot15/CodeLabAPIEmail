import { MailerService } from '@nestjs-modules/mailer';
import { Test, TestingModule } from '@nestjs/testing';
import { EnviarEmailDto } from './dto/enviar-email.dto';
import { EnviarEmailService } from './enviar-email.service';

describe('EnviarEmailService', () => {
  let service: EnviarEmailService;
  let mailerService: MailerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EnviarEmailService,
        {
          provide: MailerService,
          useValue: {
            sendMail: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<EnviarEmailService>(EnviarEmailService);
    mailerService = module.get<MailerService>(MailerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('enviarWithTemplate', () => {
    it('enviarEmail', () => {
      const spy = jest
        .spyOn(mailerService, 'sendMail')
        .mockImplementation(async () => true);

      const enviarEmailDto: EnviarEmailDto = {
        to: 'teste@teste.com',
        subject: 'Recueração de Senha',
        context: {},
        template: 'recuperacao-senha',
      };

      service.enviarWithTemplate(enviarEmailDto);

      expect(spy).toHaveBeenCalled();
    });

    it('enviarEmail com erros', async () => {
      const spy = jest
        .spyOn(mailerService, 'sendMail')
        .mockRejectedValue(new Error('Erro ao enviar email'));

      const enviarEmailDto: EnviarEmailDto = {
        to: 'teste@teste.com',
        subject: 'Recueração de Senha',
        context: {},
        template: 'recuperacao-senha',
      };

      try {
        await service.enviarWithTemplate(enviarEmailDto);
      } catch (error) {
        expect(spy).toHaveBeenCalled();
        expect(error.message).toContain('Erro ao enviar email');
      }
    });
  });
});
