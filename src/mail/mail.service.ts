import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from '../users/entities/user.entity';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService){}

    async sendUserConfirmation(user: User):Promise<void>{
        const url = `${process.env.API_HOST}/api/users/activate/${user.activation_link}`
        console.log(url);
        await this.mailerService.sendMail({
            to: user.email,
            subject: "STADIUM ilovasiga xush kelibsiz! Elektron pochtangizni tasdiqlang!",
            template: "./confirmation",
            context: {
                name: user.first_name,
                url
            }
        })
    }
}
