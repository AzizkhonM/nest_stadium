import { Context } from 'telegraf';
import { BotService } from './bot.service';
import { Command, Ctx, On, Start, Update } from 'nestjs-telegraf';

@Update()
export class BotUpdate {
  constructor(private readonly botService: BotService) {}

  @Start()
  async onStart(@Ctx() ctx: Context) {
    console.log(ctx);
    return this.botService.start(ctx);
  }

  @On('contact')
  async onContact(@Ctx() ctx: Context) {
    return this.botService.onContact(ctx);
  }

  @Command('stop')
  async onStop(@Ctx() ctx: Context) {
    return this.botService.start(ctx);
  }
}
