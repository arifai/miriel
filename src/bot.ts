import { Telegraf } from "telegraf"

const { BOT_TOKEN } = process.env

export const bot = new Telegraf(`${BOT_TOKEN}`)