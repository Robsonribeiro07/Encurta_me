export function playSoundNotification(type: 'success' | 'error') {
  const Sounds_urls = {
    success: '/sounds/notification.mp3',
    error: '/sounds/alert-error.mp3',
  }
  const audio = new Audio(Sounds_urls[type])
  audio.volume = 0.5
  audio.play()
}
