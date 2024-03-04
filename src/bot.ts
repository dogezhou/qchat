import { Configuration, OpenAIApi } from 'openai'
import { addBotMessage, messages, Message } from './message.ts'
import colors from 'colors'

export class Bot {
    private bot
    constructor() {
        Bot.checkApiKeyConfig()

        const openAi = new OpenAIApi(
            new Configuration({
                basePath: 'https://api.chatanywhere.cn/v1',
                apiKey: process.env.OPEN_API_KEY,
            })
        )
        this.bot = openAi
    }

    static checkApiKeyConfig() {
        if (!process.env.OPEN_API_KEY) {
            console.log(colors.red('请先配置 OPEN_API_KEY 或者 文心一言'))
            process.exit()
        }
    }

    async answer(messages: Message) {
        let answer
        if (process.env.OPEN_API_KEY) {
            const chatCompletion = await this.bot.createChatCompletion({
                model: 'gpt-3.5-turbo',
                messages,
            })
            answer = chatCompletion.data.choices[0].message?.content
        } else {
          console.log(colors.red('请先配置 OPEN_API_KEY 或者 文心一言'))
          process.exit()
        }

        return answer
    }
}

let bot: Bot
export async function botAnswer() {
    if(!bot) {
      bot = new Bot()
    }

    const answer = await bot.answer(messages)
    addBotMessage(answer!)

    console.log(colors.bold.red('Bot: '), answer)
}
