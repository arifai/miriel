import * as dotenv from "dotenv"
dotenv.config()
import { bot } from "./bot"
import { catchErrors } from "./helpers/error";



bot.launch().then(() => console.info("Bot is running...")).catch(catchErrors)