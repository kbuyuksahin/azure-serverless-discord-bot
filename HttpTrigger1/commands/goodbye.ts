import {
  SlashCommand,
  CommandOptionType,
  CommandContext,
  SlashCreator,
} from "slash-create";
import { env } from "process";

export class GoodByeCommand extends SlashCommand {
  constructor(creator: SlashCreator) {
    let cDesc = {
      name: "goodbye",
      description: "Says good-bye to you.",
      guildIDs: ["867048548838539326"],
      options: [
        {
          type: CommandOptionType.STRING,
          name: "song",
          description: "What song do you like?",
        },
      ],
    };
    if (env.COMMANDS_GUILD_ID)
      cDesc = Object.assign(cDesc, { guildIDs: [env.COMMANDS_GUILD_ID] });

    super(creator, cDesc);

    // Not required initially, but required for reloading with a fresh file.
    this.filePath = __filename;
  }

  async run(ctx: CommandContext): Promise<string> {
    return ctx.options.song
      ? `You like ${ctx.options.song}? Nice!`
      : `Good-bye, ${ctx.user.username}!`;
  }
}
