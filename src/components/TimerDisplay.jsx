function TimerDisplay(props) {
  const minutes = Math.floor(props.secondsLeft / 60)
  const seconds = props.secondsLeft % 60
  const secondsText = String(seconds).padStart(2, '0')

  return (
    <>
      <p className="timer-description">{props.description}</p>
      <p className="timer-time">{minutes}:{secondsText}</p>
    </>
  )
}

export default TimerDisplay
