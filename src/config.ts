import { Telegraf } from "telegraf"
import { Configuration, OpenAIApi } from "openai";
import * as dotenv from "dotenv"

dotenv.config()

const { BOT_TOKEN, OPENAI_API_KEY } = process.env
const openAiConfig = new Configuration({ apiKey: `${OPENAI_API_KEY}` })

const bot = new Telegraf(`${BOT_TOKEN}`)
const openai = new OpenAIApi(openAiConfig)


export const config = { bot, openai }