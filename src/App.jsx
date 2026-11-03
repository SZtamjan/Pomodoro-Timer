import { useEffect, useState } from 'react'
import { playNotification } from './notificationSound.js'
import './App.css'

function App() {
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
  const [secondsLeft, setSecondsLeft] = useState(totalWorkTime)
  const [status, setStatus] = useState(TimerStatus.ReadyForWork)
  const [startButtonText, setStartButtonText] = useState('Rozpocznij pracę')
  const [stateDescription, setStateDesc] = useState('Sesja skupienia')

  const minutes = Math.floor(secondsLeft / 60)
  const seconds = secondsLeft % 60
  const secondsText = String(seconds).padStart(2, '0')

  function setupState(){
     switch (status) {
        case TimerStatus.PausedWork:
          setStartButtonText('Wznów pracę')
          break
        case TimerStatus.PausedBreak:
          setStartButtonText('Wznów przerwę')
          break
        case TimerStatus.ReadyForWork:
          setStateDesc('Sesja skupienia')
          setStartButtonText('Rozpocznij pracę')
          setSecondsLeft(totalWorkTime)
          break
        case TimerStatus.ReadyForBreak:
          setStateDesc('Przerwa')
          setStartButtonText('Rozpocznij przerwę')
          setSecondsLeft(totalBreakTime)
          break
        case TimerStatus.RunningWork:
          setStartButtonText('Przerwij pracę')
          break
        case TimerStatus.RunningBreak:
          setStartButtonText('Przerwij przerwę')
          break
      }
  }

  function handleTimerButton() {
    switch (status) {
      case TimerStatus.ReadyForWork:
      case TimerStatus.PausedWork:
        setStatus(TimerStatus.RunningWork);
        break
      case TimerStatus.ReadyForBreak:
      case TimerStatus.PausedBreak:
        setStatus(TimerStatus.RunningBreak)
        break
      case TimerStatus.RunningWork:
        setStatus(TimerStatus.PausedWork)
        break
      case TimerStatus.RunningBreak:
        setStatus(TimerStatus.PausedBreak)
        break
    }
  }

  function handleReset() {
    setStatus(TimerStatus.ReadyForWork)
  }

  useEffect(function logStatus() {
    setupState()
  }, [status])

  useEffect(function manageTimer() {
    switch (status) {
      case TimerStatus.PausedBreak:
      case TimerStatus.PausedWork:
      case TimerStatus.ReadyForBreak:
      case TimerStatus.ReadyForWork:
        return
      default:
        break
    }

    if (secondsLeft <= 0) {
      return
    }

    const timeoutId = setTimeout(function tick() {
      setSecondsLeft(secondsLeft - 1)

      if (secondsLeft === 1) {
        if (status === TimerStatus.RunningWork)
        {
          playNotification('work')
          setStatus(TimerStatus.ReadyForBreak)
        }
        else
        {
          playNotification('break')
          setStatus(TimerStatus.ReadyForWork)
        }
      }
    }, 1000)

    return function cleanupTimer() {
      clearTimeout(timeoutId)
    }
  }, [secondsLeft, status])

  return (
    <main>
      <h1>Pomodoro</h1>
      <p>{stateDescription}</p>
      <p>{minutes}:{secondsText}</p>

      <button type="button" onClick={handleTimerButton}>
        {startButtonText}
      </button>

      <button type='button' onClick={handleReset}>
        Reset
      </button>
    </main>
  )
}

export default App
