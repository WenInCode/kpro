const inquirer = require('inquirer')
const isNoConfirmMode = require('../lib/flag-checks').isNoConfirmMode

function handleMatchedProcesses(processes, flags) {
  if (isNoConfirmMode(flags)) {
    destroyProcesses(processes)
  } else {
    questions = buildQuestions(processes)

    // either ask each question then run through the deletes
    // or ask a question, delete, ask a ques...
    processes.map((process) => {
      if (shouldDestroyProcess(process)) {
        destroyProcess(process)
      }
    })
  }
}

function shouldDestroyProcess(process) {
  return false;
}

function destroyProcess(process) {
  console.log(`Destroying process with pid: ${process.pid}`)
  cp.exec(`kill -9 ${process.id}`, err => console.err(`Failed to kill process with pid: ${process.pid}`))
}

function destroyProcesses(processes) {
  processes.map(process => destroyProcess(process))
}

function buildQuestions(processes) {
  return []
}

module.exports = handleMatchedProcesses;
