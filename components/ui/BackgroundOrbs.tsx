export default function BackgroundOrbs() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {/* Accent orb — top right, drifts slowly */}
      <div
        style={{
          position:        'absolute',
          top:             '-180px',
          right:           '-120px',
          width:           '700px',
          height:          '700px',
          borderRadius:    '50%',
          background:      'rgba(232, 255, 71, 0.045)',
          filter:          'blur(140px)',
          animation:       'orb-drift-1 28s ease-in-out infinite',
          willChange:      'transform',
        }}
      />

      {/* Blue orb — bottom left, counter-drift */}
      <div
        style={{
          position:        'absolute',
          bottom:          '-160px',
          left:            '-100px',
          width:           '600px',
          height:          '600px',
          borderRadius:    '50%',
          background:      'rgba(80, 140, 255, 0.032)',
          filter:          'blur(130px)',
          animation:       'orb-drift-2 34s ease-in-out infinite',
          willChange:      'transform',
        }}
      />
    </div>
  )
}
