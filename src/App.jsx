import { useState } from 'react'
import './App.css'

function App() {
  const [secondsLeft, setSecondsLeft] = useState(25 * 60)

  function handleTick() {
    if (secondsLeft > 0) {
      setSecondsLeft(secondsLeft - 1)
    }
  }

  return (
    <main>
      <h1>Pomodoro</h1>
      <p>Sesja skupienia</p>
      <p>Pozostało sekund: {secondsLeft}</p>
      <button type="button" onClick={handleTick}>
        Odejmij sekundę
      </button>
    </main>
  )
}

export default App