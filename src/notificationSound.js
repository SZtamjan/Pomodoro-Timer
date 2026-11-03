import workFinishedSound from './assets/Notif1.wav'
import breakFinishedSound from './assets/Notif2.wav'

export function playNotification(sessionType) {
  const soundUrl = sessionType === 'break' ? breakFinishedSound : workFinishedSound
  const audio = new Audio(soundUrl)

  audio.play().catch(function handleAudioError(error) {
    console.error('Nie udało się odtworzyć powiadomienia:', error)
  })
}
