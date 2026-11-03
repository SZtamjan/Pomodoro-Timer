function TimerControls(props) {
  return (
    <>
      <button type="button" onClick={props.onTimerClick}>
        {props.buttonText}
      </button>

      <button type="button" onClick={props.onReset}>
        Reset
      </button>
    </>
  )
}

export default TimerControls
