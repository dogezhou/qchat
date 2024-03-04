import readlineSync from 'readline-sync'
import colors from 'colors'
import { addUserMessage } from './message.ts'
import { Bot } from './bot.ts'

export function askQuestion() {
    console.log('dd', process.env.OPEN_API_KEY)
    Bot.checkApiKeyConfig()

    const userInput = readlineSync.question(colors.rainbow('You: '))
    addUserMessage(userInput)

    return userInput
}
