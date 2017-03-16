const inquirer = require('inquirer')
const isNoConfirmMode = require('../lib/flag-checks').isNoConfirmMode
const cp = require('child_process')

const EXCLUDED_COMMANDS = [
  /node\s(\S)*kpro/g,
  /grep/g
]

const KILL_PROCESS = 'kill'

function handleMatchedProcesses(processes, flags) {
  processes = filterProcesses(processes)

  if (isNoConfirmMode(flags)) {
    destroyProcesses(processes)
  } else {
    questions = buildQuestions(processes)

    inquirer.prompt(questions).then((answers) => {
      processes.map((process) => {
        if (shouldDestroyProcess(process, answers)) {
          destroyProcess(process)
        }
      })
    })
  }
}

function filterProcesses(processes) {
  return processes.filter(process => !isCommandExcluded(process.command))
}

function isCommandExcluded(command) {
  for (excludedCommand of EXCLUDED_COMMANDS) {
    if (command.match(excludedCommand) !== null) {
      return true;
    }
  }

  return false;
}

function shouldDestroyProcess(process, answers) {
  return answers[process.pid] === KILL_PROCESS;
}

function destroyProcess(process) {
  console.log(`Destroying process with pid: ${process.pid}`)
  cp.exec(`kill -9 ${process.pid}`, (err) => {
    if (err) {
      console.log(`Failed to kill process with pid: ${process.pid}`)
    }
  })
}

function destroyProcesses(processes) {
  processes.map(process => destroyProcess(process))
}

function buildQuestions(processes) {
  return processes.map(process => buildQuestion(process))
}

/**
  "Kill Process PID: ${process.pid}, COMMAND: ${process.command}?"
  (y) - kill process and go to next option
  (n) - don't kill process and go to next option
  (q) - don't kill this process or any one that follows

  ---
  down the line it would be nice to have the following option
  (u) - undecided, come back to after the rest
 */
function buildQuestion(process) {
  return {
    type: 'expand',
    name: process.pid,
    message: `Kill Process PID: ${process.pid}, COMMAND: ${process.command}?`,
    default: 'dont_kill',
    choices: [
      {
        key: 'y',
        name: 'Kill process',
        value: 'kill'
      },
      {
        key: 'n',
        name: 'Don\'t kill process',
        value: 'dont_kill'
      },
      // {
      //   key: 'q',
      //   name: 'Don\'t kill process or any that follow',
      //   value: 'dont_kill_remaining'
      // }
    ]
  }
}

module.exports = handleMatchedProcesses;
