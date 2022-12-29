
import { config } from "./config"
import { catchErrors } from "./helpers/error";
import { commands } from "./commands/index";

commands.setup(config.bot)

config.bot.launch().then(() => console.info("Bot is running...")).catch(catchErrors)

process.once('SIGINT', () => config.bot.stop('SIGINT'));
process.once('SIGTERM', () => config.bot.stop('SIGTERM'));