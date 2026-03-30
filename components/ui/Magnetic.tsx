'use client'

import { useRef } from 'react'
import { motion, useSpring } from 'framer-motion'

interface MagneticProps {
  children: React.ReactNode
  strength?: number  // multiplier of offset applied (0–1)
  radius?: number    // px — activation zone around center
}

export default function Magnetic({ children, strength = 0.32, radius = 80 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)

  const x = useSpring(0, { stiffness: 220, damping: 18, mass: 0.4 })
  const y = useSpring(0, { stiffness: 220, damping: 18, mass: 0.4 })

  const onMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const dx = e.clientX - (rect.left + rect.width  / 2)
    const dy = e.clientY - (rect.top  + rect.height / 2)

    if (Math.sqrt(dx * dx + dy * dy) < radius) {
      x.set(dx * strength)
      y.set(dy * strength)
    }
  }

  const onMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="inline-block"
    >
      {children}
    </motion.div>
  )
}
