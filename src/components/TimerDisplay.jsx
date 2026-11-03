function TimerDisplay(props) {
  const minutes = Math.floor(props.secondsLeft / 60)
  const seconds = props.secondsLeft % 60
  const secondsText = String(seconds).padStart(2, '0')

  return (
    <>
      <p>{props.description}</p>
      <p>{minutes}:{secondsText}</p>
    </>
  )
}

export default TimerDisplay
