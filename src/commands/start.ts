import { Telegraf } from "telegraf";
import { config } from "../config";
import { Model } from "../helpers/enums";
import { Message } from "telegraf/typings/core/types/typegram";
import { prompt } from "../helpers/prompt";


export function setup(bot: Telegraf) {
    bot.start((ctx) => {
        ctx.sendChatAction("typing")
        ctx.reply("Hi 👋")
    })

    bot.on("message", async (ctx) => {
        ctx.sendChatAction("typing")

        try {
            const TEMPERATURE = 0.9
            const MAX_TOKENS = 2048
            const TOP_P = 1
            const FREQUENCY_PENALTY = 0.0
            const PRESENCE_PENALY = 0.6
            const FULL_NAME = `${ctx.message.from.first_name} ${ctx.message.from.last_name}`
            const PROMPT = `${prompt.response}${FULL_NAME}\nHuman:${(ctx.message as Message.TextMessage).text}\nAI:`

            const resp = await config.openai.createCompletion({
                model: Model.TextDavinci003,
                prompt: PROMPT,
                temperature: TEMPERATURE,
                max_tokens: MAX_TOKENS,
                top_p: TOP_P,
                frequency_penalty: FREQUENCY_PENALTY,
                presence_penalty: PRESENCE_PENALY,
                stop: ["Human:", "AI:"]
            }, { timeout: 15000 })

            resp.data.choices?.forEach(e => {
                ctx.reply(`${e.text}`)
            })

        } catch (err) {
            if (err.response) {
                console.error(`Error status:`, err.response.status);
                console.error(`Error data:`, err.response.data);
            } else {
                console.log('Unexpected error:', err.message);

            }
        }
    })
}