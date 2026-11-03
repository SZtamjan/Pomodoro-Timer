function TimerControls(props) {
  return (
    <>
      <button className="timer-button" type="button" onClick={props.onTimerClick}>
        {props.buttonText}
      </button>

      <button className="timer-button" type="button" onClick={props.onReset}>
        Reset
      </button>
    </>
  )
}

export default TimerControls
