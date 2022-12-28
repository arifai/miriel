import * as dotenv from "dotenv"
import { bot } from "./bot"

bot.launch().then(() => console.info("Bot is running..."))