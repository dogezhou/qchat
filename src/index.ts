#!/usr/bin/env node

import { askQuestion } from './user.ts'
import { botAnswer } from './bot.ts'
import { startLoading, stopLoading } from './loading.ts'

function checkExit(input: string) {
  if (input === 'exit') {
      process.exit()
  }
}

// main
while (true) {
    const userInput = askQuestion()
    checkExit(userInput)
    startLoading()
    await botAnswer()
    stopLoading()
}

