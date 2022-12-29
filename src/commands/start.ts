import { Telegraf } from "telegraf";
import { config } from "../config";
import { Model } from "../helpers/enums";
import { Message } from "telegraf/typings/core/types/typegram";


export function setup(bot: Telegraf) {
    bot.start((ctx) => ctx.reply("Hi 👋"))

    bot.on("message", async (ctx) => {
        try {
            const TEMPERATURE = 0.9
            const MAX_TOKENS = 256
            const TOP_P = 1
            const FREQUENCY_PENALTY = 0.0
            const PRESENCE_PENALY = 0.6
            const MESSAGE = `${(ctx.message as Message.TextMessage).text}`

            const resp = await config.openai.createCompletion({
                model: Model.TextDavinci003,
                prompt: MESSAGE,
                temperature: TEMPERATURE,
                max_tokens: MAX_TOKENS,
                top_p: TOP_P,
                frequency_penalty: FREQUENCY_PENALTY,
                presence_penalty: PRESENCE_PENALY,
            }, { timeout: 10000 })

            ctx.reply(`${resp.data.choices[0].text}`)
        } catch (err) {
            if (err.response) {
                console.error(`Error status`, err.response.status);
                console.error(`Error data`, err.response.data);
            } else {
                console.log('Unexpected error', err.message);

            }
        }
    })
}