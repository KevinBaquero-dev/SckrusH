export default function BackgroundOrbs() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {/* Accent orb — top right */}
      <div
        style={{
          position:   'absolute',
          top:        '-180px',
          right:      '-120px',
          width:      '700px',
          height:     '700px',
          borderRadius: '50%',
          background: 'rgba(232, 255, 71, 0.065)',
          filter:     'blur(140px)',
          animation:  'orb-drift-1 28s ease-in-out infinite',
          willChange: 'transform',
        }}
      />

      {/* Blue orb — bottom left */}
      <div
        style={{
          position:   'absolute',
          bottom:     '-160px',
          left:       '-100px',
          width:      '600px',
          height:     '600px',
          borderRadius: '50%',
          background: 'rgba(80, 140, 255, 0.045)',
          filter:     'blur(130px)',
          animation:  'orb-drift-2 34s ease-in-out infinite',
          willChange: 'transform',
        }}
      />

      {/* Indigo orb — center bottom, depth only */}
      <div
        style={{
          position:   'absolute',
          bottom:     '-80px',
          left:       '50%',
          transform:  'translateX(-50%)',
          width:      '500px',
          height:     '500px',
          borderRadius: '50%',
          background: 'rgba(50, 70, 180, 0.022)',
          filter:     'blur(150px)',
          animation:  'orb-drift-3 40s ease-in-out infinite',
          willChange: 'transform',
        }}
      />

      {/* Vignette — draws eye inward, darkens corners */}
      <div
        style={{
          position:   'fixed',
          inset:      0,
          background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(0,0,0,0.32) 100%)',
        }}
      />
    </div>
  )
}
