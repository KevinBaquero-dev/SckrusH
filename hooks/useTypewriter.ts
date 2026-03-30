import { useState, useEffect } from 'react'

interface UseTypewriterOptions {
  text: string
  speed?: number
  startDelay?: number
  /**
   * Max ±ms of random variation per character.
   * Applied with a slight slow bias (feels more human).
   * Default: 0 (no jitter)
   */
  jitter?: number
}

export function useTypewriter({
  text,
  speed = 75,
  startDelay = 150,
  jitter = 0,
}: UseTypewriterOptions) {
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted] = useState(false)

  const done = displayed.length === text.length

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), startDelay)
    return () => clearTimeout(t)
  }, [startDelay])

  useEffect(() => {
    if (!started || done) return

    // Bias toward 0.3 instead of 0.5 center → slightly slower on average
    const variance = jitter > 0 ? Math.round((Math.random() - 0.3) * jitter) : 0
    const delay = Math.max(30, speed + variance)

    const t = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1))
    }, delay)
    return () => clearTimeout(t)
  }, [started, displayed, text, speed, jitter, done])

  return { displayed, done }
}
