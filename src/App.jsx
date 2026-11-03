import { useEffect, useRef, useState } from 'react'
import TimerDisplay from './components/TimerDisplay.jsx'
import TimerControls from './components/TimerControls.jsx'
import { playNotification } from './notificationSound.js'
import './App.css'

const TimerStatus = Object.freeze({
  PausedWork: 'pausedWork',
  PausedBreak: 'pausedBreak',
  ReadyForWork: 'readyForWork',
  ReadyForBreak: 'readyForBreak',
  RunningWork: 'runningWork',
  RunningBreak: 'runningBreak',
})

const totalWorkTime = 25 * 60
const totalBreakTime = 5 * 60

function getStartButtonText(status) {
  switch (status) {
    case TimerStatus.PausedWork:
      return 'Wznów pracę'
    case TimerStatus.PausedBreak:
      return 'Wznów przerwę'
    case TimerStatus.ReadyForWork:
      return 'Rozpocznij pracę'
    case TimerStatus.ReadyForBreak:
      return 'Rozpocznij przerwę'
    case TimerStatus.RunningWork:
      return 'Przerwij pracę'
    case TimerStatus.RunningBreak:
      return 'Przerwij przerwę'
  }
}

function getRemainingSeconds(endsAt) {
  return Math.max(0, Math.ceil((endsAt - Date.now()) / 1000))
}

function App() {
  const [secondsLeft, setSecondsLeft] = useState(totalWorkTime)
  const [status, setStatus] = useState(TimerStatus.ReadyForWork)
  const endsAt = useRef(null)

  const isWorkSession = status === TimerStatus.ReadyForWork ||
    status === TimerStatus.RunningWork || status === TimerStatus.PausedWork
  const stateDescription = isWorkSession ? 'Sesja skupienia' : 'Przerwa'
  const startButtonText = getStartButtonText(status)

  function handleTimerButton() {
    switch (status) {
      case TimerStatus.ReadyForWork:
      case TimerStatus.PausedWork:
        endsAt.current = Date.now() + secondsLeft * 1000
        setStatus(TimerStatus.RunningWork)
        break
      case TimerStatus.ReadyForBreak:
      case TimerStatus.PausedBreak:
        endsAt.current = Date.now() + secondsLeft * 1000
        setStatus(TimerStatus.RunningBreak)
        break
      case TimerStatus.RunningWork:
      case TimerStatus.RunningBreak: {
        const remaining = getRemainingSeconds(endsAt.current)
        if (remaining === 0) {
          return
        }
        endsAt.current = null
        setSecondsLeft(remaining)
        setStatus(isWorkSession ? TimerStatus.PausedWork : TimerStatus.PausedBreak)
        break
      }
    }
  }

  function handleReset() {
    endsAt.current = null
    setSecondsLeft(totalWorkTime)
    setStatus(TimerStatus.ReadyForWork)
  }

  useEffect(function manageTimer() {
    if (status !== TimerStatus.RunningWork && status !== TimerStatus.RunningBreak) {
      return
    }

    const intervalId = setInterval(function tick() {
      if (endsAt.current === null) {
        return
      }

      const remaining = getRemainingSeconds(endsAt.current)
      if (remaining > 0) {
        setSecondsLeft(remaining)
        return
      }

      endsAt.current = null
      if (status === TimerStatus.RunningWork) {
        setSecondsLeft(totalBreakTime)
        setStatus(TimerStatus.ReadyForBreak)
        playNotification('work')
      } else {
        setSecondsLeft(totalWorkTime)
        setStatus(TimerStatus.ReadyForWork)
        playNotification('break')
      }
    }, 250)

    return function cleanupTimer() {
      clearInterval(intervalId)
    }
  }, [status])

  return (
    <main className="pomodoro">
      <h1>Pomodoro</h1>
      <TimerDisplay
        secondsLeft={secondsLeft}
        description={stateDescription}
      />
      <TimerControls
        buttonText={startButtonText}
        onTimerClick={handleTimerButton}
        onReset={handleReset}
      />
    </main>
  )
}

export default App
