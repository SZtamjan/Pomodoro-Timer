import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [secondsLeft, setSecondsLeft] = useState(25 * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)

  const minutes = Math.floor(secondsLeft / 60)
  const seconds = secondsLeft % 60
  const secondsText = String(seconds).padStart(2, '0')

  function handleStart() {
    if (secondsLeft > 0) {
      setHasStarted(true)
      setIsRunning(true)
    }
  }

  function handlePause() {
    setIsRunning(false)
  }

  function handleReset() {
    setIsRunning(false)
    setSecondsLeft(25 * 60)
    setHasStarted(false)
  }

  useEffect(function manageTimer() {
    if (!isRunning || secondsLeft === 0) {
      return
    }

    const timeoutId = setTimeout(function tick() {
      setSecondsLeft(secondsLeft - 1)

      if (secondsLeft === 1) {
        setIsRunning(false)
      }
    }, 1000)

    return function cleanupTimer() {
      clearTimeout(timeoutId)
    }
  }, [isRunning, secondsLeft])

  return (
    <main>
      <h1>Pomodoro</h1>
      <p>Sesja skupienia</p>
      <p>{minutes}:{secondsText}</p>

      <button type="button" onClick={handleStart}>
        {hasStarted ? 'Kontynuuj' : 'Start'}
      </button>

      <button type="button" onClick={handlePause}>
        Pauza
      </button>

      <button type='button' onClick={handleReset}>
        Reset
      </button>
    </main>
  )
}

export default App