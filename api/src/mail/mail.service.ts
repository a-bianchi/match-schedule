import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private configService: ConfigService,
  ) {}

  async sendUserConfirmation(code: string, email: string, token: string) {
    const url = `example.com/auth/confirm?token=${token}`;
    const email_from = this.configService.get<string>('EMAIL_FROM');

    await this.mailerService.sendMail({
      to: email,
      from: `"Support Team" <${email_from}>`,
      subject: '¡Bienvenido a Match App! Confirme su email',
      template: './confirmation',
      context: {
        name: 'Rey',
        code,
        url,
      },
    });
  }
}
