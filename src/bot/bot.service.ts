import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Bot } from './models/bot.model';
import { BOT_NAME } from '../app.constants';
import { Context, Markup, Telegraf } from 'telegraf';
import { InjectBot } from 'nestjs-telegraf';

@Injectable()
export class BotService {
  constructor(
    @InjectModel(Bot) private botRepo: typeof Bot,
    @InjectBot(BOT_NAME) private readonly bot: Telegraf<Context>,
  ) {}

  async start(ctx: Context) {
    console.log("Salom");
    
    const userId = ctx.from.id;
    const user = await this.botRepo.findOne({
      where: { user_id: userId },
    });
    console.log(user);
    
    if (!user) {
      await this.botRepo.create({
        user_id: userId,
        first_name: ctx.from.first_name,
        last_name: ctx.from.last_name,
        username: ctx.from.username,
      });
      await ctx.reply(
        `Iltimos, <b>"☎️ Telefon raqamni yuborish"</b> tugmasini bosing!`,
        {
          parse_mode: 'HTML',
          ...Markup.keyboard([
            [Markup.button.contactRequest('☎️ Telefon raqamni yuborish')],
          ])
            .oneTime()
            .resize(),
        },
      );
    } else if (!user.status) {
      await ctx.reply(
        `Iltimos, <b>"☎️ Telefon raqamni yuborish"</b> tugmasini bosing!`,
        {
          parse_mode: 'HTML',
          ...Markup.keyboard([
            [Markup.button.contactRequest('☎️ Telefon raqamni yuborish')],
          ])
            .oneTime()
            .resize(),
        },
      );
    } else {
      await this.bot.telegram.sendChatAction(userId, 'typing');
      await ctx.reply(
        "Bu bot orqali Stadion dasturi bilan muloqot o'rnatiladi",
        {
          parse_mode: 'HTML',
          ...Markup.removeKeyboard(),
        },
      );
    }
  }

  async onContact(ctx: Context) {
    if ('contact' in ctx.message) {
      const userId = ctx.from.id;
      const user = await this.botRepo.findOne({ where: { user_id: userId } });
      if (!user) {
        ctx.reply(`Iltimos, <b>Start</b> tugmasini bosing!`, {
          parse_mode: 'HTML',
          ...Markup.keyboard(['/start']).oneTime().resize(),
        });
      } else if (ctx.message.contact.user_id != userId) {
        await ctx.reply("Iltimos, o'zingizni raqamingizni kiriting", {
          parse_mode: 'HTML',
          ...Markup.keyboard([
            [Markup.button.contactRequest('Telefon raqamni yuborish')],
          ])
            .oneTime()
            .resize(),
        });
      } else {
        let phone: string = ctx.message.contact.phone_number.padStart(1, '+');
        await this.botRepo.update(
          {
            phone_number: phone,
            status: true,
          },
          { where: { user_id: userId } },
        );

        await ctx.reply(`Tabriklayman ro'yxatdan o'tdingiz 😆`, {
          parse_mode: 'HTML',
          ...Markup.removeKeyboard(),
        });
      }
    }
  }

  async onStop(ctx: Context) {
    const userId = ctx.from.id;
    const user = await this.botRepo.findOne({ where: { user_id: userId } });
    if (user.status) {
    }
  }

  async sendOTP(phoneNumber: string, OTP: string): Promise<boolean> {
    const user = await this.botRepo.findOne({
      where: { phone_number: phoneNumber },
    });
    if (!user || !user.status) return false;
    await this.bot.telegram.sendChatAction(user.user_id, 'typing');
    await this.bot.telegram.sendMessage(user.user_id, 'Verify code: ' + OTP);
    return true;
  }
}
